import {
  twoline2satrec,
  propagate,
  gstime,
  eciToEcf,
  SatRec,
  EciVec3,
} from "satellite.js";

const EARTH_RADIUS_KM = 6371;
const SCENE_EARTH_RADIUS = 10;
const SCALE = EARTH_RADIUS_KM / SCENE_EARTH_RADIUS;

export function createSatRec(tle1: string, tle2: string): SatRec {
  return twoline2satrec(tle1, tle2);
}

export interface ScenePosition {
  x: number;
  y: number;
  z: number;
}

export function getSatellitePosition(
  satrec: SatRec,
  date: Date
): ScenePosition | null {
  const positionAndVelocity = propagate(satrec, date);

  if (
    typeof positionAndVelocity.position === "boolean" ||
    !positionAndVelocity.position
  ) {
    return null;
  }

  const eci = positionAndVelocity.position as EciVec3<number>;
  const gmst = gstime(date);
  const ecf = eciToEcf(eci, gmst);

  return {
    x: ecf.x / SCALE,
    y: ecf.z / SCALE,
    z: -ecf.y / SCALE,
  };
}

export function getGmst(date: Date): number {
  return gstime(date);
}
