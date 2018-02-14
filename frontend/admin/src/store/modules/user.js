import { login, logout, getInfo, check, modifyInfo } from '@/api/user';
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
    socket: null,
    userInfo: {}
  },

  mutations: {
    USER_SET_TOKEN: (state, token) => {
      state.token = token;
    },
    USER_SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname;
    },
    USER_SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    USER_SET_ID: (state, id) => {
      state.id = id;
    },
    USER_SET_TYPE: (state, type) => {
      state.type = type;
    },
    USER_SET_CHECKED: (state, flag) => {
      state.checked = flag;
    },
    USER_SET_SOCKET: (state, socket) => {
      state.socket = socket;
    },
    USER_SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username.trim(), userInfo.password)
          .then(response => {
            const { token, type, id, userInfo } = response.payload;

            if ([2, 3, 999].indexOf(type) < 0) {
              reject({ message: '用户类型不匹配' });
              return;
            }

            setToken(token);

            commit('USER_SET_TOKEN', token);
            commit('USER_SET_TYPE', type);
            commit('USER_SET_ID', id);

            commit('USER_SET_USERINFO', userInfo);

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
            commit('USER_SET_NICKNAME', data.nicknickname);
            commit('USER_SET_AVATAR', data.avatar);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    ModifyInfo({ commit, state }, userInfo) {
      return new Promise((resolve, reject) => {
        modifyInfo(userInfo || {})
          .then(response => {
            commit('USER_SET_USERINFO', response.payload);
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
            const { type, id, userInfo } = response.payload;

            commit('USER_SET_TYPE', type);
            commit('USER_SET_ID', id);
            commit('USER_SET_CHECKED', true);

            commit('USER_SET_USERINFO', userInfo);

            const socket = io('http://127.0.0.1:7001/business', {
              query: {
                token: getToken()
              }
            });
            handler(socket);

            commit('USER_SET_SOCKET', socket);

            resolve(response);
          })
          .catch(error => {
            commit('USER_SET_TOKEN', '');
            commit('USER_SET_TYPE', 0);
            commit('USER_SET_ID', 0);
            commit('USER_SET_CHECKED', false);

            removeToken();
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(response => {
            commit('USER_SET_TOKEN', '');
            commit('USER_SET_TYPE', 0);
            commit('USER_SET_ID', 0);
            commit('USER_SET_CHECKED', false);
            removeToken();
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('USER_SET_TOKEN', '');
        commit('USER_SET_TYPE', 0);
        commit('USER_SET_ID', 0);
        commit('USER_SET_CHECKED', false);
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
