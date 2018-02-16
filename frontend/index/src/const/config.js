const URL_INDEX_APP = process.env.NODE_ENV === 'production' ? '/app' : 'http://127.0.0.1:6002';
const URL_INDEX_ADMIN = process.env.NODE_ENV === 'production' ? '/admin' : 'http://127.0.0.1:6003';

export default {
  URL_INDEX_ADMIN,
  URL_INDEX_APP
};
