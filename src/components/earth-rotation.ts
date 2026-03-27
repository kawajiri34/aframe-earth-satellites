import { getGmst } from "../lib/orbit";
import { getSimDate } from "../lib/sim-clock";

AFRAME.registerComponent("earth-rotation", {
  el: null as any,
  data: null as any,

  tick() {
    const gmst = getGmst(getSimDate());
    this.el.object3D.rotation.y = gmst;
  },
});
