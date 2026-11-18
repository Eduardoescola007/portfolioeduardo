/**
 * Em QUALQUER clique da página:
 *  - explosão de pixels coloridos
 *  - purpurina de "shiny encontrado"
 *  - som de Pokémon selvagem (exceto nas Pokébolas, que têm som próprio)
 */
export class ClickEffectController {
  constructor(sound) {
    this.sound = sound;

    this.pixelColors = [
      '#e84838', // vermelho pokébola
      '#f8d038', // amarelo pikachu
      '#78c850', // verde grama
      '#3878d8', // azul pokémon
      '#f8f0d0'  // creme
    ];
    this.glitterColors = ['#ffffff', '#fff3a0', '#ffe45e', '#aef0ff', '#ffc2f0'];

    document.addEventListener('click', (e) => this._onClick(e));
  }

  _onClick(event) {
    const { x, y } = this._origin(event);

    this._pixelBurst(x, y);
    this._glitter(x, y);

    const onPokeball = event.target instanceof Element &&
                       event.target.closest('.pokeball');
    if (!onPokeball) this.sound.playWildEncounter();
  }

  /** Posição do clique; no teclado (Enter) usa o centro do elemento */
  _origin(event) {
    let x = event.clientX;
    let y = event.clientY;

    if (event.detail === 0 && event.target instanceof Element) {
      const r = event.target.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    return { x, y };
  }

  _pixelBurst(x, y) {
    const count = 24;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'pixel-particle';

      const size = 10 + Math.floor(Math.random() * 3) * 4; // 10, 14 ou 18px
      p.style.width  = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left   = `${x - size / 2}px`;
      p.style.top    = `${y - size / 2}px`;
      p.style.background =
        this.pixelColors[Math.floor(Math.random() * this.pixelColors.length)];

      const angle    = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const distance = 70 + Math.random() * 110;

      p.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
      p.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
  }

  _glitter(x, y) {
    // anel de brilho
    const ring = document.createElement('span');
    ring.className = 'shiny-ring';
    ring.style.left = `${x - 10}px`;
    ring.style.top  = `${y - 10}px`;
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 700);

    // estrelinhas
    const count = 28;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'glitter-star';

      const size = 6 * (1 + Math.floor(Math.random() * 3)); // 6, 12 ou 18px (alinhado ao grid)
      s.style.width  = `${size}px`;
      s.style.height = `${size}px`;
      s.style.left   = `${x - size / 2}px`;
      s.style.top    = `${y - size / 2}px`;
      s.style.background =
        this.glitterColors[Math.floor(Math.random() * this.glitterColors.length)];

      const angle    = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 130;

      s.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
      s.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
      s.style.animationDelay    = `${Math.random() * 0.15}s`;
      s.style.animationDuration = `${0.8 + Math.random() * 0.6}s`;

      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1700);
    }
  }
}