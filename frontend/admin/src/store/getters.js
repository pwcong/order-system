const getters = {
  /****** app ******/
  sidebar: state => state.app.sidebar,

  /****** 用户 ******/
  socket: state => state.user.socket,
  checked: state => state.user.checked,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname,
  type: state => state.user.type,
  id: state => state.user.id,
  userInfo: state => state.user.userInfo,

  /****** 订单 ******/
  orders: state => state.order.orders,

  /****** 账单 ******/
  bills: state => state.bill.bills
};
export default getters;
