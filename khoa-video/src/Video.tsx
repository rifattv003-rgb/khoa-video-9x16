import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {BOUNDS, FPS, OVERLAP, SceneStart} from './timing';
import {CaptionOverlay} from './ui';
import {Scene1, Scene2, Scene3} from './scenes/S1to3';
import {Scene4, Scene7} from './scenes/S4S7';
import {Scene5, Scene6} from './scenes/S5S6';

const SCENES = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7];

const FadeIn: React.FC<{children: React.ReactNode; d: number; first: boolean}> = ({children, d, first}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{opacity: first ? 1 : Math.min(1, f / d)}}>{children}</AbsoluteFill>;
};

const Captions: React.FC = () => {
  const f = useCurrentFrame();
  return <CaptionOverlay t={f / FPS} />;
};

export const Story: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {SCENES.map((S, i) => {
      const from = Math.round(BOUNDS[i] * FPS);
      const end = Math.round(BOUNDS[i + 1] * FPS) + (i < SCENES.length - 1 ? Math.round(OVERLAP * FPS) : 0);
      return (
        <Sequence key={i} from={from} durationInFrames={end - from}>
          <SceneStart value={BOUNDS[i]}>
            <FadeIn d={Math.round(OVERLAP * FPS)} first={i === 0}><S /></FadeIn>
          </SceneStart>
        </Sequence>
      );
    })}
    <Captions />
    <Audio src={staticFile('voice.mp3')} />
  </AbsoluteFill>
);
