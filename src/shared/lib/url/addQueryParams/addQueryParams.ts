/**
 * Функция для парсинга query params в строку
 * @param params - query параметры
 * @returns строку с query параметрами
 */
export function getQueryParams(params: Partial<Record<string, string>>) {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([name, value]) => {
    if (value) {
      searchParams.set(name, value);
    } else {
      // пустая строка / undefined — убираем ключ из URL (иначе остаётся старое значение)
      searchParams.delete(name);
    }
  });

  return `?${searchParams.toString()}`;
}
/**
 * Функция добавления параметров строки запроса в URL
 * @param params - query параметры
 */
export function addQueryParams(params: Partial<Record<string, string>>) {
  window.history.pushState(null, "", getQueryParams(params));
}
