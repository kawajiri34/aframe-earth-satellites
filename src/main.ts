import "./components/earth-rotation";
import "./components/satellite";
import "./components/orbit-line";
import "./components/info-panel";
import { satellites, groups } from "./data/tle";
import { getTimeScale, setTimeScale } from "./lib/sim-clock";

document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  if (!scene) return;

  scene.addEventListener("loaded", () => {
    const container = document.querySelector("#satellites");
    const orbitLines = document.querySelector("#orbit-lines");
    if (!container || !orbitLines) return;

    for (const sat of satellites) {
      // 衛星本体
      const el = document.createElement("a-entity");
      el.dataset.tle1 = sat.tle1;
      el.dataset.tle2 = sat.tle2;
      el.dataset.group = sat.group;

      if (sat.model) {
        el.setAttribute("gltf-model", `url(${sat.model})`);
        el.setAttribute("scale", sat.scale ?? "0.01 0.01 0.01");
      }

      const marker = document.createElement("a-sphere");
      marker.setAttribute("radius", sat.model ? "0.15" : "0.5");
      marker.setAttribute("color", sat.color);
      marker.setAttribute("material", "shader: flat");
      el.appendChild(marker);

      el.setAttribute("satellite", `name: ${sat.name}`);
      el.setAttribute("info-panel", `name: ${sat.name}`);
      el.classList.add("clickable");
      container.appendChild(el);

      // 軌道線
      const orbitEl = document.createElement("a-entity");
      orbitEl.dataset.tle1 = sat.tle1;
      orbitEl.dataset.tle2 = sat.tle2;
      orbitEl.dataset.group = sat.group;
      orbitEl.setAttribute("orbit-line", `color: ${sat.color}`);
      orbitLines.appendChild(orbitEl);
    }
  });

  setupSpeedControls();
  setupGroupToggles();
});

// --- 速度コントロール ---
function setupSpeedControls(): void {
  const panel = document.createElement("div");
  panel.id = "speed-controls";
  panel.innerHTML = `
    <span id="speed-label">×${getTimeScale()}</span>
    <button id="speed-down">−</button>
    <button id="speed-up">+</button>
    <button id="speed-reset">1×</button>
  `;
  document.body.appendChild(panel);

  const label = document.querySelector("#speed-label") as HTMLElement;
  const speeds = [1, 10, 50, 100, 200, 500, 1000];

  const updateLabel = () => {
    label.textContent = `×${getTimeScale()}`;
  };

  document.querySelector("#speed-down")!.addEventListener("click", () => {
    const current = getTimeScale();
    const idx = speeds.indexOf(current);
    if (idx > 0) setTimeScale(speeds[idx - 1]);
    else if (idx === -1) setTimeScale(speeds[0]);
    updateLabel();
  });

  document.querySelector("#speed-up")!.addEventListener("click", () => {
    const current = getTimeScale();
    const idx = speeds.indexOf(current);
    if (idx < speeds.length - 1) setTimeScale(speeds[idx + 1]);
    else if (idx === -1) setTimeScale(speeds[speeds.length - 1]);
    updateLabel();
  });

  document.querySelector("#speed-reset")!.addEventListener("click", () => {
    setTimeScale(1);
    updateLabel();
  });
}

// --- 衛星グループ表示トグル ---
function setupGroupToggles(): void {
  const panel = document.createElement("div");
  panel.id = "group-toggles";

  for (const group of groups) {
    const btn = document.createElement("button");
    btn.dataset.groupId = group.id;
    btn.classList.add("group-btn", "active");
    btn.style.borderColor = group.color;
    btn.style.color = group.color;
    btn.textContent = group.label;

    btn.addEventListener("click", () => {
      const isActive = btn.classList.toggle("active");
      toggleGroup(group.id, isActive);
    });

    panel.appendChild(btn);
  }

  document.body.appendChild(panel);
}

function toggleGroup(groupId: string, visible: boolean): void {
  const els = document.querySelectorAll(`[data-group="${groupId}"]`);
  els.forEach((el) => {
    (el as any).object3D.visible = visible;
  });
}
