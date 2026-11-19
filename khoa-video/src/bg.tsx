import React from 'react';
import {W, H, WW, WH} from './timing';
import {OUT} from './ui';

/** world-space layer (1920x1080, lives inside <Cam>) */
export const Svg: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', ...style}} width={WW} height={WH} viewBox={`0 0 ${WW} ${WH}`}>{children}</svg>
);
const so = {stroke: OUT, strokeWidth: 2.5, strokeLinejoin: 'round' as const};

/** full-screen sky gradient (screen space, outside <Cam>) */
export const Sky: React.FC<{id: string; stops: [number, string][]}> = ({id, stops}) => (
  <svg style={{position: 'absolute', left: 0, top: 0}} width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">{stops.map(([o, c], i) => <stop key={i} offset={o} stopColor={c} />)}</linearGradient></defs>
    <rect width={W} height={H} fill={`url(#${id})`} />
  </svg>
);
/** solid fill from screen-y to the bottom of the screen (extends the ground below the world art) */
export const GroundFill: React.FC<{y: number; color: string}> = ({y, color}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top: y, bottom: 0, background: color}} />
);

export const GroundBand: React.FC<{y: number; c1: string; c2?: string}> = ({y, c1, c2 = c1}) => (
  <Svg>
    <rect x={-400} y={y} width={WW + 800} height={WH - y} fill={c1} />
    <rect x={-400} y={y} width={WW + 800} height={10} fill={c2} />
  </Svg>
);

/** back wall of the sweet shop (dark brick-ish) with iron-grill door */
export const ShopBackWall: React.FC<{x: number; w: number; groundY: number; night?: boolean; doorOpenGlow?: boolean}> = ({x, w, groundY, night = true}) => {
  const wall = night ? '#4b3f46' : '#c58b62';
  return (
    <Svg>
      <rect x={x} y={120} width={w} height={groundY - 120} fill={wall} {...so} />
      {Array.from({length: 7}).map((_, r) => <path key={r} d={`M${x},${180 + r * 90} L${x + w},${180 + r * 90}`} stroke="rgba(0,0,0,0.22)" strokeWidth={3} />)}
      <rect x={x + w * 0.3} y={300} width={w * 0.34} height={groundY - 300} fill="#2a2a33" {...so} />
      {Array.from({length: 6}).map((_, i) => <path key={i} d={`M${x + w * 0.3 + 10 + i * (w * 0.34 - 20) / 5},310 L${x + w * 0.3 + 10 + i * (w * 0.34 - 20) / 5},${groundY - 10}`} stroke="#555" strokeWidth={5} />)}
      <rect x={x - 20} y={100} width={w + 40} height={30} fill="#3a2f35" {...so} />
    </Svg>
  );
};

export const SackPile: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {[[0, 0], [130, 0], [260, 0], [65, -105], [195, -105], [130, -210]].map(([dx, dy], i) => (
      <g key={i} transform={`translate(${dx},${dy})`}>
        <path d="M0,0 Q-6,-90 20,-100 L100,-100 Q126,-90 120,0Z" fill={i % 2 ? '#C9B27C' : '#B9A06A'} {...so} />
        <path d="M24,-100 Q60,-120 96,-100" fill="#a58c58" {...so} />
        <path d="M30,-60 L90,-60" stroke="rgba(0,0,0,0.25)" strokeWidth={3} />
      </g>
    ))}
  </g>
);

export const VanShape: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={0} y={-200} width={360} height={30} fill="#7a4f2b" {...so} />
    <rect x={20} y={-170} width={320} height={60} fill="#5a3b22" {...so} />
    {[0, 80, 160, 240].map((dx, i) => <rect key={i} x={40 + dx} y={-250} width={70} height={52} rx={8} fill="#C9B27C" {...so} />)}
    <rect x={-120} y={-150} width={130} height={20} rx={10} fill="#444" {...so} />
    <circle cx={60} cy={-70} r={46} fill="#222" {...so} /><circle cx={60} cy={-70} r={18} fill="#999" {...so} />
    <circle cx={300} cy={-70} r={46} fill="#222" {...so} /><circle cx={300} cy={-70} r={18} fill="#999" {...so} />
  </g>
);

export const Tree: React.FC<{x: number; y: number; s?: number; c?: string}> = ({x, y, s = 1, c = '#10231f'}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-14} y={-260} width={28} height={260} fill="#1a1512" />
    <circle cx={0} cy={-310} r={120} fill={c} /><circle cx={-90} cy={-250} r={80} fill={c} /><circle cx={90} cy={-250} r={80} fill={c} />
  </g>
);

