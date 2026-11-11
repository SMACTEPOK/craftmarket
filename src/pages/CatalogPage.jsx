import { useState } from 'react';
import SearchPanel from '../components/SearchPanel/SearchPanel';
import ProductCard from '../components/ProductCard/ProductCard';
import { mockProducts } from '../data/mockProducts';
import { filterProducts } from '../utils/filterProducts';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import './CatalogPage.css';

/**
 * Сторінка каталогу з панеллю пошуку.
 *
 * Стан пошукового запиту піднято на рівень цієї сторінки (lifting state up),
 * щоб мати можливість фільтрувати масив товарів і передавати
 * відфільтрований результат у сітку карток.
 *
 * Поєднує три індивідуальні варіанти:
 *   • 4  — підказка-приклад під полем пошуку;
 *   • 9  — debounce фільтрації на 300 мс;
 *   • 14 — фільтрація винесена в утиліту `filterProducts`.
 */
function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Варіант 4: обираємо випадковий товар-приклад один раз при монтуванні.
  // lazy initializer useState гарантує, що Math.random() не викликається
  // на кожному рендері — приклад не «стрибає» між товарами.
  const [hintExample] = useState(() => {
    if (mockProducts.length === 0) return '';
    const idx = Math.floor(Math.random() * mockProducts.length);
    return mockProducts[idx].name;
  });

  // Варіант 9: сама `searchQuery` оновлюється миттєво (поле вводу показує
  // актуальний текст), але фільтр нижче використовує `debouncedQuery`,
  // який змінюється лише через 300 мс після останнього натискання.
  const debouncedQuery = useDebouncedValue(searchQuery, 300);

  // Варіант 14: уся логіка фільтрації — в чистій утиліті.
  // Жодного `useState` для похідного масиву й жодного `useEffect`.
  const filteredProducts = filterProducts(mockProducts, debouncedQuery);

  const isEmpty = filteredProducts.length === 0;
  const isPending = searchQuery !== debouncedQuery;

  function handleReset() {
    setSearchQuery('');
  }

  return (
    <div className="catalog-page">
      <header className="catalog-page__head">
        <h1 className="catalog-page__title">
          КАТАЛОГ
          <span className="catalog-page__title-mark">/CRAFTMARKET</span>
        </h1>
        <p className="catalog-page__subtitle">
          Знайдіть свій виріб серед унікальних речей ручної роботи
        </p>
      </header>

      <SearchPanel
        value={searchQuery}
        onChange={setSearchQuery}
        hintExample={hintExample}
      />

      <div className="catalog-page__meta" aria-live="polite">
        <span className="catalog-page__count">
          Знайдено товарів: <b>{filteredProducts.length}</b>
        </span>

        {debouncedQuery && (
          <span className="catalog-page__query">
            За запитом «{debouncedQuery}»
          </span>
        )}

        {isPending && (
          <span className="catalog-page__pending" aria-label="Виконується фільтрація">
            ● фільтрація…
          </span>
        )}
      </div>

      {isEmpty ? (
        <div className="catalog-page__empty" role="status">
          <p className="catalog-page__empty-title">Нічого не знайдено</p>
          <p className="catalog-page__empty-text">
            За запитом «<b>{debouncedQuery || '—'}</b>» не знайдено жодного товару.
            Спробуйте інше формулювання або скиньте пошук.
          </p>
          {debouncedQuery && (
            <button
              type="button"
              className="catalog-page__empty-btn"
              onClick={handleReset}
            >
              Скинути пошук
            </button>
          )}
        </div>
      ) : (
        <div className="catalog-page__grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CatalogPage;