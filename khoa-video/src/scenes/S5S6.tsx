import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, useF, win, pop, lerp, shake, W} from '../timing';
import {Cam, mkCam} from '../cam';
import {Svg, Sky, GroundBand, GroundFill, Tree, PoliceCar, Counter, SweetTray, Hut} from '../bg';
import {Character, PhoneProp, NotebookProp, PlateProp} from '../Character';
import {Card, PillBadge, QuestionIcon, HeartIcon, Vignette, Fog, Stars, Moon, Lamp, FONT, OUT} from '../ui';

const Hl: React.FC<{c: string; children: React.ReactNode}> = ({c, children}) => <span style={{color: c}}>{children}</span>;

/* ============ SCENE 5 : 85 – 112.5s ============ */
export const Scene5: React.FC = () => {
  const t = useT();
  const f = useF();
  const carX = lerp(t, 85.3, 88.6, 2300, 1380);
  const flash = t < 107.0;
  const run = lerp(t, 91.8, 93.6, 0, 1);
  const rubelX = 600 + run * 320;
  const runSwing = run > 0 && run < 1 ? Math.sin(f / 2.5) * 40 : 0;
  const sh = t > 89.8 && t < 91.8 ? shake(f, 5) : {x: 0, y: 0};
  const phase = Math.floor(f / 5) % 2;
  const copsRun = lerp(t, 104.8, 106.6, 0, 1);
  const masked = t < 107.2;
  const cx = 900 + lerp(t, 99, 101, 0, 350);
  const C = mkCam(cx);
  const phoneUp = t > 93.6 && t < 101.5;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <div style={{position: 'absolute', inset: 0, transform: `translate(${sh.x}px,${sh.y}px)`}}>
        <Sky id="s5" stops={[[0, '#04060d'], [0.55, '#0c1226'], [0.78, '#161c38'], [1, '#232734']]} />
        <Stars f={f} />
        <Moon x={880} y={230} r={55} />
        <GroundFill y={C.sy(760)} color="#232734" />
        <Cam cx={cx}>
          <Svg><Hut x={-60} y={760} s={1.1} c="#1b2036" /></Svg>
          <Tree x={1840} y={780} s={1.3} />
          <GroundBand y={760} c1="#232734" c2="#2e3345" />
          <Svg><path d="M-400,900 L2300,900" stroke="#cfcfcf" strokeWidth={10} strokeDasharray="80 70" opacity={0.6} /></Svg>
          <Lamp x={420} y={330} f={f} />
          <Fog f={f} y={700} o={0.18} />
          <Svg>
            <g transform="translate(1560,880)" opacity={t < 106.6 ? 1 : 0.2}>
              <circle cx={0} cy={-40} r={40} fill="#0a0a0f" stroke="#000" strokeWidth={3} /><circle cx={150} cy={-40} r={40} fill="#0a0a0f" stroke="#000" strokeWidth={3} />
              <path d="M0,-40 L50,-120 L130,-120 L150,-40" fill="none" stroke="#0a0a0f" strokeWidth={14} strokeLinecap="round" />
              <circle cx={176} cy={-86} r={9} fill="#FFF6B0" opacity={0.5 + 0.5 * Math.sin(f / 4)} />
            </g>
          </Svg>
          <Svg><PoliceCar x={carX} y={900} f={f} flash={flash} s={1.15} /></Svg>
          <Svg>
            <Character kind="rubel" x={rubelX} y={960} s={1.75}
              expr={t < 89 ? 'surprised' : t < 91.8 ? 'worried' : t < 101 ? 'angry' : 'neutral'}
              armL={phoneUp ? 130 : 6 + runSwing} armR={-6 - runSwing} propL={phoneUp ? <PhoneProp lit /> : null}
              tremble={t > 89.8 && t < 91.8 ? 2.2 : 0} lean={run > 0 && run < 1 ? 10 : 0} />
            {t >= 101.0 && <Character kind="tarek" x={1290} y={960} s={1.75} flip talking={win(t, 102.0, 105.7)} armL={win(t, 103.9, 106) ? 105 : 6} />}
            {t >= 104.8 && <Character kind="tarek" x={1250 + copsRun * 250} y={900} s={1.25} flip expr="angry" seed={2} armL={20} armR={-20} />}
            {t >= 104.8 && <Character kind="tarek" x={1150 + copsRun * 290} y={930} s={1.35} flip expr="angry" seed={5} armL={-20} armR={20} />}
            {t >= 106.4 && <Character kind="kader" x={1650} y={960} s={1.75} flip masked={masked} expr={masked ? 'neutral' : 'sad'} armL={t > 108.6 ? 100 : 6} propL={t > 108.6 ? <NotebookProp /> : null} tremble={!masked ? 1.8 : 0} />}
          </Svg>
          <PillBadge t={t} at={101.7} until={108.4} x={1290} y={300} text="পুলিশ ভাই তারেক" color="#2E5CB8" />
          <PillBadge t={t} at={107.2} until={112.4} x={1650} y={290} text="দালাল কাদের মিয়া" color="#B23A3A" />
          {t > 108.8 && (
            <div style={{position: 'absolute', left: 1250, top: 60, transform: `scale(${pop(t, 108.8)}) rotate(-5deg)`}}>
              <svg width={230} height={290} viewBox="0 0 260 320"><rect x={10} y={10} width={240} height={300} rx={12} fill="#f2e3b3" stroke={OUT} strokeWidth={4} />{Array.from({length: 9}).map((_, i) => <path key={i} d={`M40,${50 + i * 28} L${130 + (i % 3) * 30},${50 + i * 28}`} stroke="#6b5a30" strokeWidth={5} strokeLinecap="round" />)}</svg>
            </div>
          )}
        </Cam>
        {flash && t > 87.5 && <AbsoluteFill style={{background: phase ? 'rgba(255,40,40,0.16)' : 'rgba(40,90,255,0.16)'}} />}
      </div>
      <Card t={t} at={93.9} until={101.7} x={W / 2} y={380} w={640} bg="#10141f" border="#7ED0FF" from="left">
        <svg width={560} height={300} viewBox="0 0 560 300" style={{display: 'block', background: '#0a0f1c', borderRadius: 12}}>
          <rect y={200} width={560} height={100} fill="#222733" /><path d="M0,250 L560,250" stroke="#aaa" strokeWidth={5} strokeDasharray="30 24" />
          <circle cx={30} cy={30} r={9} fill="#E23B3B" opacity={Math.floor(f / 12) % 2 ? 1 : 0.2} /><text x={50} y={38} fontSize={22} fill="#fff" fontFamily={FONT}>REC</text>
          <g transform={`translate(${lerp(t, 95.7, 99.5, 60, 330)},210)`}><rect x={0} y={-60} width={130} height={46} fill="#8B6B3E" stroke="#000" strokeWidth={2} /><rect x={-26} y={-44} width={30} height={30} fill="#444" /><circle cx={24} cy={-8} r={15} fill="#111" /><circle cx={104} cy={-8} r={15} fill="#111" /></g>
          <g transform={`translate(${lerp(t, 97.4, 100.0, -80, 140)},232)`}><circle cx={0} cy={0} r={13} fill="#111" /><circle cx={54} cy={0} r={13} fill="#111" /><path d="M0,0 L20,-26 L46,-26 L54,0" fill="none" stroke="#111" strokeWidth={6} /><circle cx={34} cy={-46} r={11} fill="#161616" /><rect x={26} y={-36} width={16} height={20} fill="#2d2d35" /></g>
          <rect x={400} y={0} width={160} height={300} fill="rgba(0,0,0,0.65)" />
        </svg>
      </Card>
      <Vignette strength={0.7} color="0,0,10" />
    </AbsoluteFill>
  );
};