export const Hut: React.FC<{x: number; y: number; s?: number; c?: string}> = ({x, y, s = 1, c = '#1e2233'}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={0} y={-200} width={300} height={200} fill={c} />
    <path d="M-20,-200 L150,-320 L320,-200Z" fill="#161a28" />
    <rect x={120} y={-120} width={60} height={120} fill="#0d1018" />
  </g>
);

export const IronDoor: React.FC<{x: number; y: number; w: number; h: number; open: number}> = ({x, y, w, h, open}) => (
  <g>
    {/* interior (cold room) */}
    <rect x={x} y={y} width={w} height={h} fill="#cfe9ff" {...so} />
    <rect x={x} y={y} width={w} height={h} fill="url(#coldGlow)" />
    {[0, 1, 2].map((r) => (
      <g key={r}>
        <rect x={x + 8} y={y + 30 + r * (h / 3.1) + h / 3.1 - 14} width={w - 16} height={12} fill="#8a9bb0" {...so} />
        {Array.from({length: 4}).map((_, i) => (
          <rect key={i} x={x + 18 + i * ((w - 36) / 4)} y={y + 30 + r * (h / 3.1) + h / 3.1 - 62} width={(w - 36) / 4 - 10} height={46} rx={8} fill="#fffaf0" {...so} />
        ))}
      </g>
    ))}
    {/* ice blocks */}
    {[0, 1, 2].map((i) => <rect key={i} x={x + 14 + i * ((w - 20) / 3)} y={y + h - 62} width={(w - 20) / 3 - 8} height={52} rx={6} fill="#a9dcff" stroke={OUT} strokeWidth={2.5} />)}
    {/* door leaf (scales away as it opens) */}
    <g transform={`translate(${x},${y}) scale(${Math.max(0.06, 1 - open * 0.94)},1)`}>
      <rect x={0} y={0} width={w} height={h} fill="#6b7280" {...so} />
      {[40, h - 40].map((yy) => <path key={yy} d={`M10,${yy} L${w - 10},${yy}`} stroke="#4b5260" strokeWidth={8} />)}
      {Array.from({length: 8}).map((_, i) => <circle key={i} cx={14 + (i % 2) * (w - 28)} cy={30 + Math.floor(i / 2) * (h - 60) / 3} r={5} fill="#333" />)}
    </g>
  </g>
);
export const ColdDefs: React.FC = () => (
  <defs><linearGradient id="coldGlow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity={0.5} /><stop offset="1" stopColor="#8fd0ff" stopOpacity={0.15} /></linearGradient></defs>
);

export const PoliceCar: React.FC<{x: number; y: number; f: number; flash: boolean; s?: number}> = ({x, y, f, flash, s = 1}) => {
  const a = flash ? Math.floor(f / 5) % 2 === 0 : true;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M0,-150 L60,-150 L110,-230 L290,-230 L340,-150 L420,-140 L420,-60 L0,-60Z" fill="#E9EEF7" {...so} />
      <path d="M0,-110 L420,-110 L420,-85 L0,-85Z" fill="#2E5CB8" />
      <path d="M118,-222 L172,-222 L172,-158 L78,-158Z M186,-222 L282,-222 L322,-158 L186,-158Z" fill="#8ED0FF" {...so} />
      <rect x={170} y={-262} width={90} height={30} rx={8} fill="#222" {...so} />
      <rect x={174} y={-258} width={40} height={22} rx={6} fill={a ? '#ff2d2d' : '#5a1a1a'} />
      <rect x={218} y={-258} width={38} height={22} rx={6} fill={a ? '#1a2a5a' : '#2d6bff'} />
      <circle cx={95} cy={-60} r={42} fill="#222" {...so} /><circle cx={95} cy={-60} r={16} fill="#999" />
      <circle cx={335} cy={-60} r={42} fill="#222" {...so} /><circle cx={335} cy={-60} r={16} fill="#999" />
      <circle cx={-6} cy={-120} r={14} fill="#FFF3A0" />
    </g>
  );
};

export const Counter: React.FC<{y: number}> = ({y}) => (
  <Svg>
    <rect x={-400} y={y} width={WW + 800} height={WH - y} fill="#8B5A2B" {...so} />
    <rect x={-400} y={y} width={WW + 800} height={26} fill="#C98B4C" {...so} />
    {Array.from({length: 9}).map((_, i) => <path key={i} d={`M${i * 240},${y + 26} L${i * 240},${WH}`} stroke="rgba(0,0,0,0.25)" strokeWidth={3} />)}
  </Svg>
);
export const SweetTray: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={0} y={0} width={420} height={26} rx={8} fill="#d8d8d8" {...so} />
    {Array.from({length: 6}).map((_, i) => <ellipse key={i} cx={40 + i * 68} cy={-10} rx={30} ry={18} fill="#FFF3D6" {...so} />)}
  </g>
);
