import React from 'react';
import {useCurrentFrame} from 'remotion';

const OUT = '#222222';
const SW = 2.5;
export type Expr = 'neutral' | 'worried' | 'angry' | 'surprised' | 'happy' | 'think' | 'sad';
export type Kind = 'rubel' | 'majid' | 'hasna' | 'tarek' | 'kader' | 'jabbar' | 'soleman' | 'ma' | 'extra1' | 'extra2';

type Cfg = {
  skin: string; top: string; bottom: string; shoe: string; bw: number; long?: boolean; h?: number;
};
const CFG: Record<Kind, Cfg> = {
  rubel: {skin: '#E9BC90', top: '#9ED89E', bottom: '#3E6FD1', shoe: '#8B5A2B', bw: 84},
  majid: {skin: '#D9A577', top: '#F7F7F2', bottom: '#F7F7F2', shoe: '#222', bw: 128, long: true},
  hasna: {skin: '#C99366', top: '#9CC8EE', bottom: '#9CC8EE', shoe: '#6b4a2f', bw: 88, long: true, h: 0.86},
  tarek: {skin: '#E0AE82', top: '#5F7396', bottom: '#4B5B7A', shoe: '#222', bw: 96},
  kader: {skin: '#D8A478', top: '#5A3A25', bottom: '#2F2F36', shoe: '#222', bw: 78, h: 1.08},
  jabbar: {skin: '#C98F63', top: '#B9A97A', bottom: '#2B2B2B', shoe: '#444', bw: 108},
  soleman: {skin: '#D4A075', top: '#E8E3D5', bottom: '#7FA183', shoe: '#6b4a2f', bw: 92, long: true},
  ma: {skin: '#D9A577', top: '#EDEDED', bottom: '#EDEDED', shoe: '#6b4a2f', bw: 84, long: true},
  extra1: {skin: '#E2B58B', top: '#E58B6B', bottom: '#4E5D78', shoe: '#444', bw: 86},
  extra2: {skin: '#C9936A', top: '#6AA6D6', bottom: '#5A4B7A', shoe: '#444', bw: 92},
};

const Limb: React.FC<{w: number; len: number; fill: string}> = ({w, len, fill}) => (
  <rect x={-w / 2} y={0} width={w} height={len} rx={w / 2} fill={fill} stroke={OUT} strokeWidth={SW} />
);

const Brows: React.FC<{e: Expr}> = ({e}) => {
  const P: Record<Expr, [number, number, number, number]> = {
    // [leftOuterY, leftInnerY, rightInnerY, rightOuterY]
    neutral: [-24, -24, -24, -24],
    worried: [-20, -29, -29, -20],
    sad: [-19, -28, -28, -19],
    angry: [-31, -20, -20, -31],
    surprised: [-35, -37, -37, -35],
    happy: [-30, -31, -31, -30],
    think: [-24, -28, -34, -37],
  };
  const [a, b, c, d] = P[e];
  return (
    <g stroke={OUT} strokeWidth={4} strokeLinecap="round" fill="none">
      <path d={`M-28,${a} L-9,${b}`} />
      <path d={`M9,${c} L28,${d}`} />
    </g>
  );
};

