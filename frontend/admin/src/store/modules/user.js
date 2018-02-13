import { login, logout, getInfo, check } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';

import io from 'socket.io-client';
import handler from '@/io/handler';

const user = {
  state: {
    checked: false,
    token: getToken(),
    id: 0,
    type: 0,
    nickname: '',
    avatar: '',
    socket: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ID: (state, id) => {
      state.id = id;
    },
    SET_TYPE: (state, type) => {
      state.type = type;
    },
    SET_CHECKED: (state, flag) => {
      state.checked = flag;
    },
    SET_SOCKET: (state, socket) => {
      state.socket = socket;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username.trim(), userInfo.password)
          .then(response => {
            const { token, type, id } = response.payload;

            if ([2, 3, 999].indexOf(type) < 0) {
              reject({ message: '用户类型不匹配' });
              return;
            }

            setToken(token);

            commit('SET_TOKEN', token);
            commit('SET_TYPE', type);
            commit('SET_ID', id);

            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        getInfo(id || state.id)
          .then(response => {
            const data = response.payload;
            commit('SET_NICKNAME', data.nicknickname);
            commit('SET_AVATAR', data.avatar);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 检测登录状态，初始化socket连接
    Check({ commit, state }) {
      return new Promise((resolve, reject) => {
        check()
          .then(response => {
            const data = response.payload;

            commit('SET_TYPE', data.type);
            commit('SET_ID', data.id);
            commit('SET_CHECKED', true);

            const socket = io('http://127.0.0.1:7001/business', {
              query: {
                token: getToken()
              }
            });
            handler(socket);

            commit('SET_SOCKET', socket);

            resolve(data);
          })
          .catch(error => {
            commit('SET_TOKEN', '');
            commit('SET_TYPE', 0);
            commit('SET_ID', 0);
            commit('SET_CHECKED', false);

            removeToken();
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '');
            commit('SET_TYPE', 0);
            commit('SET_ID', 0);
            commit('SET_CHECKED', false);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_TYPE', 0);
        commit('SET_ID', 0);
        commit('SET_CHECKED', false);
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
