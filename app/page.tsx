"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

// Personalize these values when you have her details and photos ready.
const sisterName = "DIDIIIII";
const photos = [
  { src: "/images/didi-01.jpeg", alt: "DIDIIIII smiling in a burgundy hoodie", caption: "That smile I love", className: "photo-rose" },
  { src: "/images/didi-02.jpeg", alt: "DIDIIIII posing in a black outfit", caption: "Main character energy", className: "photo-lilac" },
  { src: "/images/didi-03.jpeg", alt: "A childhood family photo together", caption: "A little family throwback", className: "photo-peach" },
  { src: "/images/didi-04.jpeg", alt: "DIDIIIII having fun in a cozy outfit", caption: "Cozy-day queen", className: "photo-blue" },
];
const birthdayMelody: Array<[number | null, number]> = [
  [392, .34], [392, .17], [440, .51], [392, .51], [523.25, .51], [493.88, .9], [null, .15],
  [392, .34], [392, .17], [440, .51], [392, .51], [587.33, .51], [523.25, .9], [null, .15],
  [392, .34], [392, .17], [783.99, .51], [659.25, .51], [523.25, .51], [493.88, .51], [440, .9], [null, .15],
  [698.46, .34], [698.46, .17], [659.25, .51], [523.25, .51], [587.33, .51], [523.25, 1.1],
];
const birthdayLoopSeconds = birthdayMelody.reduce((total, [, duration]) => total + duration, 0);

