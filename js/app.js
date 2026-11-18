import { TypingController }       from './controllers/typingController.js';
import { GithubController }       from './controllers/githubController.js';
import { ScrollController }       from './controllers/scrollController.js';
import { ClickEffectController }  from './controllers/clickEffectController.js';
import { PokeballController }     from './controllers/pokeballController.js';
import { ThemeController }        from './controllers/themeController.js';
import { SoundToggleController }  from './controllers/soundToggleController.js';
import { SoundService }           from './services/soundService.js';

class PortfolioApp {
  constructor() {
    const projetos = document.getElementById('projetos-container');
    const sound    = new SoundService();

    this.typing = new TypingController(document.getElementById('titulo'));

    this.github = new GithubController(projetos, {
      repos: document.getElementById('stat-repos'),
      langs: document.getElementById('stat-langs')
    });

    this.pokeballs   = new PokeballController(projetos, sound);
    this.scroll      = new ScrollController('section', '#tela');
    this.clickEffect = new ClickEffectController(sound);
    this.theme       = new ThemeController(document.getElementById('theme-toggle'));
    this.soundToggle = new SoundToggleController(document.getElementById('sound-toggle'), sound);
  }

  start() {
    this.typing.start();
    this.github.init();
    this.pokeballs.init();
    this.scroll.init();
    this.theme.init();
    this.soundToggle.init();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp().start();
});