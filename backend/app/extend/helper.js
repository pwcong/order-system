const crypto = require('crypto');
const moment = require('moment');

/**
 * 对字符串求 SHA256 Hash 值
 *
 * @param {string|string[]} params
 * @return {string}
 */
function sha256(params) {
  if (!params) return '';
  else if (typeof params === 'string') params = [params];

  const hasher = crypto.createHash('sha256');
  params.forEach(param => hasher.update(param));

  return hasher.digest('hex');
}

/**
 * 对字符串求 MD5 Hash 值
 *
 * @param {string|string[]} params
 * @return {string}
 */
function md5(params) {
  if (!params) return '';
  else if (typeof params === 'string') params = [params];

  const hasher = crypto.createHash('md5');
  params.forEach(param => hasher.update(param));

  return hasher.digest('hex');
}

/**
 * 检查是不是手机号码
 *
 * @param {string} phoneNumber
 * @return {Boolean}
 */
function isPhoneNumber(phoneNumber) {
  return /[0-9+]{1,}/.test(phoneNumber.toString().trim());
}

/**
 * 检查是不是电子邮箱地址
 *
 * @param {string} address
 * @return {Boolean}
 */
function isEmailAddress(address) {
  const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return reg.test(address.toString().trim());
}

/**
 * 将 Stream 读出来保存到 Buffer 中
 * @param {ReadStream} stream
 * @return {Promise}
 */
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const cache = [];
    stream.on('data', chunk => {
      cache.push(chunk);
    });
    stream.on('end', () => {
      resolve(Buffer.concat(cache));
    });
    stream.on('error', err => {
      reject(err);
    });
  });
}

/**
 * 检查一个数字是否为整数
 *
 * @param {number} n
 * @return {Boolean}
 */
function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

/**
 * 检查一个数字是否为小数
 *
 * @param {number} n
 * @return {Boolean}
 */
function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

/**
 * 格式化时间日期
 *
 * @param {date} dateObject 时间对象
 * @param {string} format
 * @return {string}
 */
function formatDateTime(dateObject, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dateObject).format(format);
}

/**
 * 格式化时间日期
 *
 * @param {date} dateObject 时间对象
 * @param {string} format
 * @return {string}
 */
function formatDate(dateObject, format = 'YYYY-MM-DD') {
  return moment(dateObject).format(format);
}

/**
 * 检查金额是否为整数
 *
 * @param {number} amount
 * @return {boolean}
 */
function checkMoneyAmount(amount) {
  return typeof amount === 'number' && !isFloat(amount);
}

/**
 * 解析时间日期字符串
 *
 * @param {string} text
 * @param {string|string[]} format
 */
function parseDateTime(text, format = ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD']) {
  return moment(text, format);
}

/**
 * 检测从前端传来的时间是否符合要求
 * 时间格式：2017-08-08 10:10:10
 *
 * @param {string} from 起始时间
 * @param {string} to 截止时间
 * @return {{from: Date, to: Date}}
 */
function checkTimeRange(from, to, required = true, fromFieldName = 'from_time', toFieldName = 'to_time') {
  const fromDate = parseDateTime(from);
  const toDate = parseDateTime(to);

  if (!fromDate.isValid() && required) {
    return this.ctx.badParameters({
      message: '起始时间无效',
      field: fromFieldName
    });
  }

  if (!toDate.isValid() && required) {
    return this.ctx.badParameters({
      message: '截止时间无效',
      field: toFieldName
    });
  }

  if (required && fromDate.isValid() && toDate.isValid() && fromDate.isAfter(toDate)) {
    return this.ctx.badParameters('起始时间应早于截止时间');
  }

  return this.ctx.success({
    from: fromDate.isValid() ? fromDate.toDate() : undefined,
    to: toDate.isValid() ? toDate.toDate() : undefined
  });
}

/**
 * 格式化金额显示
 *
 * @param {number} amount
 * @return {string}
 */
function formatAmount(amount) {
  return (amount / 100).toFixed(2);
}

module.exports = {
  checkMoneyAmount,
  checkTimeRange,
  formatAmount,
  formatDate,
  formatDateTime,
  isEmailAddress,
  isFloat,
  isInt,
  isPhoneNumber,
  md5,
  sha256,
  streamToBuffer
};