function playBirthdayMelody(context: AudioContext, master: GainNode) {
  let cursor = context.currentTime + .05;
  for (const [frequency, duration] of birthdayMelody) {
    if (frequency !== null) {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.value = frequency;
      envelope.gain.setValueAtTime(.0001, cursor);
      envelope.gain.exponentialRampToValueAtTime(.34, cursor + .035);
      envelope.gain.exponentialRampToValueAtTime(.0001, cursor + duration * .92);
      oscillator.connect(envelope);
      envelope.connect(master);
      oscillator.start(cursor);
      oscillator.stop(cursor + duration);
    }
    cursor += duration;
  }
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [hurdlesCleared, setHurdlesCleared] = useState(0);
  const [dragonJumping, setDragonJumping] = useState(false);
  const audioRef = useRef<{ context: AudioContext; gain: GainNode; timer: number | null } | null>(null);

  useEffect(() => () => {
    const player = audioRef.current;
    if (player?.timer !== null && player?.timer !== undefined) window.clearInterval(player.timer);
    void player?.context.close();
  }, []);

  function startMusic() {
    if (audioRef.current) { setMusicOn(true); return; }
    try {
      const context = new AudioContext();
      const master = context.createGain();
      master.gain.value = 0.27;
      master.connect(context.destination);
      playBirthdayMelody(context, master);
      const timer = window.setInterval(() => playBirthdayMelody(context, master), birthdayLoopSeconds * 1000);
      audioRef.current = { context, gain: master, timer };
      setMusicOn(true);
    } catch { /* Audio may be unavailable in some browsers. */ }
  }

  function toggleMusic() {
    const player = audioRef.current;
    if (!player) { startMusic(); return; }
    const next = !musicOn;
    player.gain.gain.setTargetAtTime(next ? 0.27 : 0, player.context.currentTime, 0.2);
    setMusicOn(next);
  }

  function enterSurprise() {
    startMusic(); setEntered(true);
    void confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 }, colors: ["#ef7589", "#f8c76b", "#f4b2c4", "#ffffff"] });
  }

  function makeWish() {
    setWishMade(true);
    void confetti({ particleCount: 180, spread: 100, startVelocity: 35, origin: { y: 0.58 }, colors: ["#ef7589", "#f8c76b", "#f4b2c4", "#ffffff"] });
  }

  function jumpDragon() {
    if (dragonJumping || hurdlesCleared >= 8) return;
    setDragonJumping(true);
    setHurdlesCleared(count => count + 1);
    window.setTimeout(() => setDragonJumping(false), 620);
  }

  if (!entered) return <main className="birthday-cover">
    <div className="starfield" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <span key={i} style={{ left: `${(i * 37 + 9) % 100}%`, top: `${(i * 53 + 4) % 100}%`, animationDelay: `${(i % 7) * -0.47}s` }}>✦</span>)}</div>
    <div className="cover-copy"><p className="cover-kicker">A BIRTHDAY SURPRISE FOR</p><h1>Someone very special<br/>was born on this day <span>♥</span></h1><p className="typing-name">{sisterName}<i/></p><button className="cover-button" onClick={enterSurprise}>Open Your Surprise <span>🎁</span></button><span className="cover-hint">A little something, made just for you</span></div>
    <span className="cover-orbit orbit-a"/><span className="cover-orbit orbit-b"/>
  </main>;

  return <main className="birthday-site">
    <header className="site-nav"><a href="#top" className="site-logo"><span>✦</span> A BIRTHDAY SURPRISE</a><nav><a href="#photos">Photos</a><a href="#game">Game</a><a href="#letter">A letter</a></nav><button className="music-toggle" onClick={toggleMusic} aria-label={musicOn ? "Turn music off" : "Turn music on"}>{musicOn ? "♫ Music on" : "♫ Music off"}</button></header>
    <section className="story-hero" id="top"><div className="story-stars" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span></div><p className="story-kicker">TODAY IS ALL ABOUT YOU</p><h1>Happy birthday,<br/><em>{sisterName}.</em></h1><p className="story-intro">A little collection of someone who means so much to me.</p><a className="scroll-cue" href="#photos">LET’S CELEBRATE <span>↓</span></a><div className="hero-orb"><span>✧</span></div></section>
    <section className="photo-section" id="photos"><div className="section-title"><p className="section-kicker">SLIDE 02 · LITTLE MOMENTS</p><h2>My favourite photos <em>of you.</em></h2><p>A little collection of someone who means so much to me.</p></div><div className="polaroid-grid">{photos.map((photo, i) => <figure className={`polaroid ${photo.className}`} key={photo.caption}><div className="photo-frame"><img src={photo.src} alt={photo.alt} /></div><figcaption>{photo.caption}</figcaption><span className="photo-index">0{i + 1}</span></figure>)}</div><p className="photo-help">A few favourite memories with you ♡</p></section>
    <section className="timeline-section" id="memories"><div className="section-title"><p className="section-kicker">SLIDE 03 · THE GOOD OLD DAYS</p><h2>Our memories, <em>our little world.</em></h2><p>Every memory with you is a little piece of happiness.</p></div><div className="timeline"><article><span className="timeline-dot">✿</span><span className="timeline-year">BACK THEN</span><h3>Little kid adventures</h3><p>From making up games to getting into a little bit of mischief, you made growing up so much fun.</p></article><article><span className="timeline-dot">♡</span><span className="timeline-year">THE IN-BETWEEN</span><h3>Our favourite inside jokes</h3><p>Some stories still make us laugh every single time. I wouldn’t trade those moments for anything.</p></article><article><span className="timeline-dot">✦</span><span className="timeline-year">RIGHT NOW</span><h3>Still my favourite person</h3><p>Life keeps changing, but I’ll always be grateful that I get to do it with you as my sister.</p></article></div></section>
    <section className="heart-section"><div className="heart-card"><p className="section-kicker">SLIDE 04 · THINGS I DON’T SAY ENOUGH</p><h2>You’ll always be more than<br/>just my <em>elder sister.</em></h2><div className={`reveal-lines ${revealed ? "notes-revealed" : ""}`}><div className="reveal-row"><p>Thank you for always being there for me.</p><span className="message-cloud" aria-hidden="true">☁️</span></div><div className="reveal-row"><p>Thank you for all the little things you do.</p><span className="message-cloud" aria-hidden="true">☁️</span></div><div className="reveal-row"><p>No matter how much we grow up, you’ll always have a special place in my heart.</p><span className="message-cloud" aria-hidden="true">☁️</span></div></div><button className="soft-button" onClick={() => setRevealed(!revealed)}>{revealed ? "Read that again ♡" : "Read my little note ✨"}</button></div></section>
    <section className="awards-section"><div className="section-title"><p className="section-kicker">SLIDE 05 · THE VERY OFFICIAL AWARDS</p><h2>Sister appreciation <em>awards.</em></h2><p>For the world’s most iconic sister 🏆</p></div><div className="awards-grid"><article><span>👑</span><p>Best Drama Queen</p></article><article><span>😂</span><p>Professional Advice Giver</p></article><article><span>❤️</span><p>World’s Best Elder Sister</p></article><article><span>🫶</span><p>Most Likely to Scold Me and Then Help Me</p></article></div></section>
    <section className="dragon-game-section" id="game"><div className="section-title"><p className="section-kicker">SLIDE 06 · A VERY IMPORTANT DRAGON QUEST</p><h2>Help the dragon <em>clear 8 hurdles.</em></h2><p>Tap the dragon once for every hurdle. Eight jumps. You’ve got this! 🐉</p></div><div className="dragon-game-card"><div className="game-score"><span>HURDLES CLEARED</span><strong>{hurdlesCleared}<i>/8</i></strong></div><div className="game-track"><button className={`dragon-button ${dragonJumping ? "dragon-jumping" : ""}`} onClick={jumpDragon} disabled={dragonJumping || hurdlesCleared === 8} aria-label={hurdlesCleared === 8 ? "Dragon finished all eight jumps" : "Click the dragon to jump the next hurdle"}>🐉</button><div className="hurdle-row">{Array.from({ length: 8 }, (_, i) => <span className={`hurdle ${i < hurdlesCleared ? "hurdle-cleared" : ""}`} key={i} aria-label={`Hurdle ${i + 1}${i < hurdlesCleared ? " cleared" : ""}`}><i/><small>0{i + 1}</small></span>)}</div></div><p className="game-instruction">{hurdlesCleared < 8 ? "CLICK THE DRAGON TO JUMP OVER THE NEXT HURDLE TO GET A BEAUTIFUL MESSAGE" : "ALL 8 HURDLES CLEARED!"}</p>{hurdlesCleared === 8 && <div className="game-congrats" aria-live="polite"><div className="game-confetti">🎉　✨　🐉　✨　🎉</div><h3>😂 CONGRATULATIONS, OLD LADY! 🎉🐉</h3><p>You just made a dragon jump 8 times… which is exactly how many years you were busy being old before I arrived to make your life more irritating. 🤡💀 Imagine being 8 years older than someone and STILL having to deal with their nonsense every single day. 👵🏻❤️ You were enjoying life without me for 8 whole years, and then BOOM 💥, your biggest headache was born. You&apos;re basically my sister, part-time bodyguard, full-time drama queen, and unpaid babysitter. 😂 Anyway, happy birthday, fossil! 🦴🎂 Don&apos;t worry, you&apos;re not getting older… you&apos;re just becoming a limited-edition antique. LOVE YOU, GRANDMAAA! 😭❤️🎀</p></div>}</div></section>
    <section className="wish-section"><div className={`wish-card ${wishMade ? "wish-made" : ""}`}><p className="section-kicker">SLIDE 07 · MAKE A WISH</p><h2>{wishMade ? "Your wish is on its way." : "Close your eyes, make a wish."}</h2><p>{wishMade ? "May this next chapter be every bit as beautiful as you are." : "Let this new chapter be beautiful. Then tap to blow out the candles!"}</p><div className="wish-cake" aria-label="Birthday cake with five candles">{[0,1,2,3,4].map(i => <button key={i} className={`wish-candle ${wishMade ? "candle-out" : ""}`} onClick={() => setWishMade(true)} aria-label={`Blow out candle ${i + 1}`}><i/></button>)}<div className="wish-frosting">✿　♡　✿</div><div className="wish-cake-body"/><div className="wish-plate"/></div><button className="soft-button" onClick={makeWish}>{wishMade ? "Make another wish ✨" : "Blow out the candles ✨"}</button></div></section>
    <section className="letter-section" id="letter"><div className="letter-paper"><span className="letter-stamp">♡</span><p className="section-kicker">SLIDE 08 · OPEN WHEN YOU NEED A REMINDER</p><h2>To my forever<br/><em>favourite sister,</em></h2><p>Happy birthday! I hope you know how much I look up to you and how thankful I am to have you in my life. Thank you for being my big sister, my advice-giver, my partner in laughter, and one of my favourite people in the whole world.</p><p>I hope this year brings you every bit of happiness, love, and magic that you deserve. Keep being your brilliant, funny, wonderful self. No matter where life takes us, you’ll always have me.</p><p className="letter-signoff">Love you always,<br/><em>Your sibling</em> <span>♡</span></p></div><div className="finale">HAPPY BIRTHDAY, <span>{sisterName.toUpperCase()}</span> <b>✦ ♥ ✦</b></div></section>
    <footer className="site-footer">MADE WITH LOVE FOR MY FOREVER FAVOURITE SISTER</footer>
  </main>;
}
