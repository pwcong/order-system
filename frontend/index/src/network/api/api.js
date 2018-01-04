const API_BASE = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:7001/';

const api = {
  user: {
    login: {
      url: () => API_BASE + 'user/login',
      method: 'POST',
      data: (upe, password) => ({ upe, password })
    },
    register: {
      url: type => API_BASE + 'user/register',
      method: 'POST',
      data: (username, phone, password, type) => ({ username, phone, password, type })
    }
  }
};

export default api;
