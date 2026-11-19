import React from 'react';
import {WW, WH, W} from './timing';

export const SY = 1090; // screen y where world focus point (cy) sits
export const mkCam = (cx: number, z = 1, cy = 600) => ({
  sx: (x: number) => W / 2 + (x - cx) * z,
  sy: (y: number) => SY + (y - cy) * z,
});

/** Virtual camera: the 1920x1080 scene art is panned/zoomed inside the 1080x1920 portrait screen. */
export const Cam: React.FC<{cx: number; z?: number; cy?: number; children: React.ReactNode}> = ({cx, z = 1, cy = 600, children}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: WW, height: WH, transformOrigin: '0 0', transform: `translate(${W / 2 - cx * z}px,${SY - cy * z}px) scale(${z})`}}>
    {children}
  </div>
);
