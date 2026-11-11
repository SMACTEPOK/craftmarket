import CatalogPage from './pages/CatalogPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <span className="app__brand-mark">✱</span>
          CRAFTMARKET
          <span className="app__brand-tag">UA</span>
        </div>
        <nav className="app__nav" aria-label="Головна навігація">
          <a href="#catalog" className="app__nav-link app__nav-link--active">
            Каталог
          </a>
          <a href="#" className="app__nav-link">Про нас</a>
          <a href="#" className="app__nav-link">Кошик (0)</a>
        </nav>
      </header>

      <main className="app__main" id="catalog">
        <CatalogPage />
      </main>

      <footer className="app__footer">
        <p>© 2026 CRAFTMARKET · Лабораторна робота 3 </p>
      </footer>
    </div>
  );
}

export default App;