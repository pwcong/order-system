'use strict';

const CODE = {
  TOKEN_NEEDED: 1001,
  TOKEN_EXPIRED: 1002,
  TOKEN_ERROR: 1003
};

module.exports = {
  get code() {
    return CODE;
  }
};
