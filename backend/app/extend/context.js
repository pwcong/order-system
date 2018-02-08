'use strict';

const lodash = require('lodash');

const CODE = {
  // 一般http状态码
  STATUS_OK: 20000,
  STATUS_ERROR: 40000,
  // 一般错误状态码
  TOKEN_NEEDED: 40001,
  TOKEN_EXPIRED: 40002,
  TOKEN_ERROR: 40003,
  USERTYPE_MISMATCH: 40101,
  // 服务器错误状态码
  SERVER_ERROR: 50000
};

const PAGESIZE = 50;

module.exports = {
  get code() {
    return CODE;
  },
  pager(data, pageSize, pageNo) {
    try {
      if (pageSize || pageNo) {
        pageSize = parseInt(pageSize) || PAGESIZE;
        pageNo = parseInt(pageNo) || 1;

        if (pageSize <= 0) {
          pageSize = PAGESIZE;
        }

        if (pageNo <= 0) {
          pageNo = 1;
        }

        const totalSize = data.length;
        const totalNo = parseInt(data.length / pageSize) + 1;

        const res = data.splice((pageNo - 1) * pageSize, pageSize);

        return {
          data: res,
          pageNo: pageNo,
          totalNo,
          pageSize: pageSize,
          totalSize
        };
      }
    } catch (err) {}

    return {
      data
    };
  }
};
