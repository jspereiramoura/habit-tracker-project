const DAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado"
];

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Augosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

export default function parseDate(date: Date) {
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return {
    day,
    dayOfWeek: DAYS[dayOfWeek],
    month: MONTHS[month],
    year,
    toString: () => `${day} de ${MONTHS[month]} de ${year}`
  };
}
