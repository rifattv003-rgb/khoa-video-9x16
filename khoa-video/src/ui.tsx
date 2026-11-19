import React from 'react';
import {loadFont} from '@remotion/google-fonts/HindSiliguri';
import {AbsoluteFill} from 'remotion';
import {CAPTIONS, HIDE} from './captions';
import {W, H, WW, WH, pop, fadeIO, FPS} from './timing';

const {fontFamily} = loadFont('normal', {weights: ['500', '700'], subsets: ['bengali', 'latin']});
export const FONT = fontFamily;
export const OUT = '#222222';

/* ---------------- Captions (floating overlay, only when no card/bubble) ---------------- */
export const CaptionOverlay: React.FC<{t: number}> = ({t}) => {
  if (HIDE.some(([a, b]) => t >= a && t < b)) return null;
  const cap = CAPTIONS.find(([a, b]) => t >= a && t < b);
  if (!cap) return null;
  const [a, b, text] = cap;
  const inP = Math.min(1, (t - a) / 0.18);
  const outP = Math.min(1, (b - t) / 0.12);
  const o = Math.max(0, Math.min(inP, outP));
  const parts = text.split('**');
  return (
    <div style={{position: 'absolute', left: 40, right: 40, bottom: 190, display: 'flex', justifyContent: 'center', opacity: o, transform: `translateY(${(1 - o) * 24}px)`}}>
      <div style={{fontFamily: FONT, fontWeight: 700, fontSize: 64, lineHeight: 1.3, textAlign: 'center', color: '#fff', padding: '10px 30px', borderRadius: 22, background: 'rgba(10,10,20,0.6)', textShadow: '0 3px 8px rgba(0,0,0,0.8)'}}>
        {parts.map((p, i) => (i % 2 ? <span key={i} style={{color: '#FFD84D'}}>{p}</span> : <span key={i}>{p}</span>))}
      </div>
    </div>
  );
};

/* ---------------- Badges / stamps / cards ---------------- */
export const PillBadge: React.FC<{t: number; at: number; until: number; x: number; y: number; text: string; color?: string}> = ({t, at, until, x, y, text, color = '#FF8A3D'}) => {
  const p = pop(t, at) * fadeIO(t, at, until, 0.25) ** 0.5;
  if (t < at || t > until) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,0) scale(${p})`, fontFamily: FONT, fontWeight: 700, fontSize: 40, color: '#fff', background: color, border: `3px solid ${OUT}`, borderRadius: 40, padding: '4px 28px', whiteSpace: 'nowrap', opacity: Math.min(1, p)}}>
      {text}
    </div>
  );
};

export const Stamp: React.FC<{t: number; at: number; until: number; x: number; y: number; text: string; color?: string; rot?: number; size?: number}> = ({t, at, until, x, y, text, color = '#E23B3B', rot = -6, size = 78}) => {
  if (t < at || t > until) return null;
  const k = t - at;
  const sc = k < 0.25 ? 2.2 - k * 4.8 : 1;
  const o = Math.min(1, k / 0.12) * Math.min(1, (until - t) / 0.25);
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${sc})`, opacity: o, fontFamily: FONT, fontWeight: 700, fontSize: size, color, border: `8px solid ${color}`, borderRadius: 20, padding: '6px 36px', background: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap'}}>
      {text}
    </div>
  );
};

