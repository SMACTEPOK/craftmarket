import PropTypes from 'prop-types';
import './product-card.css';

/**
 * Картка товару. Презентаційний компонент без внутрішнього стану.
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {number} props.price
 * @param {string} [props.image]
 * @param {string} props.category
 * @param {boolean} [props.inStock=true]
 * @param {boolean} [props.isHandmade=false]
 */
function ProductCard({
  name,
  price,
  image,
  category,
  inStock = true,
  isHandmade = false,
}) {
  return (
    <article className={'product-card' + (inStock ? '' : ' product-card--out')}>
      <div className="product-card__media">
        {image ? (
          <img className="product-card__image" src={image} alt={name} />
        ) : (
          <div className="product-card__image product-card__image--empty">
            БЕЗ ЗОБРАЖЕННЯ
          </div>
        )}
        <span className="product-card__category">{category}</span>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">{price} грн</p>

        <div className="product-card__badges">
          {!inStock && (
            <span className="product-card__badge product-card__badge--out">
              Немає в наявності
            </span>
          )}
          {isHandmade && (
            <span className="product-card__badge product-card__badge--handmade">
              Хендмейд
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  category: PropTypes.string.isRequired,
  inStock: PropTypes.bool,
  isHandmade: PropTypes.bool,
};

export default ProductCard;