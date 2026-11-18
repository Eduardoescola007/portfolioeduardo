import { CONFIG } from '../config.js';

/**
 * Controller que aplica animação de "surge" nas seções ao entrar na viewport.
 */
export class ScrollController {
  /**
   * @param {string} selector - Seletor dos elementos a animar
   */
  constructor(selector = 'section') {
    this.elements = document.querySelectorAll(selector);
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: CONFIG.SCROLL_THRESHOLD }
    );

    this.elements.forEach(el => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
}