export const Card: React.FC<{t: number; at: number; until: number; x: number; y: number; w?: number; bg?: string; fg?: string; border?: string; children: React.ReactNode; from?: 'left' | 'right' | 'bottom' | 'pop'; shakeAmp?: number; f?: number}> = ({t, at, until, x, y, w = 560, bg = '#FFF8E7', fg = '#222', border = OUT, children, from = 'pop', shakeAmp = 0, f = 0}) => {
  if (t < at || t > until) return null;
  const p = pop(t, at, 13);
  const o = Math.min(1, (until - t) / 0.3);
  const off = from === 'left' ? (1 - p) * -400 : from === 'right' ? (1 - p) * 400 : from === 'bottom' ? (1 - p) * 300 : 0;
  const sc = from === 'pop' ? 0.6 + 0.4 * p : 1;
  const dx = from === 'bottom' || from === 'pop' ? 0 : off;
  const dy = from === 'bottom' ? off : 0;
  return (
    <div style={{position: 'absolute', left: x + Math.sin(f * 2.9) * shakeAmp, top: y, width: w, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${sc})`, opacity: Math.min(1, p) * o, background: bg, color: fg, border: `5px solid ${border}`, borderRadius: 28, padding: '22px 30px', fontFamily: FONT, fontWeight: 700, textAlign: 'center', boxShadow: '0 14px 30px rgba(0,0,0,0.35)'}}>
      {children}
    </div>
  );
};

/* Thought / speech callout, tail points to (tx,ty) */
export const Bubble: React.FC<{t: number; at: number; until: number; x: number; y: number; w?: number; tx: number; ty: number; kind?: 'thought' | 'speech'; children: React.ReactNode}> = ({t, at, until, x, y, w = 560, tx, ty, kind = 'thought', children}) => {
  if (t < at || t > until) return null;
  const p = pop(t, at, 12);
  const o = Math.min(1, (until - t) / 0.3);
  const ang = Math.atan2(ty - y, tx - x);
  const dots = [0.55, 0.7, 0.84];
  return (
    <>
      {kind === 'thought' && dots.map((d, i) => (
        <div key={i} style={{position: 'absolute', left: x + (tx - x) * d, top: y + (ty - y) * d, width: 34 - i * 8, height: 34 - i * 8, borderRadius: '50%', background: '#fff', border: `3px solid ${OUT}`, transform: `translate(-50%,-50%) scale(${p})`, opacity: o}} />
      ))}
      {kind === 'speech' && (
        <div style={{position: 'absolute', left: x + Math.cos(ang) * 120, top: y + Math.sin(ang) * 80, width: 0, height: 0, opacity: o, transform: `translate(-50%,-50%) rotate(${ang * 57.3 - 90}deg) scale(${p})`, borderLeft: '26px solid transparent', borderRight: '26px solid transparent', borderTop: `60px solid ${OUT}`}} />
      )}
      <div style={{position: 'absolute', left: x, top: y, width: w, transform: `translate(-50%,-50%) scale(${0.5 + 0.5 * p})`, opacity: Math.min(1, p) * o, background: '#fff', color: '#222', border: `5px solid ${OUT}`, borderRadius: kind === 'thought' ? 60 : 30, padding: '22px 34px', fontFamily: FONT, fontWeight: 700, fontSize: 46, textAlign: 'center', boxShadow: '0 10px 24px rgba(0,0,0,0.3)'}}>
        {children}
      </div>
    </>
  );
};

/* ---------------- Icons (SVG, 120x120 viewBox) ---------------- */
type IP = {size?: number; style?: React.CSSProperties};
const Ic: React.FC<IP & {children: React.ReactNode}> = ({size = 140, style, children}) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{overflow: 'visible', ...style}}>{children}</svg>
);
const S = {stroke: OUT, strokeWidth: 4, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
export const ClockIcon: React.FC<IP & {t?: number}> = ({t = 0, ...p}) => (
  <Ic {...p}><circle cx={60} cy={60} r={48} fill="#fff" {...S} /><path d="M60,22 L60,26 M60,94 L60,98 M22,60 L26,60 M94,60 L98,60" {...S} />
    <path d={`M60,60 L60,34`} {...S} transform={`rotate(${t * 720} 60 60)`} /><path d="M60,60 L80,66" {...S} transform={`rotate(${t * 60} 60 60)`} /><circle cx={60} cy={60} r={5} fill={OUT} /></Ic>
);
export const QuestionIcon: React.FC<IP> = (p) => (
  <Ic {...p}><circle cx={60} cy={60} r={50} fill="#FFD84D" {...S} /><path d="M42,46 Q42,26 60,26 Q80,26 80,46 Q80,58 60,66 L60,76" fill="none" {...S} strokeWidth={9} /><circle cx={60} cy={95} r={6} fill={OUT} /></Ic>
);
export const WarningIcon: React.FC<IP> = (p) => (
  <Ic {...p}><path d="M60,12 L112,104 L8,104Z" fill="#FFB020" {...S} /><path d="M60,46 L60,74" {...S} strokeWidth={9} /><circle cx={60} cy={90} r={6} fill={OUT} /></Ic>
);
export const KeyIcon: React.FC<IP> = (p) => (
  <Ic {...p}><circle cx={34} cy={60} r={24} fill="#FFD84D" {...S} /><circle cx={34} cy={60} r={8} fill="#fff" {...S} /><path d="M58,60 L108,60 M92,60 L92,78 M104,60 L104,74" {...S} strokeWidth={8} /></Ic>
);
export const LockIcon: React.FC<IP & {open?: boolean}> = ({open, ...p}) => (
  <Ic {...p}><path d={open ? 'M34,52 L34,34 Q34,10 58,10 Q80,10 80,30' : 'M34,52 L34,34 Q34,10 60,10 Q86,10 86,34 L86,52'} fill="none" {...S} strokeWidth={9} /><rect x={20} y={50} width={80} height={56} rx={10} fill="#FFB020" {...S} /><circle cx={60} cy={76} r={7} fill={OUT} /></Ic>
);
export const MilkCanIcon: React.FC<IP & {cross?: boolean}> = ({cross, ...p}) => (
  <Ic {...p}><path d="M34,36 L86,36 L92,106 L28,106Z" fill="#D6DCE6" {...S} /><rect x={38} y={20} width={44} height={16} rx={6} fill="#B7C0CF" {...S} /><path d="M40,62 L80,62" {...S} />
    {cross && <path d="M14,14 L106,106 M106,14 L14,106" stroke="#E23B3B" strokeWidth={12} strokeLinecap="round" />}</Ic>
);
export const TakaIcon: React.FC<IP & {color?: string}> = ({color = '#3FB36B', ...p}) => (
  <Ic {...p}><circle cx={60} cy={60} r={50} fill={color} {...S} /><text x={60} y={84} textAnchor="middle" fontSize={68} fontFamily={FONT} fontWeight={700} fill="#fff">৳</text></Ic>
);
export const HouseIcon: React.FC<IP & {bamboo?: boolean}> = ({bamboo, ...p}) => (
  <Ic {...p}><path d="M10,58 L60,16 L110,58Z" fill="#B5651D" {...S} /><rect x={22} y={58} width={76} height={46} fill="#F3E0B5" {...S} /><rect x={52} y={74} width={18} height={30} fill="#8B5A2B" {...S} />
    {bamboo && <><path d="M26,40 L94,40 M34,28 L86,28" stroke="#6BA34A" strokeWidth={7} strokeLinecap="round" /><path d="M10,12 L110,108 M110,12 L10,108" stroke="#E23B3B" strokeWidth={11} strokeLinecap="round" /></>}</Ic>
);
export const MoonIcon: React.FC<IP> = (p) => (
  <Ic {...p}><path d="M80,14 A48,48 0 1 0 106,80 A38,38 0 1 1 80,14Z" fill="#FFE9A0" {...S} /></Ic>
);
export const ShushIcon: React.FC<IP> = (p) => (
  <Ic {...p}><circle cx={60} cy={60} r={48} fill="#F6C99A" {...S} /><circle cx={42} cy={48} r={5} fill={OUT} /><circle cx={78} cy={48} r={5} fill={OUT} /><path d="M46,82 L74,82" {...S} /><rect x={54} y={66} width={12} height={44} rx={6} fill="#F6C99A" {...S} /></Ic>
);
export const CheckIcon: React.FC<IP> = (p) => (
  <Ic {...p}><circle cx={60} cy={60} r={50} fill="#3FB36B" {...S} /><path d="M32,62 L52,82 L90,40" fill="none" stroke="#fff" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" /></Ic>
);
export const HeartIcon: React.FC<IP> = (p) => (
  <Ic {...p}><path d="M60,104 C10,66 12,22 40,22 C52,22 58,30 60,38 C62,30 68,22 80,22 C108,22 110,66 60,104Z" fill="#F0506E" {...S} /></Ic>
);
export const CalendarIcon: React.FC<IP> = (p) => (
  <Ic {...p}><rect x={12} y={22} width={96} height={86} rx={12} fill="#fff" {...S} /><rect x={12} y={22} width={96} height={26} rx={12} fill="#E23B3B" {...S} /><path d="M36,10 L36,32 M84,10 L84,32" {...S} strokeWidth={7} />{[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <rect key={r * 4 + c} x={24 + c * 20} y={58 + r * 16} width={12} height={10} fill="#999" />))}</Ic>
);
export const PhoneIcon: React.FC<IP & {rec?: boolean}> = ({rec, ...p}) => (
  <Ic {...p}><rect x={30} y={6} width={60} height={108} rx={12} fill="#2b2b35" {...S} /><rect x={36} y={18} width={48} height={78} rx={4} fill="#BDE6FF" />{rec && <circle cx={46} cy={28} r={5} fill="#E23B3B" />}<path d="M44,80 L56,66 L66,76 L76,60" fill="none" stroke="#2b2b35" strokeWidth={4} /></Ic>
);
export const PersonIcon: React.FC<IP & {color?: string; hat?: string}> = ({color = '#888', hat, ...p}) => (
  <Ic {...p}><circle cx={60} cy={36} r={24} fill="#F0C9A0" {...S} />{hat && <path d="M34,30 Q60,0 86,30Z" fill={hat} {...S} />}<path d="M18,112 Q18,66 60,66 Q102,66 102,112Z" fill={color} {...S} /></Ic>
);
export const RickshawIcon: React.FC<IP> = (p) => (
  <Ic {...p}><circle cx={28} cy={92} r={20} fill="none" {...S} strokeWidth={6} /><circle cx={96} cy={92} r={16} fill="none" {...S} strokeWidth={6} /><path d="M28,92 L50,52 L84,52 L96,92 M50,52 L50,30 L86,30 Q92,50 84,52" fill="#FFB020" {...S} /><path d="M20,40 L56,40" {...S} /></Ic>
);
export const ShoeIcon: React.FC<IP> = (p) => (
  <Ic {...p}><path d="M14,40 L44,40 L50,64 Q80,66 106,84 L106,100 L14,100Z" fill="#8B5A2B" {...S} /><path d="M14,92 L106,92" {...S} /><path d="M30,52 L40,58 M34,44 L44,50" {...S} /></Ic>
);
export const ScissorsIcon: React.FC<IP> = (p) => (
  <Ic {...p}><circle cx={34} cy={92} r={16} fill="none" {...S} strokeWidth={6} /><circle cx={86} cy={92} r={16} fill="none" {...S} strokeWidth={6} /><path d="M42,78 L92,14 M78,78 L28,14" {...S} strokeWidth={7} /></Ic>
);
export const CommentIcon: React.FC<IP> = (p) => (
  <Ic {...p}><path d="M14,18 L106,18 Q112,18 112,26 L112,74 Q112,82 106,82 L56,82 L32,104 L34,82 L14,82 Q8,82 8,74 L8,26 Q8,18 14,18Z" fill="#4FA3F7" {...S} /><path d="M30,40 L90,40 M30,58 L72,58" stroke="#fff" strokeWidth={7} strokeLinecap="round" /></Ic>
);
export const BellIcon: React.FC<IP> = (p) => (
  <Ic {...p}><path d="M60,12 Q86,16 86,56 L98,86 L22,86 L34,56 Q34,16 60,12Z" fill="#FFD84D" {...S} /><path d="M48,92 Q60,112 72,92" fill="#FFB020" {...S} /></Ic>
);
export const PhoneCallIcon = PhoneIcon;
export const ArrowRight: React.FC<{size?: number; color?: string}> = ({size = 120, color = '#fff'}) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 120 72"><path d="M6,36 L96,36 M72,10 L100,36 L72,62" fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* ---------------- Atmosphere ---------------- */
export const Vignette: React.FC<{strength?: number; color?: string}> = ({strength = 0.7, color = '0,0,0'}) => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at center, rgba(${color},0) 40%, rgba(${color},${strength}) 100%)`, pointerEvents: 'none'}} />
);

