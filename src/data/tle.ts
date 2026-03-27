export interface SatelliteEntry {
  name: string;
  tle1: string;
  tle2: string;
  color: string;
  model?: string;
  scale?: string;
}

export const satellites: SatelliteEntry[] = [
  {
    name: "ISS (ZARYA)",
    tle1: "1 25544U 98067A   26086.13218664  .00012923  00000+0  24583-3 0  9994",
    tle2: "2 25544  51.6343 346.1324 0006239 237.1062 122.9326 15.48575012559033",
    color: "#ff0",
    model: "models/iss.glb",
    scale: "0.05 0.05 0.05",
  },
];
