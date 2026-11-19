import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, useF, win, pop, lerp, fadeIO, W, H} from '../timing';
import {Card, Stamp, PillBadge, CalendarIcon, TakaIcon, PersonIcon, WarningIcon, HouseIcon, MoonIcon, LockIcon, ShushIcon, CheckIcon, ArrowRight, QuestionIcon, RickshawIcon, ShoeIcon, ScissorsIcon, CommentIcon, HeartIcon, BellIcon, Vignette, FONT, OUT} from '../ui';

const Particles: React.FC<{f: number; color: string; n?: number}> = ({f, color, n = 26}) => (
  <>
    {Array.from({length: n}).map((_, i) => (
      <div key={i} style={{position: 'absolute', left: (i * 173) % W, top: ((i * 331 + f * (0.4 + (i % 4) * 0.25)) % (H + 100)) - 50, width: 8 + (i % 4) * 5, height: 8 + (i % 4) * 5, borderRadius: '50%', background: color, opacity: 0.25 + (i % 3) * 0.12}} />
    ))}
  </>
);
const Hl: React.FC<{c: string; children: React.ReactNode}> = ({c, children}) => <span style={{color: c}}>{children}</span>;

/* ============ SCENE 4 : 62.7 – 85s  (clean motion graphics, portrait) ============ */
export const Scene4: React.FC = () => {
  const t = useT();
  const f = useF();
  const CX = W / 2;
  const arrowP = lerp(t, 71.0, 71.8, 0, 1);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, #2b2160 0%, #171235 75%, #0c0a20 100%)'}}>
      <Particles f={f} color="#8F7BFF" />
      <Card t={t} at={62.9} until={66.8} x={CX} y={900} w={800} bg="#FFF8E7">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
          <CalendarIcon size={220} />
          <div style={{fontSize: 120}}>৩ বছর <Hl c="#E23B3B">আগে</Hl></div>
        </div>
      </Card>
      {win(t, 66.0, 75.4) && (
        <div style={{position: 'absolute', left: CX, top: 190, transform: `translateX(-50%) scale(${pop(t, 66.0)})`, opacity: fadeIO(t, 66.0, 75.4, 0.3)}}>
          <PersonIcon size={230} color="#5A3A25" hat="#222" />
        </div>
      )}
      <PillBadge t={t} at={66.3} until={75.2} x={CX} y={450} text="দালাল কাদের মিয়া" color="#B23A3A" />
      <Card t={t} at={68.6} until={75.4} x={CX} y={760} w={780} bg="#E8FFF0" border="#1F8A4C" from="left">
        <div style={{fontSize: 48, color: '#1F8A4C'}}>মেয়েদের কাছ থেকে</div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}><TakaIcon size={120} /><span style={{fontSize: 110}}>১২০ ৳</span></div>
        <div style={{fontSize: 42, color: '#555'}}>কিলো প্রতি</div>
      </Card>
      {win(t, 71.0, 75.4) && (
        <div style={{position: 'absolute', left: CX, top: 1060, transform: `translate(-50%,-50%) rotate(90deg) scale(${arrowP})`, opacity: fadeIO(t, 71.0, 75.4, 0.3)}}><ArrowRight size={170} color="#FFD84D" /></div>
      )}
      <Card t={t} at={71.5} until={75.4} x={CX} y={1330} w={780} bg="#FFECEC" border="#B23A3A" from="right">
        <div style={{fontSize: 48, color: '#B23A3A'}}>বাজারে বিক্রি</div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20}}><TakaIcon size={120} color="#E23B3B" /><span style={{fontSize: 110}}>৩৫০ ৳</span></div>
        <div style={{fontSize: 42, color: '#555'}}>কিলো প্রতি</div>
      </Card>
      <Stamp t={t} at={73.4} until={75.4} x={CX} y={1620} text="২৩০ ৳ বেশি মুনাফা" color="#F5B400" rot={-3} size={58} />

      {win(t, 75.5, 76.5) && (
        <div style={{position: 'absolute', inset: 0, opacity: fadeIO(t, 75.5, 76.5, 0.25)}}>
          <div style={{position: 'absolute', left: CX - 115, top: 520, transform: `scale(${pop(t, 75.5)})`}}><PersonIcon size={230} color="#F2F2F2" hat="#fff" /></div>
          <div style={{position: 'absolute', left: CX - 110, top: 790, transform: 'rotate(90deg)'}}><ArrowRight size={220} color="#7CF0A8" /></div>
          {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 190 + i * 250, top: 1100, transform: `scale(${pop(t, 75.6 + i * 0.1)})`}}><PersonIcon size={200} color={['#E58B6B', '#6AA6D6', '#9ED89E'][i]} /></div>)}
        </div>
      )}
      <Card t={t} at={76.4} until={81.2} x={CX} y={960} w={880} bg="#2B0E12" fg="#fff" border="#E23B3B" shakeAmp={t > 76.4 && t < 78 ? 5 : 0} f={f}>
        <div style={{display: 'flex', justifyContent: 'center', gap: 30, marginBottom: 14}}><WarningIcon size={170} /><HouseIcon size={190} bamboo /></div>
        <div style={{fontSize: 62, lineHeight: 1.4}}>যে মেয়ে <Hl c="#FFD84D">অন্য কারও কাছে</Hl> বেচবে, তার ঘরের চালে কেউ আর <Hl c="#FF6B6B">বাঁশও</Hl> দেবে না।</div>
      </Card>
      {[[81.3, <MoonIcon size={130} />, 'রাত দুটো'], [82.6, <LockIcon size={130} />, 'তালা'], [83.7, <ShushIcon size={130} />, 'চুপচাপ']].map(([at, icon, label], i) => (
        <Card key={i} t={t} at={at as number} until={85.2} x={CX} y={520 + i * 340} w={820} bg="#FFF8E7" from={i % 2 ? 'right' : 'left'}>
          <div style={{display: 'flex', alignItems: 'center', gap: 36}}>{icon as React.ReactNode}<span style={{fontSize: 96, flex: 1, textAlign: 'left'}}>{label as string}</span><CheckIcon size={90} /></div>
        </Card>
      ))}
      <Vignette strength={0.5} color="0,0,15" />
    </AbsoluteFill>
  );
};

