import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, useF, win, pop, lerp, W} from '../timing';
import {Cam, mkCam} from '../cam';
import {Svg, Sky, GroundBand, GroundFill, ShopBackWall, SackPile, VanShape, Tree, IronDoor, ColdDefs, Hut} from '../bg';
import {Character, PhoneProp, StickProp, GlassProp, KeysProp, LanternProp} from '../Character';
import {Bubble, PillBadge, Stamp, Card, ClockIcon, QuestionIcon, KeyIcon, LockIcon, MilkCanIcon, PersonIcon, Vignette, Fog, Moon, Stars, Lamp, Torch, OUT} from '../ui';

/* ============ SCENE 1 : 0 – 23s ============ */
export const Scene1: React.FC = () => {
  const t = useT();
  const f = useF();
  const walk = lerp(t, 19.8, 22.8, 0, 1);
  const rx = 760 + walk * 640;
  const cx = 900 + walk * 450;
  const C = mkCam(cx);
  const swing = walk > 0 && walk < 1 ? Math.sin(f / 3) * 14 : 0;
  const stickHeld = t < 7.0;
  const torch = t > 19.8;
  return (
    <AbsoluteFill>
      <Sky id="s1" stops={[[0, '#070b1c'], [0.55, '#141c3f'], [0.8, '#222a52'], [1, '#161a2b']]} />
      <Stars f={f} />
      <Moon x={860} y={250} />
      <GroundFill y={C.sy(930)} color="#161a2b" />
      <Cam cx={cx}>
        <Svg><Hut x={1380} y={760} s={1.1} /><Hut x={-80} y={760} s={0.9} /></Svg>
        <Tree x={1850} y={800} s={1.1} />
        <ShopBackWall x={420} w={700} groundY={930} />
        <GroundBand y={930} c1="#161a2b" c2="#232842" />
        <Svg>
          <g transform="translate(1180,780)">
            <rect x={0} y={-160} width={200} height={160} fill="#2a2430" stroke={OUT} strokeWidth={2.5} />
            <path d="M-14,-160 L100,-230 L214,-160Z" fill="#3a2f3e" stroke={OUT} strokeWidth={2.5} />
            <rect x={20} y={-110} width={160} height={110} fill="#1a161e" />
          </g>
          {!stickHeld && <rect x={560} y={600} width={12} height={330} rx={6} fill="#8B5A2B" stroke={OUT} strokeWidth={2.5} transform="rotate(7 566 930)" />}
        </Svg>
        <Lamp x={1000} y={380} f={f} />
        <Fog f={f} y={640} />
        <Svg>
          <Character kind="soleman" x={1290} y={830} s={1.05} opacity={0.55} seed={3} />
          <Character
            kind="rubel" x={rx} y={930} s={1.8}
            expr={t < 5 ? 'worried' : t < 19.8 ? 'think' : 'angry'}
            armL={torch ? 6 : t < 5 ? 158 : 6} armR={torch ? -100 + swing : stickHeld ? (t > 5 ? -60 : -4) : -6}
            propL={!torch && t < 5 ? <PhoneProp /> : null}
            propR={torch ? <PhoneProp lit /> : stickHeld ? <StickProp /> : null}
            tremble={t < 12 ? 1.2 : 0}
          />
        </Svg>
        {torch && (
          <Svg>
            <defs><linearGradient id="beam" x1="0" x2="1"><stop offset="0" stopColor="#fff6c8" stopOpacity={0.7} /><stop offset="1" stopColor="#fff6c8" stopOpacity={0} /></linearGradient></defs>
            <path d={`M${rx + 140},${520} L${rx + 800},${720} L${rx + 800},${320}Z`} fill="url(#beam)" opacity={lerp(t, 19.8, 20.6, 0, 1)} />
          </Svg>
        )}
        {win(t, 10.2, 12.8) && (
          <div style={{position: 'absolute', left: rx - 100, top: 90, transform: `scale(${pop(t, 10.2)}) rotate(${Math.sin(f / 5) * 5}deg)`}}><QuestionIcon size={200} /></div>
        )}
      </Cam>
      <Vignette strength={0.75} color="0,0,12" />
      {win(t, 7.8, 10.2) && (
        <>
          <div style={{position: 'absolute', left: W / 2 - 115, top: 200, transform: `scale(${pop(t, 7.8)})`}}><ClockIcon size={230} t={(t - 7.8) * 0.5} /></div>
          <Stamp t={t} at={8.1} until={10.2} x={W / 2} y={520} text="২২ মিনিট" color="#FFB020" rot={-5} />
        </>
      )}
      <Bubble t={t} at={12.9} until={14.8} x={W / 2} y={330} w={300} tx={C.sx(850)} ty={C.sy(400)}>
        <svg width={220} height={260} viewBox="-110 -290 220 300" style={{display: 'block', margin: '0 auto'}}>
          <Character kind="ma" x={0} y={0} s={0.75} talking expr="worried" propR={<LanternProp />} />
        </svg>
      </Bubble>
      <Bubble t={t} at={14.8} until={19.8} x={W / 2} y={330} w={800} tx={C.sx(850)} ty={C.sy(400)}>
        অন্যের ব্যাপারে <span style={{color: '#E23B3B'}}>নাক গলানো</span> আর একটা <span style={{color: '#1F8A4C'}}>প্রশ্ন করা</span> তো এক জিনিস না।
      </Bubble>
    </AbsoluteFill>
  );
};

