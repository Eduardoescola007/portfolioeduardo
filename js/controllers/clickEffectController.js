// js/controllers/clickEffectController.js

/**
 * Controller de explosão de pixels no clique.
 * Usa delegação de eventos: um único listener no document,
 * então funciona também para botões criados depois (cards da API).
 */
export class ClickEffectController {
    constructor(selector = '.btn-pixel, .card-link, button') {
      this.selector = selector;
  
      document.addEventListener('click', (e) => {
        if (e.target.closest(this.selector)) this._burst(e);
      });
    }
  
    _burst(event) {
      let x = event.clientX;
      let y = event.clientY;
  
      // Ativação por teclado (Enter) vem com coordenadas 0,0:
      // nesse caso, usa o centro do botão
      if (event.detail === 0) {
        const r = event.target.closest(this.selector).getBoundingClientRect();
        x = r.left + r.width / 2;
        y = r.top + r.height / 2;
      }
  
      const colors = [
        '#e84838', // vermelho pokébola
        '#f8d038', // amarelo pikachu
        '#78c850', // verde grama
        '#3878d8', // azul pokémon
        '#f8f0d0'  // creme
      ];
  
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('span');
        particle.className = 'pixel-particle';
  
        particle.style.left = `${x}px`;
        particle.style.top  = `${y}px`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
  
        const angle    = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50;
  
        particle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
  
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 650);
      }
    }
  }