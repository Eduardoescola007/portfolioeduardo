import { CONFIG } from '../config.js';

/**
 * Anima as seções ao entrarem na área visível.
 * Como quem rola agora é a tela da pokédex (#tela), ela é o "root".
 */
export class ScrollController {
  constructor(selector = 'section', rootSelector = '#tela') {
    this.elements = document.querySelectorAll(selector);
    this.root     = document.querySelector(rootSelector);
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { root: this.root, threshold: CONFIG.SCROLL_THRESHOLD }
    );

    this.elements.forEach(el => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
}