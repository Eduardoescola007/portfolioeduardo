/**
 * Modelo que representa um repositório do GitHub.
 * Encapsula dados brutos da API em uma estrutura previsível.
 */
export class Repository {
    static ICONS = {
      JavaScript: '🟨',
      TypeScript: '🔷',
      HTML:       '🟧',
      CSS:        '🟦',
      Python:     '🐍',
      Java:       '☕',
      DEFAULT:    '📁'
    };
  
    constructor(data) {
      this.id          = data.id;
      this.name        = data.name;
      this.description = data.description ||
        'Repositório público de estudos e prática em desenvolvimento.';
      this.language    = data.language || 'Outro';
      this.url         = data.html_url;
      this.stars       = data.stargazers_count ?? 0;
      this.updatedAt   = data.updated_at;
    }
  
    /** Ícone correspondente à linguagem principal */
    get icon() {
      return Repository.ICONS[this.language] || Repository.ICONS.DEFAULT;
    }
  }