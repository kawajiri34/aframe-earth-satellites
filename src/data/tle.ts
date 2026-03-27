export interface SatelliteEntry {
  name: string;
  group: string;
  tle1: string;
  tle2: string;
  color: string;
  model?: string;
  scale?: string;
}

export interface SatelliteGroup {
  id: string;
  label: string;
  color: string;
}

export const groups: SatelliteGroup[] = [
  { id: "iss", label: "ISS", color: "#ff0" },
  { id: "qzss", label: "みちびき", color: "#f70" },
];

export const satellites: SatelliteEntry[] = [
  {
    name: "ISS (ZARYA)",
    group: "iss",
    tle1: "1 25544U 98067A   26086.13218664  .00012923  00000+0  24583-3 0  9994",
    tle2: "2 25544  51.6343 346.1324 0006239 237.1062 122.9326 15.48575012559033",
    color: "#ff0",
    model: "models/iss.glb",
    scale: "0.05 0.05 0.05",
  },
  // みちびき (QZSS) — 準天頂軌道 + 静止軌道
  {
    name: "QZS-1 (MICHIBIKI-1)",
    group: "qzss",
    tle1: "1 37158U 10045A   26086.07058595  .00000006  00000+0  00000+0 0  9999",
    tle2: "2 37158  44.1124 117.2821 0003800  18.0848 158.0776  0.87714850 55671",
    color: "#f70",
    model: "models/satellite.glb",
    scale: "0.3 0.3 0.3",
  },
  {
    name: "QZS-2 (MICHIBIKI-2)",
    group: "qzss",
    tle1: "1 42738U 17028A   26086.28755675 -.00000200  00000+0  00000+0 0  9990",
    tle2: "2 42738  39.5561 244.3465 0743128 270.5402 273.7809  1.00255921  6803",
    color: "#f70",
    model: "models/satellite.glb",
    scale: "0.3 0.3 0.3",
  },
  {
    name: "QZS-3 (MICHIBIKI-3)",
    group: "qzss",
    tle1: "1 42917U 17048A   26086.57163220 -.00000367  00000+0  00000+0 0  9996",
    tle2: "2 42917   0.0526 163.8602 0002050 193.1538 160.7683  1.00274823 31441",
    color: "#f70",
    model: "models/satellite.glb",
    scale: "0.3 0.3 0.3",
  },
  {
    name: "QZS-4 (MICHIBIKI-4)",
    group: "qzss",
    tle1: "1 42965U 17062A   26086.57267221 -.00000330  00000+0  00000+0 0  9991",
    tle2: "2 42965  40.1575 344.5263 0748141 270.3376 276.9174  1.00273843 30984",
    color: "#f70",
    model: "models/satellite.glb",
    scale: "0.3 0.3 0.3",
  },
];