const Mouth: React.FC<{e: Expr; talking: boolean; f: number}> = ({e, talking, f}) => {
  if (talking) {
    const s = Math.floor(f / 4) % 4; // closed, small, big, small
    if (s === 0) return <path d="M-9,26 L9,26" stroke={OUT} strokeWidth={3.5} strokeLinecap="round" />;
    const r = s === 2 ? 11 : 6;
    return <ellipse cx={0} cy={28} rx={r * 0.9} ry={r} fill="#7a2b2b" stroke={OUT} strokeWidth={SW} />;
  }
  const st = {stroke: OUT, strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round' as const};
  switch (e) {
    case 'happy': return <path d="M-16,22 Q0,42 16,22" {...st} />;
    case 'surprised': return <ellipse cx={0} cy={30} rx={8} ry={11} fill="#7a2b2b" stroke={OUT} strokeWidth={SW} />;
    case 'angry': return <path d="M-14,32 Q0,22 14,32" {...st} />;
    case 'worried': return <path d="M-13,30 Q-5,24 0,30 Q5,36 13,30" {...st} />;
    case 'sad': return <path d="M-13,32 Q0,22 13,32" {...st} />;
    case 'think': return <path d="M-8,28 L12,25" {...st} />;
    default: return <path d="M-11,27 L11,27" {...st} />;
  }
};

const Head: React.FC<{kind: Kind; c: Cfg; e: Expr; talking: boolean; f: number; blink: boolean; masked: boolean}> = ({kind, c, e, talking, f, blink, masked}) => {
  const eyeRy = blink ? 1 : e === 'surprised' ? 9 : 6.5;
  return (
    <g>
      {kind === 'hasna' || kind === 'ma' ? null : null}
      <ellipse cx={-44} cy={4} rx={8} ry={11} fill={c.skin} stroke={OUT} strokeWidth={SW} />
      <ellipse cx={44} cy={4} rx={8} ry={11} fill={c.skin} stroke={OUT} strokeWidth={SW} />
      <ellipse cx={0} cy={0} rx={45} ry={49} fill={c.skin} stroke={OUT} strokeWidth={SW} />
      {/* hair / headwear */}
      {kind === 'rubel' && <path d="M-45,-8 Q-50,-56 0,-55 Q50,-56 45,-8 Q32,-32 0,-30 Q-32,-32 -45,-8Z" fill="#222" stroke={OUT} strokeWidth={SW} />}
      {kind === 'majid' && (<>
        <path d="M-40,-30 Q0,-78 40,-30 L40,-24 Q0,-34 -40,-24Z" fill="#fff" stroke={OUT} strokeWidth={SW} />
        <path d="M-40,-22 Q0,-34 40,-22 L38,-12 Q0,-22 -38,-12Z" fill="#eee" stroke={OUT} strokeWidth={SW} />
      </>)}
      {kind === 'hasna' && <path d="M-56,18 Q-66,-66 0,-66 Q66,-66 56,18 Q50,-34 0,-38 Q-50,-34 -56,18Z" fill="#9aa0a8" stroke={OUT} strokeWidth={SW} />}
      {kind === 'ma' && <path d="M-56,18 Q-66,-66 0,-66 Q66,-66 56,18 Q50,-34 0,-38 Q-50,-34 -56,18Z" fill="#f4f4f4" stroke={OUT} strokeWidth={SW} />}
      {kind === 'tarek' && (<>
        <path d="M-48,-26 Q0,-84 48,-26 Z" fill="#3E4C6B" stroke={OUT} strokeWidth={SW} />
        <rect x={-50} y={-28} width={100} height={11} rx={5} fill="#2c3750" stroke={OUT} strokeWidth={SW} />
      </>)}
      {kind === 'kader' && <path d="M-44,-14 Q-46,-54 0,-54 Q46,-54 44,-14 Q30,-34 0,-32 Q-30,-34 -44,-14Z" fill="#2b2b2b" stroke={OUT} strokeWidth={SW} />}
      {kind === 'jabbar' && <path d="M-46,-12 Q-50,-62 0,-62 Q50,-62 46,-12 Q0,-30 -46,-12Z M40,-22 L62,-8 L40,-4Z" fill="#D13B3B" stroke={OUT} strokeWidth={SW} />}
      {kind === 'soleman' && <path d="M-36,-34 Q0,-70 36,-34 L36,-24 Q0,-34 -36,-24Z" fill="#222" stroke={OUT} strokeWidth={SW} />}
      {kind === 'extra1' && <path d="M-45,-6 Q-52,-58 0,-56 Q52,-58 45,-6 Q30,-34 0,-32 Q-30,-34 -45,-6Z" fill="#4a3426" stroke={OUT} strokeWidth={SW} />}
      {kind === 'extra2' && <path d="M-44,-14 Q-40,-50 0,-50 Q40,-50 44,-14 Q20,-30 0,-28 Q-20,-30 -44,-14Z" fill="#555" stroke={OUT} strokeWidth={SW} />}
      {/* eyes */}
      <g>
        <ellipse cx={-17} cy={-4} rx={6} ry={eyeRy} fill="#222" />
        <ellipse cx={17} cy={-4} rx={6} ry={eyeRy} fill="#222" />
        {!blink && <><circle cx={-15} cy={-7} r={2} fill="#fff" /><circle cx={19} cy={-7} r={2} fill="#fff" /></>}
      </g>
      <Brows e={e} />
      {/* nose */}
      <path d="M0,6 Q-5,14 1,15" stroke={OUT} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      {kind === 'majid' && <path d="M-38,12 Q-32,56 0,58 Q32,56 38,12 Q22,38 0,38 Q-22,38 -38,12Z" fill="#a9a9a9" stroke={OUT} strokeWidth={SW} />}
      {(kind === 'tarek') && <path d="M-20,20 Q0,12 20,20 Q8,26 0,22 Q-8,26 -20,20Z" fill="#2b2b2b" stroke={OUT} strokeWidth={SW} />}
      {kind === 'soleman' && <path d="M-18,20 Q0,14 18,20 Q6,25 0,22 Q-6,25 -18,20Z" fill="#555" stroke={OUT} strokeWidth={SW} />}
      <g transform="translate(0,0)"><Mouth e={e} talking={talking} f={f} /></g>
      {kind === 'kader' && masked && <path d="M-48,8 Q0,2 48,8 L44,40 Q0,62 -44,40Z" fill="#161616" stroke={OUT} strokeWidth={SW} />}
    </g>
  );
};

export type CharProps = {
  kind: Kind;
  x: number; // feet x (px)
  y: number; // feet y (px)
  s?: number;
  flip?: boolean;
  expr?: Expr;
  talking?: boolean;
  tremble?: number;
  armL?: number; // deg, 0 = hanging down, positive = swing outward-forward
  armR?: number;
  propL?: React.ReactNode;
  propR?: React.ReactNode;
  masked?: boolean;
  lean?: number; // body tilt deg
  seed?: number;
  hideLegs?: boolean;
  opacity?: number;
};

export const Character: React.FC<CharProps> = ({
  kind, x, y, s = 1.8, flip, expr = 'neutral', talking = false, tremble = 0, armL = 4, armR = -4,
  propL, propR, masked = false, lean = 0, seed = 0, opacity = 1,
}) => {
  const f = useCurrentFrame();
  const c = CFG[kind];
  const k = (c.h ?? 1) * s;
  const bob = Math.sin((f + seed * 9) / 14) * 3;
  const jx = tremble ? Math.sin((f + seed) * 2.6) * tremble : 0;
  const jy = tremble ? Math.cos((f + seed) * 3.4) * tremble : 0;
  const blink = (f + seed * 17) % 96 < 4;
  const bw = c.bw;
  const bodyTop = -246;
  return (
    <g transform={`translate(${x + jx},${y + jy + bob * 0.5}) scale(${flip ? -k : k},${k}) rotate(${lean})`} opacity={opacity}>
      <ellipse cx={0} cy={4} rx={bw * 0.8} ry={10} fill="rgba(0,0,0,0.22)" />
      {/* legs */}
      {!c.long && (<>
        <g transform="translate(-22,-100)"><Limb w={28} len={90} fill={c.bottom} /></g>
        <g transform="translate(22,-100)"><Limb w={28} len={90} fill={c.bottom} /></g>
      </>)}
      {c.long && (<>
        <g transform="translate(-20,-70)"><Limb w={26} len={64} fill={kind === 'majid' ? '#e8e8e0' : c.skin} /></g>
        <g transform="translate(20,-70)"><Limb w={26} len={64} fill={kind === 'majid' ? '#e8e8e0' : c.skin} /></g>
      </>)}
      <ellipse cx={-24} cy={-4} rx={24} ry={10} fill={c.shoe} stroke={OUT} strokeWidth={SW} />
      <ellipse cx={24} cy={-4} rx={24} ry={10} fill={c.shoe} stroke={OUT} strokeWidth={SW} />
      {/* arm (back side: right arm) */}
      <g transform={`translate(${bw / 2 - 4},-226) rotate(${armR})`}>
        <Limb w={24} len={100} fill={kind === 'tarek' || kind === 'kader' || kind === 'jabbar' || kind === 'rubel' || kind === 'majid' ? c.top : c.skin} />
        <circle cx={0} cy={104} r={13} fill={c.skin} stroke={OUT} strokeWidth={SW} />
        <g transform="translate(0,104)">{propR}</g>
      </g>
      {/* torso / garment */}
      {c.long ? (
        <path d={`M${-bw / 2},-236 Q${-bw / 2},-250 ${-bw / 2 + 24},-250 L${bw / 2 - 24},-250 Q${bw / 2},-250 ${bw / 2},-236 L${bw / 2 + 12},-48 L${-bw / 2 - 12},-48 Z`} fill={c.top} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
      ) : (
        <rect x={-bw / 2} y={-250} width={bw} height={160} rx={30} fill={c.top} stroke={OUT} strokeWidth={SW} />
      )}
      {/* outfit details */}
      {kind === 'rubel' && (<><path d="M-42,-246 L42,-100" stroke="#777" strokeWidth={10} strokeLinecap="round" opacity={0.8} /><rect x={22} y={-150} width={46} height={58} rx={8} fill="#8D8D95" stroke={OUT} strokeWidth={SW} /><path d="M0,-250 L0,-110" stroke="#6bb36b" strokeWidth={2} /></>)}
      {kind === 'majid' && (<><path d="M0,-250 L0,-90" stroke="#bbb" strokeWidth={2} /><rect x={-bw / 2} y={-120} width={bw} height={9} fill="#6b4a2f" stroke={OUT} strokeWidth={SW} />{[-30, -14, 4, 20, 36].map((kx, i) => <circle key={i} cx={kx} cy={-102} r={5} fill="#d4af37" stroke={OUT} strokeWidth={1.5} />)}</>)}
      {kind === 'hasna' && (<><path d={`M${-bw / 2 - 8},-250 Q0,-190 ${bw / 2 + 8},-250 L${bw / 2 + 8},-200 Q0,-160 ${-bw / 2 - 8},-200Z`} fill="#9aa0a8" stroke={OUT} strokeWidth={SW} /><path d={`M${-bw / 2 - 10},-90 L${bw / 2 + 10},-90`} stroke="#6d9ccc" strokeWidth={5} /></>)}
      {kind === 'tarek' && (<><rect x={-bw / 2 + 6} y={-210} width={26} height={22} rx={3} fill="#4a5c80" stroke={OUT} strokeWidth={SW} /><circle cx={20} cy={-200} r={6} fill="#e0c14a" stroke={OUT} strokeWidth={1.5} /><rect x={-bw / 2} y={-120} width={bw} height={9} fill="#2a2a2a" stroke={OUT} strokeWidth={SW} /></>)}
      {kind === 'kader' && (<path d="M0,-250 L0,-92 M-30,-250 L-8,-200 M30,-250 L8,-200" stroke={OUT} strokeWidth={SW} fill="none" />)}
      {kind === 'jabbar' && <path d="M-30,-250 L0,-216 L30,-250" fill="none" stroke={OUT} strokeWidth={SW} />}
      {kind === 'soleman' && (<><path d="M-46,-250 Q-50,-200 -34,-170 L-20,-250Z" fill="#fff" stroke={OUT} strokeWidth={SW} />{[-18, -8, 2, 12, 22].map((sx, i) => <path key={i} d={`M${sx},-250 L${sx},-60`} stroke="#c9a14a" strokeWidth={4} opacity={0.7} />)}</>)}
      {kind === 'ma' && <path d={`M${-bw / 2},-190 L${bw / 2},-150 M${-bw / 2},-130 L${bw / 2},-90`} stroke="#333" strokeWidth={10} opacity={0.5} />}
      {/* arm (front: left) */}
      <g transform={`translate(${-bw / 2 + 4},-226) rotate(${armL})`}>
        <Limb w={24} len={100} fill={kind === 'tarek' || kind === 'kader' || kind === 'jabbar' || kind === 'rubel' || kind === 'majid' ? c.top : c.skin} />
        <circle cx={0} cy={104} r={13} fill={c.skin} stroke={OUT} strokeWidth={SW} />
        {kind === 'hasna' && [20, 30, 40].map((yy, i) => <rect key={i} x={-13} y={80 + yy / 2} width={26} height={5} rx={2} fill="#4CAF74" stroke={OUT} strokeWidth={1} />)}
        <g transform="translate(0,104)">{propL}</g>
      </g>
      {/* head */}
      <g transform={`translate(0,${-300 + (expr === 'worried' || expr === 'sad' ? 4 : 0)})`}>
        <Head kind={kind} c={c} e={expr} talking={talking} f={f} blink={blink} masked={masked} />
      </g>
      {/* towel on soleman's shoulder */}
      {kind === 'soleman' && <rect x={-bw / 2 - 4} y={-262} width={44} height={16} rx={6} fill="#fff" stroke={OUT} strokeWidth={SW} />}
    </g>
  );
};

/* ---------- Props (placed at hand origin) ---------- */
export const PhoneProp: React.FC<{ear?: boolean; lit?: boolean}> = ({lit}) => (
  <g transform="translate(-8,-26) rotate(8)">
    <rect x={-9} y={-18} width={18} height={34} rx={4} fill="#2b2b35" stroke={OUT} strokeWidth={SW} />
    {lit && <rect x={-6} y={-14} width={12} height={24} rx={2} fill="#bde6ff" />}
  </g>
);
export const StickProp: React.FC = () => (
  <rect x={-5} y={-120} width={10} height={170} rx={5} fill="#8B5A2B" stroke={OUT} strokeWidth={SW} />
);
export const GlassProp: React.FC = () => (
  <g transform="translate(0,-26)">
    <path d="M-16,-30 L16,-30 L12,10 L-12,10Z" fill="#cfeeff" fillOpacity={0.85} stroke={OUT} strokeWidth={SW} />
    <path d="M-14,-14 L14,-14 L12,10 L-12,10Z" fill="#7ec8f0" />
  </g>
);
export const KeysProp: React.FC = () => (
  <g transform="translate(0,6)">
    <circle cx={0} cy={0} r={11} fill="none" stroke="#999" strokeWidth={4} />
    {[-14, 0, 14].map((a, i) => <g key={i} transform={`rotate(${a}) translate(0,12)`}><rect x={-3} y={0} width={6} height={24} fill="#d4af37" stroke={OUT} strokeWidth={1.5} /><rect x={-3} y={16} width={12} height={5} fill="#d4af37" stroke={OUT} strokeWidth={1.5} /></g>)}
  </g>
);
export const NotebookProp: React.FC = () => (
  <g transform="translate(0,-10) rotate(-8)">
    <rect x={-22} y={-30} width={44} height={56} rx={4} fill="#f2e3b3" stroke={OUT} strokeWidth={SW} />
    {[-18, -8, 2, 12].map((yy, i) => <path key={i} d={`M-14,${yy} L14,${yy}`} stroke="#8a7a50" strokeWidth={2} />)}
  </g>
);
export const LanternProp: React.FC = () => (
  <g transform="translate(0,6)">
    <rect x={-12} y={0} width={24} height={34} rx={5} fill="#ffd36b" stroke={OUT} strokeWidth={SW} />
    <path d="M-10,0 Q0,-14 10,0" fill="none" stroke={OUT} strokeWidth={SW} />
  </g>
);
export const PlateProp: React.FC = () => (
  <g transform="translate(0,-14)">
    <ellipse cx={0} cy={0} rx={34} ry={9} fill="#fff" stroke={OUT} strokeWidth={SW} />
    <ellipse cx={0} cy={-8} rx={22} ry={10} fill="#fff6dc" stroke={OUT} strokeWidth={SW} />
  </g>
);
