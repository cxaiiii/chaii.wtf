'use client';

import { useEffect, useState } from 'react';

// Phrases shown in the hero phone, word by word, the way Akshara renders captions.
const PHRASES: { lang: string; dir?: 'rtl'; words: string[] }[] = [
  { lang: 'English', words: ['EVERY', 'WORD', 'YOU', 'SAY', 'BECOMES', 'MOTION'] },
  { lang: 'हिन्दी', words: ['हर', 'शब्द', 'बनता', 'है', 'मोशन'] },
  { lang: 'தமிழ்', words: ['ஒவ்வொரு', 'சொல்லும்', 'அசைவாகிறது'] },
  { lang: 'العربية', dir: 'rtl', words: ['كل', 'كلمة', 'تتحرك'] },
  { lang: '日本語', words: ['すべての', '言葉が', '動き出す'] },
  { lang: 'বাংলা', words: ['প্রতিটি', 'শব্দ', 'হয়ে', 'ওঠে', 'গতি'] },
];

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// One tick per word; each phrase then holds its full line for HOLD ticks.
const HOLD = 3;
const SCHEDULE = PHRASES.flatMap((ph, p) => Array.from({ length: ph.words.length + HOLD }, (_, w) => ({ p, w })));
const STILL = { p: 0, w: PHRASES[0].words.length };

export function KineticPhone() {
  const [tick, setTick] = useState(-1); // -1: full first line (server render, reduced motion)
  useEffect(() => {
    if (reduced()) return;
    setTick(0);
    const id = setInterval(() => setTick((t) => (t + 1) % SCHEDULE.length), 380);
    return () => clearInterval(id);
  }, []);
  const { p, w } = tick < 0 ? STILL : SCHEDULE[tick];
  const phrase = PHRASES[p];
  const shown = Math.min(w + 1, phrase.words.length);
  const speaking = w < phrase.words.length;
  return (
    <div className="ak-phone" aria-label="Animated captions in six scripts">
      <div className="ak-screen">
        <span className="ak-lang">{phrase.lang}</span>
        <p className="ak-cap" dir={phrase.dir} key={p}>
          {phrase.words.slice(0, shown).map((word, i) => (
            <span key={i} className={speaking && i === shown - 1 ? 'on' : ''}>{word}</span>
          ))}
        </p>
        <div className="ak-wave" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ animationDelay: `${(i * 97) % 900}ms` }} />)}</div>
      </div>
    </div>
  );
}

// Looping demo tiles for the caption styles.
const TILE_WORDS = ['WATCH', 'THIS', 'MOVE'];
export function StyleTile({ name, kind }: { name: string; kind: string }) {
  return (
    <article className={`ak-tile ${kind}`}>
      <div className="ak-tile-stage">
        {TILE_WORDS.map((word, i) => (
          <span key={i} style={{ ['--i' as string]: i }}>{word}</span>
        ))}
      </div>
      <b>{name}</b>
    </article>
  );
}
