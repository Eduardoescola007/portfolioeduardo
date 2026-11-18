import { CONFIG } from '../config.js';
import { GithubService } from '../services/githubService.js';

/**
 * Renderiza os repositórios como Pokébolas
 * e atualiza as estatísticas do "Sobre mim".
 */
export class GithubController {
  constructor(containerEl, statsEls) {
    this.container = containerEl;
    this.statsEls  = statsEls;
    this.service   = new GithubService();
  }

  async init() {
    try {
      const repos = await this.service.fetchRepositories();
      this._render(repos);
      this._updateStats(repos);
    } catch (error) {
      console.error('[GithubController]', error);
      this._renderError();
    }
  }

  _render(repos) {
    if (!repos.length) {
      this.container.innerHTML =
        '<div class="msg">Nenhum repositório público encontrado.</div>';
      return;
    }
    this.container.innerHTML = repos.map(r => this._buildCard(r)).join('');
  }

  _buildCard(repo) {
    const name = this._escape(repo.name);
    const lang = this._escape(repo.language);
    const url  = this._escape(repo.url);

    return `
      <div class="poke-slot">
        <a class="pokeball" href="${url}" target="_blank" rel="noopener"
           aria-label="Abrir projeto ${name}">
          <span class="pokeball-top"></span>
          <span class="pokeball-bottom"></span>
          <span class="pokeball-band"></span>
          <span class="pokeball-button">
            <span class="pokeball-icon">${repo.icon}</span>
          </span>
          <span class="pokeball-flash"></span>
          <span class="pokeball-tip" role="tooltip">${name}<small>${lang}</small></span>
        </a>
        <span class="poke-caption">${name}</span>
      </div>
    `;
  }

  _renderError() {
    this.container.innerHTML = `
      <div class="msg error">
        ⚠ Não foi possível carregar os repositórios.<br />
        Verifique sua conexão ou acesse diretamente o
        <a href="https://github.com/${CONFIG.GITHUB_USERNAME}"
           target="_blank" rel="noopener">GitHub</a>.
      </div>
    `;
  }

  _updateStats(repos) {
    const langs = [
      ...new Set(repos.map(r => r.language).filter(l => l && l !== 'Outro'))
    ];
    this.statsEls.repos.textContent = repos.length;
    this.statsEls.langs.textContent = langs.length;
  }

  /** Escapa HTML (inclusive aspas) para textos vindos da API */
  _escape(str) {
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
}