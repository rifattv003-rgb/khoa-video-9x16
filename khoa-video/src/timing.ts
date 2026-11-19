import React, {createContext, useContext} from 'react';
import {interpolate, spring, useCurrentFrame} from 'remotion';

export const FPS = 30;
export const W = 1080; // 9:16 screen
export const H = 1920;
export const WW = 1920; // 'world' (scene art) size
export const WH = 1080;
export const TOTAL_FRAMES = 5100; // 170s (audio = 169.95s)

// Scene boundaries (seconds) — taken from SRT cue timings
export const BOUNDS = [0, 23.0, 40.4, 62.7, 85.0, 112.5, 144.0, 170.0];
export const OVERLAP = 0.5; // crossfade (s)

const Ctx = createContext(0);
export const SceneStart = Ctx.Provider;
/** absolute time in seconds (video timeline) */
export const useT = () => {
  const f = useCurrentFrame();
  return useContext(Ctx) + f / FPS;
};
export const useF = () => useCurrentFrame();

export const win = (t: number, a: number, b: number) => t >= a && t < b;
/** pop-in spring 0→1 starting at time `at` */
export const pop = (t: number, at: number, damping = 11) =>
  t < at ? 0 : spring({frame: (t - at) * FPS, fps: FPS, config: {damping, stiffness: 140}});
/** fade in at a, out at b */
export const fadeIO = (t: number, a: number, b: number, d = 0.3) =>
  interpolate(t, [a, a + d, b - d, b], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
export const lerp = (t: number, a: number, b: number, v0: number, v1: number) =>
  interpolate(t, [a, b], [v0, v1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
export const shake = (f: number, amp: number) => ({
  x: Math.sin(f * 2.7) * amp,
  y: Math.cos(f * 3.3) * amp,
});