/* ============ SCENE 7 : 144 – 170s  (CTA, portrait) ============ */
export const Scene7: React.FC = () => {
  const t = useT();
  const f = useF();
  const CX = W / 2;
  const opts: [number, React.ReactNode, string][] = [
    [153.6, <RickshawIcon size={190} />, 'রিকশাচালক'],
    [155.5, <ShoeIcon size={190} />, 'ফুটপাতের মুচি'],
    [157.7, <ScissorsIcon size={190} />, 'মহল্লার বুড়ো দর্জি'],
  ];
  const sub = pop(t, 165.5);
  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, #FFF3DA 0%, #FFD7A0 70%, #F2A76A 100%)'}}>
      <Particles f={f} color="#FFFFFF" n={22} />
      <Card t={t} at={144.3} until={152.9} x={CX} y={900} w={900} bg="#fff">
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 10, transform: `rotate(${Math.sin(f / 8) * 6}deg)`}}><QuestionIcon size={190} /></div>
        <div style={{fontSize: 62, lineHeight: 1.45}}>তোমরা কি কখনো এমন কাউকে চিনেছ, যার হাতের কাজে তোমার প্রতিদিনের <Hl c="#E2620B">স্বাদ বা আরাম</Hl> লুকিয়ে আছে, অথচ তার <Hl c="#C2185B">নামটা কেউ জানে না</Hl>?</div>
      </Card>
      {opts.map(([at, icon, label], i) => (
        <Card key={i} t={t} at={at} until={159.9} x={CX} y={520 + i * 380} w={800} bg="#fff" from={i % 2 ? 'right' : 'left'}>
          <div style={{display: 'flex', alignItems: 'center', gap: 40}}>{icon}<span style={{fontSize: 70, textAlign: 'left', flex: 1}}>{label}</span></div>
        </Card>
      ))}
      <Card t={t} at={159.9} until={162.2} x={CX} y={900} w={800} bg="#E8F3FF" border="#2F7FD8">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}><CommentIcon size={200} /><div style={{fontSize: 76}}><Hl c="#2F7FD8">কমেন্টে</Hl> তাঁর কথা লিখে জানাও</div></div>
      </Card>
      <Card t={t} at={162.2} until={165.5} x={CX} y={900} w={800} bg="#FFECF1" border="#D81B60">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}><div style={{transform: `scale(${1 + 0.08 * Math.sin(f / 4)})`}}><HeartIcon size={200} /></div><div style={{fontSize: 70}}>আজ আমরা সবাই মিলে <Hl c="#D81B60">তাঁদের নামটা</Hl> মনে রাখি</div></div>
      </Card>
      {t >= 165.5 && (
        <div style={{position: 'absolute', left: CX, top: 880, transform: `translate(-50%,-50%) scale(${sub})`, textAlign: 'center'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 26, background: '#E53935', color: '#fff', fontFamily: FONT, fontWeight: 700, fontSize: 84, padding: '26px 56px', borderRadius: 100, border: `6px solid ${OUT}`, boxShadow: '0 14px 30px rgba(0,0,0,0.3)'}}>
            <div style={{transform: `rotate(${Math.sin(f / 3) * 14}deg)`}}><BellIcon size={110} /></div>সাবস্ক্রাইব
          </div>
          {t > 167.9 && <div style={{marginTop: 60, fontFamily: FONT, fontWeight: 700, fontSize: 66, color: '#7A3E00', opacity: pop(t, 167.9)}}>আবার দেখা হবে <Hl c="#C2185B">নতুন গল্পে</Hl></div>}
        </div>
      )}
      <Vignette strength={0.3} color="120,60,0" />
    </AbsoluteFill>
  );
};
