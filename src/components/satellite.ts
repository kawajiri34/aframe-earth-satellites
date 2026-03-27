import { createSatRec, getSatellitePosition } from "../lib/orbit";
import { getSimDate } from "../lib/sim-clock";
import type { SatRec } from "satellite.js";

AFRAME.registerComponent("satellite", {
  el: null as any,
  data: null as any,

  schema: {
    name: { type: "string", default: "" },
  },

  satrec: null as SatRec | null,

  init() {
    const tle1 = this.el.dataset.tle1;
    const tle2 = this.el.dataset.tle2;
    if (tle1 && tle2) {
      this.satrec = createSatRec(tle1, tle2);
    }

    // 太陽光パネルを光源方向に向ける（初回のみ、以降固定）
    const THREE = (window as any).THREE;
    const lightEl = document.querySelector('a-light[type="directional"]');
    const lightPos = lightEl
      ? (lightEl as any).getAttribute("position")
      : { x: 5, y: 3, z: 1 };
    const lightDir = new THREE.Vector3(lightPos.x, lightPos.y, lightPos.z).normalize();

    const up = lightDir;
    const forward = new THREE.Vector3(0, 0, 1);
    const right = new THREE.Vector3().crossVectors(forward, up).normalize();
    const correctedForward = new THREE.Vector3().crossVectors(up, right).normalize();

    const mat = new THREE.Matrix4().makeBasis(right, up, correctedForward);
    this.el.object3D.quaternion.setFromRotationMatrix(mat);
  },

  tick() {
    if (!this.satrec) return;
    const pos = getSatellitePosition(this.satrec, getSimDate());
    if (!pos) return;

    this.el.object3D.position.set(pos.x, pos.y, pos.z);
  },
});
