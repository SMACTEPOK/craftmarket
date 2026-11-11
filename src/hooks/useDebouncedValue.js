import { useEffect, useState } from 'react';

/**
 * Повертає «відкладене» значення, яке оновлюється лише після того,
 * як `value` не змінювалося протягом `delay` мілісекунд.
 *
 * Ідея: сама змінна стану (наприклад, текст у полі вводу) оновлюється
 * на кожне натискання клавіші — миттєво, без затримок. Але важка
 * операція (фільтрація масиву товарів) запускається лише тоді, коли
 * користувач припинив друкувати. Це зменшує кількість перерахунків
 * для довгих запитів і робить інтерфейс плавнішим.
 *
 * Механізм: кожен виклик з ефекту ставить новий `setTimeout`, а
 * функція очищення скасовує попередній таймер. Отже, якщо значення
 * змінюється швидше, ніж за `delay` мс, таймер щоразу перезапускається
 * і `setDebounced` викликається лише один раз — після останньої зміни.
 *
 * @template T
 * @param {T} value — значення, яке треба «пригальмувати»
 * @param {number} [delay=300] — затримка в мілісекундах
 * @returns {T} відкладене значення
 *
 * @example
 * const [query, setQuery] = useState('');
 * const debouncedQuery = useDebouncedValue(query, 300);
 * // query оновлюється на кожен символ — поле вводу показує актуальний текст
 * // debouncedQuery — лише через 300 мс після останнього натискання
 */
export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounced;
}