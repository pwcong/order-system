const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname,
  type: state => state.user.type,
  id: state => state.user.id,
  orders: state => state.order.orders
};
export default getters;