/* ============ SCENE 2 : 23 – 40.4s ============ */
export const Scene2: React.FC = () => {
  const t = useT();
  const f = useF();
  const rise = pop(t, 32.4, 14);
  const tarpOff = lerp(t, 32.4, 33.6, 0, 1);
  const zin = lerp(t, 36.0, 37.6, 0, 1) - lerp(t, 39.4, 40.4, 0, 1);
  const z = 1 + 0.5 * zin;
  const cx = 1330 + 230 * zin;
  const cy = 600 + 120 * zin;
  const C = mkCam(cx, z, cy);
  const mjUp = win(t, 24.8, 31.4);
  return (
    <AbsoluteFill>
      <Sky id="s2" stops={[[0, '#04060f'], [0.55, '#0e1430'], [0.8, '#1a2146'], [1, '#121626']]} />
      <Stars f={f} />
      <Moon x={200} y={300} r={55} />
      <GroundFill y={C.sy(880)} color="#121626" />
      <Cam cx={cx} z={z} cy={cy}>
        <Tree x={120} y={880} s={1.5} /><Tree x={1840} y={860} s={1.2} />
        <GroundBand y={880} c1="#121626" c2="#1d2340" />
        <Svg><VanShape x={500} y={900} s={1.0} /></Svg>
        <Fog f={f} y={700} o={0.25} />
        <Svg>
          <Character kind="jabbar" x={850} y={900} s={1.35} armL={t > 26 ? 40 : 4} seed={5} opacity={0.9} />
          <Character kind="rubel" x={980} y={940} s={1.75} expr={t < 31 ? 'worried' : 'surprised'} armL={6} armR={-100} propR={<PhoneProp lit />} tremble={t < 31 ? 1.4 : 0} />
          <Character kind="majid" x={1300} y={940} s={1.7} flip expr={mjUp ? 'worried' : 'sad'} armL={mjUp ? 135 : 8} armR={mjUp ? -135 : -8} tremble={mjUp ? 2.2 : 0} />
          {t >= 32.0 && <Character kind="hasna" x={1650} y={940 + (1 - rise) * 90} s={1.7} expr="sad" armL={t > 35 ? 18 : 4} opacity={Math.min(1, rise * 1.5)} seed={7} />}
          <SackPile x={1470} y={940} s={1.15} />
          <path d={`M${1470 + tarpOff * 380},${700} Q${1600 + tarpOff * 380},${560} ${1760 + tarpOff * 380},${700} L${1790 + tarpOff * 380},${940} L${1470 + tarpOff * 380},${940}Z`} fill="#6b6f78" stroke={OUT} strokeWidth={2.5} opacity={1 - tarpOff * 0.4} />
        </Svg>
        <Svg><defs><linearGradient id="b2" x1="0" x2="1"><stop offset="0" stopColor="#fff6c8" stopOpacity={0.5} /><stop offset="1" stopColor="#fff6c8" stopOpacity={0} /></linearGradient></defs>
          <path d={`M1200,520 L1920,380 L1920,900Z`} fill="url(#b2)" /></Svg>
        {win(t, 37.3, 40.4) && (
          <Svg><g transform={`translate(1590,${790 + Math.sin(f / 6) * 4})`}>
            {[0, 1, 2].map((i) => <circle key={i} cx={i * 22 - 20} cy={Math.sin(f / 5 + i) * 6} r={8} fill="#fff" stroke={OUT} strokeWidth={2} opacity={0.5 + 0.5 * Math.sin(f / 6 + i)} />)}
          </g></Svg>
        )}
        <PillBadge t={t} at={33.6} until={39.6} x={1650} y={360} text="খালা হাসনা" color="#4FA3F7" />
        <PillBadge t={t} at={24.8} until={29.5} x={1300} y={250} text="চাচা মজিদ" color="#FF8A3D" />
        {win(t, 29.0, 30.6) && <svg width={150} height={150} viewBox="0 0 120 120" style={{position: 'absolute', left: 1170, top: 130, transform: `scale(${pop(t, 29.0)})`}}><path d="M14,20 L56,14 L48,52 L70,60 L52,108 L20,70Z M64,16 L108,24 L92,60 L74,52Z" fill="#cfeeff" stroke={OUT} strokeWidth={4} strokeLinejoin="round" /></svg>}
      </Cam>
      <Vignette strength={0.8} color="0,0,10" />
    </AbsoluteFill>
  );
};

