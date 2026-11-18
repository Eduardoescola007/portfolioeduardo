import { CONFIG } from '../config.js';
import { Repository } from '../models/repository.js';

/**
 * Service responsável por toda comunicação com a API do GitHub.
 * Retorna sempre instâncias de Repository, nunca dados brutos.
 */
export class GithubService {
  /**
   * Busca os repositórios públicos do usuário configurado.
   * @returns {Promise<Repository[]>}
   */
  async fetchRepositories() {
    const url = new URL(
      `${CONFIG.API_BASE_URL}/users/${CONFIG.GITHUB_USERNAME}/repos`
    );
    url.searchParams.set('sort',     'updated');
    url.searchParams.set('per_page', CONFIG.PER_PAGE);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.map(item => new Repository(item));
  }
}