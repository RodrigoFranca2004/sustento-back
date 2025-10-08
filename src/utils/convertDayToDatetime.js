// Recebe a data no formato "DD/MM/AAAA" e retorna um objeto Date

export function convertDayToDatetime(dateStr) {

  const [day, month, year] = dateStr.split("/").map(Number);

  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
}