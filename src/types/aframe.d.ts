/* eslint-disable @typescript-eslint/no-explicit-any */
interface AFrameComponent {
  el: any;
  data: any;
  schema?: Record<string, any>;
  init?(): void;
  tick?(time: number, timeDelta: number): void;
  [key: string]: any;
}

interface AFrame {
  registerComponent(name: string, definition: AFrameComponent): void;
}

declare const AFRAME: AFrame;
