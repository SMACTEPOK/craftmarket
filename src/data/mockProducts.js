/**
 * Мок-дані каталогу товарів для лабораторної роботи 3.
 * Використовуються до підключення реального API в ЛР 5.
 *
 * Зображення згенеровано як SVG data-URL, щоб не залежати від
 * зовнішніх файлів — це дозволяє демонструвати каталог одразу
 * після клонування репозиторію.
 */

function makeProductArt(letter, bg, fg) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">' +
      '<rect width="600" height="450" fill="' + bg + '"/>' +
      '<rect x="40" y="40" width="520" height="370" fill="none" stroke="' + fg + '" stroke-width="10"/>' +
      '<circle cx="300" cy="200" r="100" fill="none" stroke="' + fg + '" stroke-width="18"/>' +
      '<line x1="40" y1="370" x2="560" y2="370" stroke="' + fg + '" stroke-width="10"/>' +
      '<text x="300" y="335" font-family="Arial Black, sans-serif" font-size="180" font-weight="900" fill="' + fg + '" text-anchor="middle">' + letter + '</text>' +
    '</svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

export const mockProducts = [
  {
    id: 1,
    name: 'Гончарна ваза «Лаванда»',
    price: 450,
    image: makeProductArt('В', '#ff4d00', '#111111'),
    category: 'Кераміка',
    inStock: true,
    isHandmade: true,
  },
  {
    id: 2,
    name: 'В’язаний плед «Осінь»',
    price: 1200,
    image: makeProductArt('П', '#ffe600', '#111111'),
    category: 'Текстиль',
    inStock: true,
    isHandmade: true,
  },
  {
    id: 3,
    name: 'Дерев’яна шкатулка',
    price: 680,
    image: makeProductArt('Ш', '#00e5ff', '#111111'),
    category: 'Дерево',
    inStock: false,
    isHandmade: true,
  },
  {
    id: 4,
    name: 'Керамічна тарілка з розписом',
    price: 320,
    image: makeProductArt('Т', '#ff00a8', '#111111'),
    category: 'Кераміка',
    inStock: true,
    isHandmade: true,
  },
  {
    id: 5,
    name: 'Свічка соєва «Лаванда і м’ята»',
    price: 180,
    image: makeProductArt('С', '#d6ff00', '#111111'),
    category: 'Свічки',
    inStock: true,
    isHandmade: false,
  },
];