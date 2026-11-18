# Pixel Portfolio

Portfólio pessoal com tema pixel art consumindo a API pública do GitHub.

## Estrutura

- `index.html` → estrutura semântica, sem lógica
- `css/style.css` → todos os estilos, variáveis CSS e animações
- `js/config.js` → constantes globais
- `js/models/` → modelos de dados (classe `Repository`)
- `js/services/` → acesso a APIs externas (`GithubService`)
- `js/controllers/` → manipulação do DOM (typing, github, scroll)
- `js/app.js` → ponto de entrada (bootstrap)

## Como rodar

Por usar ES Modules (`type="module"`), o navegador bloqueia imports via `file://`.
Inicie um servidor local:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# Ou use a extensão "Live Server" no VS Code