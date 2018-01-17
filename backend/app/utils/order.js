const moment = require('moment');
const chance = require('chance')();

exports.generateOrderId = () => {
  const now = moment();
  return `6600${now.format('YYYYMMDDhhmmssSSS')}${chance.zip()}`;
};
