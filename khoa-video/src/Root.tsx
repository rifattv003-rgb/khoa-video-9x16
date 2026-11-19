import React from 'react';
import {Composition} from 'remotion';
import {Story} from './Video';
import {FPS, TOTAL_FRAMES, W, H} from './timing';

export const Root: React.FC = () => (
  <Composition id="Story" component={Story} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
);
