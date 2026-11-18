/**
 * Efeitos sonoros 8-bit gerados com Web Audio API (sem arquivos de áudio).
 */
export class SoundService {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    try { this.muted = localStorage.getItem('pixel-muted') === '1'; } catch (e) {}
  }

  setMuted(value) {
    this.muted = value;
    try { localStorage.setItem('pixel-muted', value ? '1' : '0'); } catch (e) {}
  }

  _ensureContext() {
    if (this.muted) return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;

    if (!this.ctx) {
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  /** Pokémon saindo da Pokébola */
  playPokeballOpen() {
    const ctx = this._ensureContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    this._tone(ctx, { type: 'square', freq: 220, endFreq: 440, start: t, duration: 0.08, volume: 0.25 });
    this._whoosh(ctx, t + 0.08);

    [988, 1319, 1568, 1976, 2637, 3136].forEach((freq, i) => {
      this._tone(ctx, {
        type: 'square', freq,
        start: t + 0.2 + i * 0.055,
        duration: 0.2, volume: 0.12
      });
    });
  }

  /** "Um Pokémon selvagem apareceu!" + brilho de shiny */
  playWildEncounter() {
    const ctx = this._ensureContext();
    if (!ctx) return;
    const t = ctx.currentTime;

    // alerta: notas rápidas alternadas
    [523, 392, 523, 392, 659, 784].forEach((freq, i) => {
      this._tone(ctx, {
        type: 'square', freq,
        start: t + i * 0.055,
        duration: 0.07, volume: 0.16
      });
    });

    // brilho shiny: sininhos agudos
    [1568, 2093, 2637, 3136, 4186].forEach((freq, i) => {
      this._tone(ctx, {
        type: 'triangle', freq,
        start: t + 0.3 + i * 0.05,
        duration: 0.18, volume: 0.1
      });
    });
  }

  _tone(ctx, { type, freq, endFreq, start, duration, volume }) {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, start + duration);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain).connect(this.master);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  }

  _whoosh(ctx, start) {
    const length = Math.floor(ctx.sampleRate * 0.4);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data   = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;

    const noise  = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 1.2;
    filter.frequency.setValueAtTime(300, start);
    filter.frequency.exponentialRampToValueAtTime(4000, start + 0.4);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.35, start + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.4);

    noise.connect(filter).connect(gain).connect(this.master);
    noise.start(start);
  }
}