/* ============ SCENE 6 : 112.5 – 144s ============ */
export const Scene6: React.FC = () => {
  const t = useT();
  const f = useF();
  const Z = 1, CX = 1110;
  const C = mkCam(CX, Z);
  const queue = t < 122 ? 2 : t < 123.2 ? 4 : t < 124.4 ? 6 : 8;
  const typed = Math.max(0, Math.min(1, (t - 118.2) / 3.4));
  const line = 'খালা হাসনা ও পদ্মপাড়ার মেয়েদের হাতের খোয়ায় তৈরি।';
  const give = t > 124 ? 70 + Math.sin(f / 6) * 8 : 8;
  return (
    <AbsoluteFill>
      <Sky id="s6" stops={[[0, '#7FB9F2'], [0.4, '#FFD9A8'], [0.7, '#FFB67A'], [1, '#C7A878']]} />
      <GroundFill y={C.sy(820)} color="#C7A878" />
      <GroundFill y={C.sy(1080)} color="#8B5A2B" />
      <Cam cx={CX} z={Z}>
        <Svg><circle cx={300} cy={420} r={120} fill="#FFF0B0" opacity={0.9} /><circle cx={300} cy={420} r={190} fill="#FFF0B0" opacity={0.25} /></Svg>
        <Tree x={90} y={820} s={1.1} c="#5E9E5A" /><Tree x={1860} y={820} s={1.0} c="#6AAE62" />
        <GroundBand y={820} c1="#C7A878" c2="#D9BE8F" />
        <Svg>
          <rect x={450} y={40} width={1320} height={780} fill="#E4C9A0" stroke={OUT} strokeWidth={3} />
          <rect x={490} y={70} width={1240} height={230} rx={18} fill="#1F6B4A" stroke={OUT} strokeWidth={5} />
          <text x={1110} y={160} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={90} fill="#FFF3C4">মিষ্টির দোকান</text>
          <path d="M550,200 L1670,200" stroke="#FFD84D" strokeWidth={4} />
          <text x={1110} y={265} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={44} fill="#FFE9A0">{t > 117.9 ? line.slice(0, Math.floor(line.length * typed)) : ''}</text>
          <path d="M490,300 L1730,300 L1770,360 L450,360Z" fill="#E55B3C" stroke={OUT} strokeWidth={3} />
          {Array.from({length: 8}).map((_, i) => <path key={i} d={`M${450 + i * 165},360 L${490 + i * 155},300`} stroke="#fff" strokeWidth={14} opacity={0.5} />)}
        </Svg>
        <Svg>
          <Character kind="majid" x={1540} y={900} s={1.2} flip expr="happy" armL={8} />
          <Character kind="hasna" x={1640} y={910} s={1.1} flip expr="happy" seed={7} />
          <Character kind="rubel" x={1330} y={900} s={1.35} flip expr="happy" armL={8} armR={t > 124 ? -(give + 30) : -8} propR={t > 124 ? <PlateProp /> : null} />
        </Svg>
        <Counter y={800} />
        <Svg><SweetTray x={1250} y={800} /><SweetTray x={800} y={800} /></Svg>
        <Svg>
          {Array.from({length: queue}).map((_, i) => (
            <Character key={i} kind={i % 2 ? 'extra1' : 'extra2'} x={640 + i * 78} y={1010 + (i % 2) * 12} s={1.4 - i * 0.015} expr={i % 3 ? 'happy' : 'neutral'} seed={i * 4} armL={4} opacity={Math.min(1, pop(t, [112.9, 113.8, 121.4, 121.9, 122.8, 123.2, 123.6, 124.1][i] ?? 113) * 2)} />
          ))}
        </Svg>
      </Cam>
      <Card t={t} at={128.3} until={137.8} x={W / 2} y={420} w={900} bg="#FFF8E7" border="#C2410C">
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 6, transform: `scale(${1 + 0.06 * Math.sin(f / 5)})`}}><QuestionIcon size={120} /></div>
        <div style={{fontSize: 50, lineHeight: 1.45}}>কারও সম্পর্কে <Hl c="#E23B3B">গুজব শুনে</Hl> হাত তোলার আগে নিজে এগিয়ে গিয়ে একটা <Hl c="#1F8A4C">প্রশ্ন করতে</Hl> হয়, কারণ যাকে অপরাধী ভাবছ সে হয়তো কাউকে <Hl c="#C2410C">বাঁচানোর চেষ্টাই</Hl> করছে।</div>
      </Card>
      <Card t={t} at={137.9} until={143.6} x={W / 2} y={420} w={900} bg="#FFECF1" border="#D81B60">
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 6, transform: `scale(${1 + 0.08 * Math.sin(f / 4)})`}}><HeartIcon size={130} /></div>
        <div style={{fontSize: 54, lineHeight: 1.45}}>যাদের হাতে আমাদের পাতের স্বাদ, তাদের <Hl c="#1F8A4C">ন্যায্য দাম</Hl> আর <Hl c="#D81B60">নামটা</Hl> দিতে পারাটাই আসল ব্যবসা।</div>
      </Card>
      <Vignette strength={0.25} color="90,40,0" />
    </AbsoluteFill>
  );
};
