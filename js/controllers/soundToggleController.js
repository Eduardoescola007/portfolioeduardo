/**
 * Botão para ligar/desligar os efeitos sonoros.
 */
export class SoundToggleController {
  constructor(button, sound) {
    this.button = button;
    this.sound = sound;
  }

  init() {
    this._render();
    this.button.addEventListener('click', () => {
      this.sound.setMuted(!this.sound.muted);
      this._render();
    });
  }

  _render() {
    const muted = this.sound.muted;
    this.button.textContent = muted ? '🔇 MUDO' : '🔊 SOM';
    this.button.setAttribute('aria-pressed', String(muted));
  }
}