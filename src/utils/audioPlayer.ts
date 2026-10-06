/**
 * Traditional Malay Instrumental Audio Synthesizer & Player
 * Generates an ambient traditional Malay pentatonic melody (Gambus, Canang, Gong & Serunai resonance)
 * using Web Audio API so it works reliably in any browser sandbox without broken external links.
 */

class TraditionalMalayAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.65;
  private noteIndex: number = 0;
  private listeners: ((playing: boolean) => void)[] = [];

  // Pelog/Salendro-Malay scale frequencies (Hz): gambus / acoustic lute & chimes
  // D4, E4, F#4, A4, B4, D5, E5, F#5, A5
  private readonly scale = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99, 880.0];

  // Serene traditional Melayu motif melody pattern
  private readonly melodyPattern = [
    { note: 3, duration: 1.4, isPluck: true },   // A4
    { note: 4, duration: 0.9, isPluck: true },   // B4
    { note: 5, duration: 1.8, isPluck: true },   // D5
    { note: 4, duration: 0.8, isPluck: true },   // B4
    { note: 3, duration: 1.2, isPluck: true },   // A4
    { note: 2, duration: 1.5, isPluck: true },   // F#4
    { note: 1, duration: 1.1, isPluck: true },   // E4
    { note: 0, duration: 2.2, isPluck: true },   // D4 (drone anchor)
    { note: 2, duration: 1.2, isPluck: true },   // F#4
    { note: 3, duration: 1.4, isPluck: true },   // A4
    { note: 5, duration: 1.5, isPluck: true },   // D5
    { note: 6, duration: 1.2, isPluck: true },   // E5
    { note: 5, duration: 1.0, isPluck: true },   // D5
    { note: 4, duration: 1.4, isPluck: true },   // B4
    { note: 3, duration: 2.6, isPluck: true },   // A4 gong cadence
  ];

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isPlaying));
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plucks a traditional gambus / lute string note with warm organic harmonics
  private playPluckedString(freq: number, duration: number, isAccent: boolean = false) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Fundamental oscillator (triangle wave gives gentle wood body)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic overtone (sine wave for resonance)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Gambus warmth resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + duration);

    // Amplitude Envelope (quick pluck attack, natural wood decay)
    const noteGain = this.ctx.createGain();
    const peakGain = isAccent ? 0.32 : 0.22;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(peakGain, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  // Soft traditional gong / canang resonance at cadences
  private playGongChime(freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 3.3);
  }

  private stepMelody = () => {
    if (!this.isPlaying || !this.ctx) return;

    const currentStep = this.melodyPattern[this.noteIndex % this.melodyPattern.length];
    const freq = this.scale[currentStep.note];

    // Every 5th note play a gentle gong resonance anchor
    if (this.noteIndex % 7 === 0) {
      this.playGongChime(146.83); // Low D3 gong
    }

    this.playPluckedString(freq, currentStep.duration, this.noteIndex % 3 === 0);

    this.noteIndex++;
    const nextDelay = currentStep.duration * 750 + Math.random() * 120;
    this.intervalId = window.setTimeout(this.stepMelody, nextDelay);
  };

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();
    this.stepMelody();
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolumeLevel(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolumeLevel(): number {
    return this.volume;
  }
}

export const malayAudioEngine = new TraditionalMalayAudioEngine();
