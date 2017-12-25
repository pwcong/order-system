'use strict';

const CODE = {
  // 一般http状态码
  STATUS_OK: 10000,
  // 特殊用途状态码
  TOKEN_NEEDED: 20001,
  TOKEN_EXPIRED: 20002,
  TOKEN_ERROR: 20003,
  USERTYPE_MISMATCH: 20101,
  // 一般错误状态码
  SERVICE_ERROR: 40000,
  // 服务器错误状态码
  SERVER_ERROR: 50000
};

module.exports = {
  get code() {
    return CODE;
  }
};
