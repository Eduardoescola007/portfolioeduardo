import { CONFIG } from '../config.js';

/**
 * Controller responsável pelo efeito de digitação no título.
 */
export class TypingController {
  /**
   * @param {HTMLElement} element - Elemento onde o texto será digitado
   */
  constructor(element) {
    this.el    = element;
    this.text  = CONFIG.TITLE_TEXT;
    this.index = 0;
  }

  /** Inicia a animação de digitação */
  start() {
    this._type();
  }

  _type() {
    if (this.index < this.text.length) {
      this.el.innerHTML =
        this.text.slice(0, this.index + 1) + '<span class="cursor"></span>';
      this.index++;
      setTimeout(() => this._type(), CONFIG.TYPING_SPEED);
    } else {
      this.el.innerHTML = this.text + '<span class="cursor"></span>';
    }
  }
}