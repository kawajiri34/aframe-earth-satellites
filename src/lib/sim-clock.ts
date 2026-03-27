// シミュレーション時計: 時間加速に対応
// timeScale = 1 でリアルタイム、100 で100倍速

let timeScale = 100;
let simTime = Date.now();
let lastReal = Date.now();

export function getSimDate(): Date {
  const now = Date.now();
  const deltaReal = now - lastReal;
  lastReal = now;
  simTime += deltaReal * timeScale;
  return new Date(simTime);
}

export function getTimeScale(): number {
  return timeScale;
}

export function setTimeScale(scale: number): void {
  // 現在のsimTimeを確定してからスケール変更
  getSimDate();
  timeScale = scale;
}
