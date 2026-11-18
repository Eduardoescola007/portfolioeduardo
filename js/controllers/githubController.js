import { CONFIG } from '../config.js';
import { GithubService } from '../services/githubService.js';

/**
 * Controller que renderiza os repositórios na página
 * e atualiza as estatísticas do "Sobre".
 */
export class GithubController {
  /**
   * @param {HTMLElement} containerEl - Onde os cards são inseridos
   * @param {{ repos: HTMLElement, langs: HTMLElement }} statsEls
   */
  constructor(containerEl, statsEls) {
    this.container = containerEl;
    this.statsEls  = statsEls;
    this.service   = new GithubService();
  }

  /** Inicializa: busca dados, renderiza cards e estatísticas */
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

  // ---------- RENDERIZAÇÃO ----------

  _render(repos) {
    if (!repos.length) {
      this.container.innerHTML =
        '<div class="msg">Nenhum repositório público encontrado.</div>';
      return;
    }
    this.container.innerHTML = repos.map(r => this._buildCard(r)).join('');
  }

  _buildCard(repo) {
    return `
      <article class="card">
        <div class="card-icon">${repo.icon}</div>
        <h3>${this._escape(repo.name)}</h3>
        <p>${this._escape(repo.description)}</p>
        <div class="card-meta">
          <span class="lang-badge">${this._escape(repo.language)}</span>
          <a href="${this._escape(repo.url)}"
             target="_blank" rel="noopener"
             class="card-link">ABRIR ↗</a>
        </div>
      </article>
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

  // ---------- ESTATÍSTICAS ----------

  _updateStats(repos) {
    const langs = [
      ...new Set(
        repos.map(r => r.language).filter(l => l && l !== 'Outro')
      )
    ];
    this.statsEls.repos.textContent = repos.length;
    this.statsEls.langs.textContent = langs.length;
  }

  // ---------- UTILITÁRIOS ----------

  /** Escapa HTML para evitar injeção nos textos vindos da API */
  _escape(str) {
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  }
}