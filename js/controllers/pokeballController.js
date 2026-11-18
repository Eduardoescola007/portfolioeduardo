import { CONFIG } from '../config.js';

/**
 * Ao clicar numa Pokébola: toca o som, anima a abertura
 * e só então abre o repositório em outra aba.
 */
export class PokeballController {
  constructor(containerEl, sound) {
    this.container = containerEl;
    this.sound = sound;
  }

  init() {
    // Delegação: funciona para as bolas criadas depois da API responder
    this.container.addEventListener('click', (e) => {
      const ball = e.target.closest('.pokeball');
      if (!ball) return;

      // Ctrl/Cmd/Shift/Alt + clique: deixa o navegador agir normalmente
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      this._open(ball);
    });
  }

  _open(ball) {
    if (ball.classList.contains('opening')) return;

    ball.classList.add('opening');
    this.sound.playPokeballOpen();

    setTimeout(() => {
      window.open(ball.href, '_blank', 'noopener');
      ball.classList.remove('opening');
    }, CONFIG.POKEBALL_OPEN_DELAY);
  }
}