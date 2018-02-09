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
  },
  filter(data, f) {
    try {
      const now = new Date();

      return data.filter((item, idx) => {
        if (!f) {
          return true;
        }

        const _d = new Date(f.replace(/\-/g, '/'));
        const d = new Date(item.created_at);

        switch (true) {
          case /^today$/.test(f):
            return (
              now.getFullYear() === d.getFullYear() &&
              now.getMonth() === d.getMonth() &&
              now.getDate() === d.getDate()
            );
          case /^\d{4}\-\d{2}\-\d{2}$/.test(f):
            return (
              _d.getFullYear() === d.getFullYear() &&
              _d.getMonth() === d.getMonth() &&
              _d.getDate() === d.getDate()
            );
          case /^\d{4}\-\d{2}$/.test(f):
            return _d.getFullYear() === d.getFullYear() && _d.getMonth() === d.getMonth();
          case /^\d{4}$/.test(f):
            return _d.getFullYear() === d.getFullYear();
          default:
            return false;
        }
      });
    } catch (err) {}

    return data;
  }
};
