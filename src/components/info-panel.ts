AFRAME.registerComponent("info-panel", {
  el: null as any,
  data: null as any,

  schema: {
    name: { type: "string", default: "" },
  },

  init() {
    this.el.addEventListener("mouseenter", () => {
      const infoText = document.querySelector("#info-text");
      if (infoText) {
        infoText.setAttribute("value", this.data.name);
        infoText.setAttribute("visible", "true");
      }
    });

    this.el.addEventListener("mouseleave", () => {
      const infoText = document.querySelector("#info-text");
      if (infoText) {
        infoText.setAttribute("value", "");
        infoText.setAttribute("visible", "false");
      }
    });
  },
});