export const Fog: React.FC<{f: number; y?: number; o?: number; color?: string}> = ({f, y = 620, o = 0.22, color = '200,215,235'}) => (
  <>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{position: 'absolute', left: ((f * (0.6 + i * 0.3) + i * 700) % (WW + 900)) - 900, top: y + i * 70, width: 900, height: 170, borderRadius: '50%', background: `rgba(${color},${o})`, filter: 'blur(40px)'}} />
    ))}
  </>
);

export const Moon: React.FC<{x: number; y: number; r?: number}> = ({x, y, r = 70}) => (
  <svg style={{position: 'absolute', left: 0, top: 0}} width={W} height={H}>
    <circle cx={x} cy={y} r={r * 1.9} fill="rgba(255,244,200,0.08)" /><circle cx={x} cy={y} r={r * 1.4} fill="rgba(255,244,200,0.12)" />
    <circle cx={x} cy={y} r={r} fill="#F4EFD2" /><circle cx={x - 20} cy={y - 14} r={r * 0.2} fill="#DAD4B4" /><circle cx={x + 24} cy={y + 18} r={r * 0.14} fill="#DAD4B4" />
  </svg>
);

export const Stars: React.FC<{f: number}> = ({f}) => (
  <svg style={{position: 'absolute', left: 0, top: 0}} width={W} height={H}>
    {Array.from({length: 28}).map((_, i) => {
      const x = (i * 211) % W, y = (i * 97) % 1000 + 20;
      return <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill="#fff" opacity={0.4 + 0.5 * Math.abs(Math.sin((f + i * 11) / 22))} />;
    })}
  </svg>
);

