import { TypingController }      from './controllers/typingController.js';
import { GithubController }      from './controllers/githubController.js';
import { ScrollController }      from './controllers/scrollController.js';
import { ClickEffectController } from './controllers/clickEffectController.js';

class PortfolioApp {
  constructor() {
    this.typing = new TypingController(
      document.getElementById('titulo')
    );

    this.github = new GithubController(
      document.getElementById('projetos-container'),
      {
        repos: document.getElementById('stat-repos'),
        langs: document.getElementById('stat-langs')
      }
    );

    this.scroll = new ScrollController('section');

    // Sem argumento → usa o seletor padrão do controller
    // (inclui .btn-pixel, .card-link e button)
    this.clickEffect = new ClickEffectController();
  }

  start() {
    this.typing.start();
    this.github.init();
    this.scroll.init();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp().start();
});