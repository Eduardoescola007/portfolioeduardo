/**
 * Alterna entre tema claro (Pokédex) e escuro (fantasma/roxo).
 * Guarda a escolha no localStorage.
 */
export class ThemeController {
  constructor(button) {
    this.button = button;
    this.key = 'pixel-theme';
  }

  init() {
    this._apply(document.documentElement.getAttribute('data-theme') || 'light');

    this.button.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      this._apply(current === 'dark' ? 'light' : 'dark');
    });
  }

  _apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(this.key, theme); } catch (e) {}

    const isDark = theme === 'dark';
    this.button.textContent = isDark ? '☀ CLARO' : '☾ ESCURO';
    this.button.setAttribute('aria-label',
      isDark ? 'Mudar para o tema claro' : 'Mudar para o tema escuro');
  }
}