export const Lamp: React.FC<{x: number; y: number; f: number; flicker?: boolean}> = ({x, y, f, flicker = true}) => {
  const fl = flicker ? 0.75 + 0.25 * Math.sin(f * 0.9) * Math.cos(f * 0.37) : 1;
  return (
    <svg style={{position: 'absolute', left: 0, top: 0}} width={WW} height={WH}>
      <defs><radialGradient id={`lg${x}`}><stop offset="0%" stopColor="#FFD97A" stopOpacity={0.55 * fl} /><stop offset="100%" stopColor="#FFD97A" stopOpacity={0} /></radialGradient></defs>
      <circle cx={x} cy={y} r={230} fill={`url(#lg${x})`} />
      <rect x={x - 6} y={y} width={12} height={WH - y - 200} fill="#2a2a33" stroke={OUT} strokeWidth={2.5} />
      <rect x={x - 26} y={y - 14} width={52} height={18} rx={6} fill="#3a3a45" stroke={OUT} strokeWidth={2.5} />
      <circle cx={x} cy={y + 8} r={10} fill="#FFE9A0" opacity={fl} />
    </svg>
  );
};

/** torch / spotlight: dark overlay with a soft hole at (x,y) */
export const Torch: React.FC<{x: number; y: number; r?: number; dark?: number}> = ({x, y, r = 330, dark = 0.7}) => (
  <AbsoluteFill style={{background: `radial-gradient(circle ${r}px at ${x}px ${y}px, rgba(255,240,190,0.18) 0%, rgba(0,0,10,0) 55%, rgba(0,0,10,${dark}) 100%)`, pointerEvents: 'none'}} />
);

export const FadeBlack: React.FC<{o: number}> = ({o}) => <AbsoluteFill style={{background: '#000', opacity: o, pointerEvents: 'none'}} />;
export {FPS};
