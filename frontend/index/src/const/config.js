const URL_INDEX_USER = process.env.NODE_ENV === 'production' ? 'http://' : 'http://127.0.0.1:6001';
const URL_INDEX_ADMIN = process.env.NODE_ENV === 'production' ? 'http://' : 'http://127.0.0.1:6002';

export default {
  URL_INDEX_ADMIN,
  URL_INDEX_USER
};
