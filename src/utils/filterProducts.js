/**
 * Утилітні функції для фільтрації каталогу товарів.
 *
 * Модуль спроєктовано як стабільний інтерфейс (stable interface):
 * сигнатури публічних функцій не залежать від внутрішньої реалізації
 * каталогу, не звертаються до DOM, не тримають стану й не кидають
 * винятків на типових вхідних даних. Це дозволяє повторно
 * використовувати модуль у власному хуку `useCart` у лабораторній
 * роботі 7 — там та сама функція фільтруватиме товари в кошику.
 *
 * Принципи, яких дотримано:
 *   • чистота — жодних side-effect'ів, результат залежить лише від аргументів;
 *   • незмінність — вхідний масив не мутується;
 *   • стійкість до некоректних входів — null, undefined та не-масиви
 *     не призводять до помилки, а повертають безпечний результат;
 *   • мінімальні алокації — порожній запит повертає той самий масив.
 *
 * @module utils/filterProducts
 */

/**
 * Нормалізує пошуковий запит: обрізає пробіли по краях і приводить
 * до нижнього регістру.
 *
 * Виділена в окрему функцію, щоб її можна було перевикористати
 * при підсвічуванні збігів, серіалізації стану пошуку в URL чи
 * передачі запиту на сервер у наступних лабораторних.
 *
 * @param {string} query — сирий рядок із поля вводу
 * @returns {string} нормалізований запит (можливо, порожній)
 *
 * @example
 * normalizeQuery('  Керам  '); // 'керам'
 * @example
 * normalizeQuery('');          // ''
 * @example
 * normalizeQuery(null);        // ''
 */
export function normalizeQuery(query) {
  return String(query ?? '').trim().toLowerCase();
}

/**
 * Фільтрує масив товарів за назвою.
 *
 * Повертає новий масив — вихідний не мутується (immutability), що
 * узгоджується з очікуваннями React щодо оновлення стану: React
 * порівнює посилання, і новий масив гарантовано спричинить
 * перерахунок похідних значень у компоненті.
 *
 * Порожній запит (або запит, що складається лише з пробілів)
 * повертає той самий масив без копіювання — це дозволяє уникнути
 * зайвого виділення пам'яті на найпоширенішому сценарії.
 *
 * @param {ReadonlyArray<{ name: string }>} products — вхідний масив товарів
 * @param {string} query — сирий пошуковий запит
 * @returns {Array<{ name: string }>} відфільтрований масив
 *
 * @example <caption>Частковий збіг у нижньому регістрі</caption>
 * const products = [
 *   { id: 1, name: 'Гончарна ваза «Лаванда»' },
 *   { id: 2, name: 'Керамічна тарілка' },
 * ];
 *
 * filterProducts(products, 'лаван');
 * // → [{ id: 1, name: 'Гончарна ваза «Лаванда»' }]
 *
 * @example <caption>Регістр не має значення</caption>
 * filterProducts(products, 'КЕРАМ');
 * // → [{ id: 2, name: 'Керамічна тарілка' }]
 *
 * @example <caption>Порожній запит — повертає все</caption>
 * filterProducts(products, '');
 * // → products (той самий масив)
 *
 * @example <caption>Запит без збігів — порожній масив</caption>
 * filterProducts(products, 'ровер');
 * // → []
 *
 * @example <caption>Некоректні входи не кидають помилок</caption>
 * filterProducts(null, 'лаван');       // → []
 * filterProducts(undefined, '');       // → []
 * filterProducts('not-an-array', 'a'); // → []
 *
 * @example <caption>Товар без назви не ламає фільтр</caption>
 * filterProducts([{ id: 1 }, { id: 2, name: 'Ваза' }], 'ваза');
 * // → [{ id: 2, name: 'Ваза' }]
 */
export function filterProducts(products, query) {
  if (!Array.isArray(products)) {
    return [];
  }

  const normalized = normalizeQuery(query);
  if (!normalized) {
    return products;
  }

  return products.filter((product) => {
    const name = String(product?.name ?? '').toLowerCase();
    return name.includes(normalized);
  });
}