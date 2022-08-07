const userDateFormat = 'DD MMMM YYYY';

export function lastMonthDate(date) {
  return moment(date, userDateFormat).subtract(1, 'month').format('YYYY-MM-') + moment().subtract(1, 'month').daysInMonth();
}

export function currentMonthDate(date) {
  return moment(date, userDateFormat).format('YYYY-MM-') + moment(new Date(date)).daysInMonth();
}
