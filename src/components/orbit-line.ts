import { createSatRec, getSatellitePosition } from "../lib/orbit";
import { getSimDate } from "../lib/sim-clock";
import type { SatRec } from "satellite.js";

// 軌道を1周分サンプリングして THREE.Line で描画
AFRAME.registerComponent("orbit-line", {
  el: null as any,
  data: null as any,

  schema: {
    color: { type: "color", default: "#ff0" },
    segments: { type: "int", default: 128 },
  },

  line: null as any,
  satrec: null as SatRec | null,

  init() {
    const tle1 = this.el.dataset.tle1;
    const tle2 = this.el.dataset.tle2;
    if (!tle1 || !tle2) return;

    this.satrec = createSatRec(tle1, tle2);
    this.buildLine();
  },

  buildLine() {
    if (!this.satrec) return;

    const THREE = (window as any).THREE;
    const points: any[] = [];
    const baseDate = getSimDate();
    // TLE の mean motion (rev/day) から軌道周期を算出
    const meanMotion = this.satrec.no * (1440 / (2 * Math.PI)); // rad/min → rev/day
    const periodMin = meanMotion > 0 ? 1440 / meanMotion : 92;

    for (let i = 0; i <= this.data.segments; i++) {
      const t = new Date(
        baseDate.getTime() + (i / this.data.segments) * periodMin * 60 * 1000
      );
      const pos = getSatellitePosition(this.satrec, t);
      if (pos) {
        points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
      }
    }

    if (points.length < 2) return;

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: this.data.color,
      opacity: 0.4,
      transparent: true,
    });

    if (this.line) {
      this.line.geometry.dispose();
      this.el.object3D.remove(this.line);
    }

    this.line = new THREE.Line(geometry, material);
    this.el.object3D.add(this.line);
  },

  // 軌道線を定期的に再計算（シミュレーション時間が進むため）
  refreshInterval: 5000,
  lastRefresh: 0,

  tick(_time: number) {
    const now = performance.now();
    if (now - this.lastRefresh < this.refreshInterval) return;
    this.lastRefresh = now;
    this.buildLine();
  },
});
