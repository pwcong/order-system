/**
 * 补齐位数
 * @param {Number} n 数值
 * @param {Number} l 位数
 */
export function formatNum(n, l = 2) {
  return (
    Array.from(new Array(l - ('' + n).length))
      .map(() => '0')
      .join('') + n
  );
}

/**
 * 格式化日期输出(YYYY-MM-DD)
 * @param {String} date
 */
export function formatDate(date) {
  const d = new Date();

  return `${d.getFullYear()}-${formatNum(d.getMonth() + 1)}-${formatNum(d.getDate())}`;
}

/**
 * 格式化日期输出(YYYY-MM-DD hh:mm:ss)
 * @param {String} datetime
 */
export function formatDateTime(datetime) {
  const d = new Date();

  const res = `${d.getFullYear()}-${formatNum(d.getMonth() + 1)}-${formatNum(d.getDate())} ${formatNum(
    d.getHours()
  )}:${formatNum(d.getMinutes())}:${formatNum(d.getSeconds())}`;

  return res;
}
