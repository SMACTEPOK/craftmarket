import PropTypes from 'prop-types';
import './SearchPanel.css';

/**
 * Панель пошуку каталогу. Контрольований компонент без власного
 * стану — значення й колбек зміни надходять через props.
 *
 * @param {Object} props
 * @param {string} props.value — поточний пошуковий запит
 * @param {(value: string) => void} props.onChange — виклик при зміні тексту
 * @param {string} [props.hintExample] — назва випадкового товару з каталогу,
 *   яка показується як приклад запиту й зникає після введення першого символу
 */
function SearchPanel({ value, onChange, hintExample = '' }) {
  const showExampleHint = value.trim().length === 0 && Boolean(hintExample);

  function handleInputChange(event) {
    onChange(event.target.value);
  }

  function handleClear() {
    onChange('');
  }

  function handleUseExample() {
    onChange(hintExample);
  }

  return (
    <div className="search-panel">
      <label htmlFor="catalog-search" className="search-panel__label">
        Пошук товару
      </label>

      <div className="search-panel__field">
        <input
          id="catalog-search"
          type="text"
          className="search-panel__input"
          placeholder="Введіть назву товару…"
          value={value}
          onChange={handleInputChange}
          aria-describedby={showExampleHint ? 'search-hint-example' : 'search-hint'}
        />
        {value && (
          <button
            type="button"
            className="search-panel__clear"
            onClick={handleClear}
            aria-label="Очистити пошук"
            title="Очистити"
          >
            ✕
          </button>
        )}
      </div>

      {showExampleHint ? (
        <p id="search-hint-example" className="search-panel__hint search-panel__hint--example">
          <span>Спробуйте:</span>
          <button
            type="button"
            className="search-panel__hint-btn"
            onClick={handleUseExample}
            title={`Підставити «${hintExample}» у поле пошуку`}
          >
            «{hintExample}»
          </button>
        </p>
      ) : (
        <p id="search-hint" className="search-panel__hint">
          Пошук виконується за назвою без урахування регістру
        </p>
      )}
    </div>
  );
}

SearchPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hintExample: PropTypes.string,
};

export default SearchPanel;