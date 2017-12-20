'use strict';

const CODE = {
  STATUS_OK: 1000,
  TOKEN_NEEDED: 2001,
  TOKEN_EXPIRED: 2002,
  TOKEN_ERROR: 2003
};

module.exports = {
  get code() {
    return CODE;
  }
};