/* ============ SCENE 3 : 40.4 – 62.7s ============ */
export const Scene3: React.FC = () => {
  const t = useT();
  const f = useF();
  const open = lerp(t, 48.6, 50.0, 0, 1);
  const zin = lerp(t, 50.0, 52.0, 0, 1) - lerp(t, 58.0, 60.0, 0, 1);
  const z = 1 + 0.4 * zin;
  const cx = 1080 + 350 * zin;
  const C = mkCam(cx, z);
  const glassGive = t < 44;
  const keyTime = win(t, 44.4, 48.8);
  return (
    <AbsoluteFill>
      <Sky id="s3" stops={[[0, '#05070f'], [0.55, '#0f1533'], [0.8, '#1c2348'], [1, '#121626']]} />
      <Stars f={f} />
      <GroundFill y={C.sy(900)} color="#121626" />
      <Cam cx={cx} z={z}>
        <GroundBand y={900} c1="#121626" c2="#1d2340" />
        <Svg><ColdDefs /><rect x={1150} y={120} width={760} height={780} fill="#3a2f35" stroke={OUT} strokeWidth={2.5} />
          <IronDoor x={1250} y={260} w={350} h={640} open={open} /></Svg>
        {open > 0 && <div style={{position: 'absolute', left: 1130, top: 620, width: 560, height: 400, borderRadius: '50%', background: 'rgba(200,235,255,0.35)', filter: 'blur(50px)', opacity: open}} />}
        <Fog f={f} y={720} o={0.15} />
        <Svg>
          <Character kind="rubel" x={600} y={950} s={1.7} expr={t < 49.5 ? 'worried' : t < 55 ? 'surprised' : 'think'} armL={6} armR={glassGive ? -70 : -6} propR={glassGive ? <GlassProp /> : null} tremble={t < 40.8 ? 1 : 0} />
          <Character kind="hasna" x={860} y={950} s={1.55} expr={t < 43 ? 'sad' : 'neutral'} armL={t > 42.2 && t < 44 ? 60 : 6} armR={-6} seed={7} />
          <Character kind="majid" x={1070} y={950} s={1.65} flip expr={t < 50 ? 'worried' : 'neutral'} armL={keyTime ? 75 : 8} propL={keyTime ? <KeysProp /> : null} armR={-8} />
        </Svg>
        {keyTime && <div style={{position: 'absolute', left: 980, top: 230, transform: `scale(${pop(t, 44.4)}) rotate(${Math.sin(f / 4) * 8}deg)`}}><KeyIcon size={170} /></div>}
        {win(t, 47.6, 50.4) && <div style={{position: 'absolute', left: 1350, top: 110, transform: `scale(${pop(t, 47.6)})`}}><LockIcon size={150} open={t > 48.6} /></div>}
      </Cam>
      <Torch x={C.sx(1425)} y={C.sy(580)} r={800} dark={0.5 - open * 0.45} />
      {win(t, 55.6, 57.4) && <div style={{position: 'absolute', left: W / 2 - 130, top: 240, transform: `scale(${pop(t, 55.6)}) rotate(${Math.sin(f / 5) * 4}deg)`}}><MilkCanIcon size={260} cross /></div>}
      <Card t={t} at={59.4} until={62.7} x={W / 2} y={330} w={900} bg="#FFF8E7">
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4}}>
          {Array.from({length: 40}).map((_, i) => (
            <div key={i} style={{transform: `scale(${pop(t, 59.6 + i * 0.045)})`}}><PersonIcon size={78} color={['#E58B6B', '#6AA6D6', '#9ED89E', '#E5B94D'][i % 4]} /></div>
          ))}
        </div>
      </Card>
      <Stamp t={t} at={59.5} until={62.7} x={W / 2} y={700} text="পদ্মপাড়ার ৪০ জন মেয়ে" color="#C2410C" rot={-3} size={50} />
      <Vignette strength={0.55} color="0,0,12" />
    </AbsoluteFill>
  );
};
