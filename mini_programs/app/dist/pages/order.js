'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _actions = require('./../store/actions/index.js');

var _config = require('./../const/config.js');

var _loadmore = require('./../components/loadmore.js');

var _loadmore2 = _interopRequireDefault(_loadmore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STATUS_VALUE = {
  '0': '发起',
  '1': '已支付',
  '2': '已完成',
  '3': '取消中',
  '4': '已取消'
};

var Order = (_dec = (0, _wepyRedux.connect)({
  userId: function userId(state) {
    return state.user.id;
  },
  userCheck: function userCheck(state) {
    return state.user.check;
  },
  orders: function orders(state) {
    return state.order.orders.map(function (order) {
      return _extends({}, order, {
        details: JSON.parse(order.details),
        businessName: order.receiver_info.nickname,
        avatar: order.receiver_info.avatar ? _config.BASE_API + order.receiver_info.avatar : '/assets/imgs/avatar.png',
        statusValue: STATUS_VALUE['' + order.status]
      });
    });
  },
  ordersLength: function ordersLength(state) {
    return state.order.orders.length;
  }
}, {}), _dec(_class = function (_wepy$page) {
  _inherits(Order, _wepy$page);

  function Order() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Order);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Order.__proto__ || Object.getPrototypeOf(Order)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的订单',
      enablePullDownRefresh: true
    }, _this.$repeat = {}, _this.$props = { "LoadMore": { "xmlns:v-bind": "", "v-bind:loadingMore.sync": "loadingMore", "v-bind:hasMore.sync": "hasMore" } }, _this.$events = {}, _this.components = {
      LoadMore: _loadmore2.default
    }, _this.mixins = [], _this.data = {
      loginImg: '/assets/imgs/login.png',
      toolbars: [{ label: '进行中', checked: true, value: [0, 1, 3] }, { label: '已完成', checked: false, value: [2] }, { label: '已取消', checked: false, value: [4] }],
      pageSize: 5,
      pageNo: 1,
      status: [0, 1, 3],
      loadingMore: false,
      hasMore: true
    }, _this.computed = {}, _this.methods = {
      handleToLogin: function handleToLogin() {
        _wepy2.default.navigateTo({
          url: '/pages/login'
        });
      },
      handleToolbarChange: function handleToolbarChange(item) {
        this.toolbars.forEach(function (t) {
          if (t.label === item.label) {
            t.checked = true;
          } else {
            t.checked = false;
          }
        });

        this.status = item.value;
        this.pageNo = 1;
        this.loadOrders();
      },
      handleLoadMore: function handleLoadMore() {
        var ctx = this;

        if (!ctx.hasMore || ctx.loadingMore) {
          return;
        }

        ctx.pageNo++;

        ctx.loadingMore = true;
        (0, _wepyRedux.getStore)().dispatch((0, _actions.asyncGetMoreOrders)({
          token: _wepy2.default.getStorageSync('token'),
          status: ctx.status,
          pageSize: ctx.pageSize,
          pageNo: ctx.pageNo
        })).then(function (res) {
          _wepy2.default.stopPullDownRefresh();
          ctx.loadingMore = false;
          ctx.$apply();

          if (res.error) {
            _wepy2.default.showToast({
              title: res.payload.message,
              icon: 'none'
            });
            return;
          }

          if ((res.payload.data || []).length < ctx.pageSize) {
            ctx.hasMore = false;
          } else {
            ctx.hasMore = true;
          }
          ctx.$apply();
        });
      },
      handlePayOrder: function handlePayOrder(item) {
        var ctx = this;
        _wepy2.default.showModal({
          title: '提示',
          content: '是否确认支付该订单?',
          success: function success(res) {
            if (!res.confirm) {
              return;
            }

            _wepy2.default.showLoading({
              title: '支付中'
            });
            (0, _wepyRedux.getStore)().dispatch((0, _actions.asyncPayOrder)({
              token: _wepy2.default.getStorageSync('token'),
              id: item.id
            })).then(function (res) {
              _wepy2.default.hideLoading();
              if (res.error) {
                _wepy2.default.showModal({
                  title: '支付失败',
                  content: res.payload.message,
                  showCancel: false
                });
                return;
              }

              ctx.pageNo = 1;
              ctx.$apply();
              ctx.loadOrders();
            });
          }
        });
      },
      handleCancelOrder: function handleCancelOrder(item) {
        var ctx = this;
        _wepy2.default.showModal({
          title: '提示',
          content: '是否确认取消该订单?',
          success: function success(res) {
            if (!res.confirm) {
              return;
            }

            _wepy2.default.showLoading({
              title: '取消中'
            });
            (0, _wepyRedux.getStore)().dispatch((0, _actions.asyncCancelOrder)({
              token: _wepy2.default.getStorageSync('token'),
              id: item.id
            })).then(function (res) {
              _wepy2.default.hideLoading();
              if (res.error) {
                _wepy2.default.showModal({
                  title: '取消失败',
                  content: res.payload.message,
                  showCancel: false
                });
                return;
              }

              ctx.pageNo = 1;
              ctx.$apply();
              ctx.loadOrders();
            });
          }
        });
      },
      handleFinishOrder: function handleFinishOrder(item) {
        var ctx = this;
        _wepy2.default.showModal({
          title: '提示',
          content: '是否确认该订单已完成?',
          success: function success(res) {
            if (!res.confirm) {
              return;
            }

            _wepy2.default.showLoading({
              title: '提交中'
            });
            (0, _wepyRedux.getStore)().dispatch((0, _actions.asyncFinishOrder)({
              token: _wepy2.default.getStorageSync('token'),
              id: item.id
            })).then(function (res) {
              _wepy2.default.hideLoading();
              if (res.error) {
                _wepy2.default.showModal({
                  title: '提交失败',
                  content: res.payload.message,
                  showCancel: false
                });
                return;
              }

              ctx.pageNo = 1;
              ctx.$apply();
              ctx.loadOrders();
            });
          }
        });
      },
      handleToBI: function handleToBI(item) {
        (0, _wepyRedux.getStore)().dispatch((0, _actions.asyncSearchBusiness)(item.receiver_id)).then(function (res) {
          if (res.error) {
            _wepy2.default.showModal({
              title: '提示',
              showCancel: false,
              content: res.payload.message
            });
          } else {
            _wepy2.default.navigateTo({
              url: '/pages/business_info'
            });
          }
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Order, [{
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      var ctx = this;

      ctx.pageNo = 1;
      ctx.$apply();

      ctx.loadOrders();
    }
  }, {
    key: 'loadOrders',
    value: function loadOrders(fb) {
      var ctx = this;

      _wepy2.default.showLoading({
        title: '加载中'
      });
      (0, _wepyRedux.getStore)().dispatch((0, _actions.asyncGetOrders)({
        token: _wepy2.default.getStorageSync('token'),
        status: ctx.status,
        pageSize: ctx.pageSize,
        pageNo: ctx.pageNo
      })).then(function (res) {
        _wepy2.default.hideLoading();
        _wepy2.default.stopPullDownRefresh();
        if (res.error) {
          _wepy2.default.showToast({
            title: res.payload.message,
            icon: 'none'
          });
          return;
        }

        if ((res.payload.data || []).length < ctx.pageSize) {
          ctx.hasMore = false;
        } else {
          ctx.hasMore = true;
        }

        ctx.loadingMore = false;
        ctx.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.loadOrders();
    }
  }]);

  return Order;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIlNUQVRVU19WQUxVRSIsIk9yZGVyIiwidXNlcklkIiwic3RhdGUiLCJ1c2VyIiwiaWQiLCJ1c2VyQ2hlY2siLCJjaGVjayIsIm9yZGVycyIsIm9yZGVyIiwibWFwIiwiZGV0YWlscyIsIkpTT04iLCJwYXJzZSIsImJ1c2luZXNzTmFtZSIsInJlY2VpdmVyX2luZm8iLCJuaWNrbmFtZSIsImF2YXRhciIsInN0YXR1c1ZhbHVlIiwic3RhdHVzIiwib3JkZXJzTGVuZ3RoIiwibGVuZ3RoIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkxvYWRNb3JlIiwibWl4aW5zIiwiZGF0YSIsImxvZ2luSW1nIiwidG9vbGJhcnMiLCJsYWJlbCIsImNoZWNrZWQiLCJ2YWx1ZSIsInBhZ2VTaXplIiwicGFnZU5vIiwibG9hZGluZ01vcmUiLCJoYXNNb3JlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiaGFuZGxlVG9Mb2dpbiIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJoYW5kbGVUb29sYmFyQ2hhbmdlIiwiaXRlbSIsImZvckVhY2giLCJ0IiwibG9hZE9yZGVycyIsImhhbmRsZUxvYWRNb3JlIiwiY3R4IiwiZGlzcGF0Y2giLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwidGhlbiIsInN0b3BQdWxsRG93blJlZnJlc2giLCIkYXBwbHkiLCJyZXMiLCJlcnJvciIsInNob3dUb2FzdCIsInRpdGxlIiwicGF5bG9hZCIsIm1lc3NhZ2UiLCJpY29uIiwiaGFuZGxlUGF5T3JkZXIiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsImNvbmZpcm0iLCJzaG93TG9hZGluZyIsImhpZGVMb2FkaW5nIiwic2hvd0NhbmNlbCIsImhhbmRsZUNhbmNlbE9yZGVyIiwiaGFuZGxlRmluaXNoT3JkZXIiLCJoYW5kbGVU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QUosR0FBYyxLQUFkO0FBQ0QsU0FGRCxNQUVPO0FBQ0xZLGNBQUlaLE9BQUosR0FBYyxJQUFkO0FBQ0Q7O0FBRURZLFlBQUliLFdBQUosR0FBa0IsS0FBbEI7QUFDQWEsWUFBSU0sTUFBSjtBQUNELE9BNUJIO0FBNkJEOzs7NkJBSVE7QUFDUCxXQUFLUixVQUFMO0FBQ0Q7Ozs7RUFoUmdDLGVBQUs4QixJO2tCQUFuQi9FLEsiLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAnd2VweS1yZWR1eCc7XHJcblxyXG5pbXBvcnQgeyBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnO1xyXG5pbXBvcnQge1xyXG4gIGFzeW5jR2V0T3JkZXJzLFxyXG4gIGFzeW5jR2V0TW9yZU9yZGVycyxcclxuICBhc3luY1BheU9yZGVyLFxyXG4gIGFzeW5jQ2FuY2VsT3JkZXIsXHJcbiAgYXN5bmNGaW5pc2hPcmRlcixcclxuICBhc3luY1NlYXJjaEJ1c2luZXNzXHJcbn0gZnJvbSAnQC9zdG9yZS9hY3Rpb25zJztcclxuXHJcbmltcG9ydCB7IEJBU0VfQVBJIH0gZnJvbSAnQC9jb25zdC9jb25maWcnO1xyXG5cclxuaW1wb3J0IExvYWRNb3JlIGZyb20gJ0AvY29tcG9uZW50cy9sb2FkbW9yZSc7XHJcblxyXG5jb25zdCBTVEFUVVNfVkFMVUUgPSB7XHJcbiAgJzAnOiAn5Y+R6LW3JyxcclxuICAnMSc6ICflt7LmlK/ku5gnLFxyXG4gICcyJzogJ+W3suWujOaIkCcsXHJcbiAgJzMnOiAn5Y+W5raI5LitJyxcclxuICAnNCc6ICflt7Llj5bmtognXHJcbn07XHJcblxyXG5AY29ubmVjdChcclxuICB7XHJcbiAgICB1c2VySWQoc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLnVzZXIuaWQ7XHJcbiAgICB9LFxyXG4gICAgdXNlckNoZWNrKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyLmNoZWNrO1xyXG4gICAgfSxcclxuICAgIG9yZGVycyhzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUub3JkZXIub3JkZXJzLm1hcChvcmRlciA9PiAoe1xyXG4gICAgICAgIC4uLm9yZGVyLFxyXG4gICAgICAgIGRldGFpbHM6IEpTT04ucGFyc2Uob3JkZXIuZGV0YWlscyksXHJcbiAgICAgICAgYnVzaW5lc3NOYW1lOiBvcmRlci5yZWNlaXZlcl9pbmZvLm5pY2tuYW1lLFxyXG4gICAgICAgIGF2YXRhcjogb3JkZXIucmVjZWl2ZXJfaW5mby5hdmF0YXJcclxuICAgICAgICAgID8gQkFTRV9BUEkgKyBvcmRlci5yZWNlaXZlcl9pbmZvLmF2YXRhclxyXG4gICAgICAgICAgOiAnL2Fzc2V0cy9pbWdzL2F2YXRhci5wbmcnLFxyXG4gICAgICAgIHN0YXR1c1ZhbHVlOiBTVEFUVVNfVkFMVUVbJycgKyBvcmRlci5zdGF0dXNdXHJcbiAgICAgIH0pKTtcclxuICAgIH0sXHJcbiAgICBvcmRlcnNMZW5ndGgoc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLm9yZGVyLm9yZGVycy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgfSxcclxuICB7fVxyXG4pXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE6K6i5Y2VJyxcclxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkxvYWRNb3JlXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpsb2FkaW5nTW9yZS5zeW5jXCI6XCJsb2FkaW5nTW9yZVwiLFwidi1iaW5kOmhhc01vcmUuc3luY1wiOlwiaGFzTW9yZVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBMb2FkTW9yZVxyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgbG9naW5JbWc6ICcvYXNzZXRzL2ltZ3MvbG9naW4ucG5nJyxcclxuICAgIHRvb2xiYXJzOiBbXHJcbiAgICAgIHsgbGFiZWw6ICfov5vooYzkuK0nLCBjaGVja2VkOiB0cnVlLCB2YWx1ZTogWzAsIDEsIDNdIH0sXHJcbiAgICAgIHsgbGFiZWw6ICflt7LlrozmiJAnLCBjaGVja2VkOiBmYWxzZSwgdmFsdWU6IFsyXSB9LFxyXG4gICAgICB7IGxhYmVsOiAn5bey5Y+W5raIJywgY2hlY2tlZDogZmFsc2UsIHZhbHVlOiBbNF0gfVxyXG4gICAgXSxcclxuICAgIHBhZ2VTaXplOiA1LFxyXG4gICAgcGFnZU5vOiAxLFxyXG4gICAgc3RhdHVzOiBbMCwgMSwgM10sXHJcbiAgICBsb2FkaW5nTW9yZTogZmFsc2UsXHJcbiAgICBoYXNNb3JlOiB0cnVlXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGhhbmRsZVRvTG9naW4oKSB7XHJcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2xvZ2luJ1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVUb29sYmFyQ2hhbmdlKGl0ZW0pIHtcclxuICAgICAgdGhpcy50b29sYmFycy5mb3JFYWNoKHQgPT4ge1xyXG4gICAgICAgIGlmICh0LmxhYmVsID09PSBpdGVtLmxhYmVsKSB7XHJcbiAgICAgICAgICB0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0LmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5zdGF0dXMgPSBpdGVtLnZhbHVlO1xyXG4gICAgICB0aGlzLnBhZ2VObyA9IDE7XHJcbiAgICAgIHRoaXMubG9hZE9yZGVycygpO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZUxvYWRNb3JlKCkge1xyXG4gICAgICBjb25zdCBjdHggPSB0aGlzO1xyXG5cclxuICAgICAgaWYgKCFjdHguaGFzTW9yZSB8fCBjdHgubG9hZGluZ01vcmUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGN0eC5wYWdlTm8rKztcclxuXHJcbiAgICAgIGN0eC5sb2FkaW5nTW9yZSA9IHRydWU7XHJcbiAgICAgIGdldFN0b3JlKClcclxuICAgICAgICAuZGlzcGF0Y2goXHJcbiAgICAgICAgICBhc3luY0dldE1vcmVPcmRlcnMoe1xyXG4gICAgICAgICAgICB0b2tlbjogd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcclxuICAgICAgICAgICAgc3RhdHVzOiBjdHguc3RhdHVzLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogY3R4LnBhZ2VTaXplLFxyXG4gICAgICAgICAgICBwYWdlTm86IGN0eC5wYWdlTm9cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgICAgIGN0eC5sb2FkaW5nTW9yZSA9IGZhbHNlO1xyXG4gICAgICAgICAgY3R4LiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgIGlmIChyZXMuZXJyb3IpIHtcclxuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiByZXMucGF5bG9hZC5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICgocmVzLnBheWxvYWQuZGF0YSB8fCBbXSkubGVuZ3RoIDwgY3R4LnBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIGN0eC5oYXNNb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdHguaGFzTW9yZSA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjdHguJGFwcGx5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlUGF5T3JkZXIoaXRlbSkge1xyXG4gICAgICBjb25zdCBjdHggPSB0aGlzO1xyXG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbnoa7orqTmlK/ku5jor6XorqLljZU/JyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYgKCFyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5LitJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBnZXRTdG9yZSgpXHJcbiAgICAgICAgICAgIC5kaXNwYXRjaChcclxuICAgICAgICAgICAgICBhc3luY1BheU9yZGVyKHtcclxuICAgICAgICAgICAgICAgIHRva2VuOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxyXG4gICAgICAgICAgICAgICAgaWQ6IGl0ZW0uaWRcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICAgIGlmIChyZXMuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jlpLHotKUnLFxyXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiByZXMucGF5bG9hZC5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBjdHgucGFnZU5vID0gMTtcclxuICAgICAgICAgICAgICBjdHguJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgY3R4LmxvYWRPcmRlcnMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVDYW5jZWxPcmRlcihpdGVtKSB7XHJcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXM7XHJcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgY29udGVudDogJ+aYr+WQpuehruiupOWPlua2iOivpeiuouWNlT8nLFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICBpZiAoIXJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgdGl0bGU6ICflj5bmtojkuK0nXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGdldFN0b3JlKClcclxuICAgICAgICAgICAgLmRpc3BhdGNoKFxyXG4gICAgICAgICAgICAgIGFzeW5jQ2FuY2VsT3JkZXIoe1xyXG4gICAgICAgICAgICAgICAgdG9rZW46IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXHJcbiAgICAgICAgICAgICAgICBpZDogaXRlbS5pZFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+WPlua2iOWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5wYXlsb2FkLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGN0eC5wYWdlTm8gPSAxO1xyXG4gICAgICAgICAgICAgIGN0eC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICBjdHgubG9hZE9yZGVycygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZUZpbmlzaE9yZGVyKGl0ZW0pIHtcclxuICAgICAgY29uc3QgY3R4ID0gdGhpcztcclxuICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICBjb250ZW50OiAn5piv5ZCm56Gu6K6k6K+l6K6i5Y2V5bey5a6M5oiQPycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmICghcmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+aPkOS6pOS4rSdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZ2V0U3RvcmUoKVxyXG4gICAgICAgICAgICAuZGlzcGF0Y2goXHJcbiAgICAgICAgICAgICAgYXN5bmNGaW5pc2hPcmRlcih7XHJcbiAgICAgICAgICAgICAgICB0b2tlbjogd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcclxuICAgICAgICAgICAgICAgIGlkOiBpdGVtLmlkXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICBpZiAocmVzLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q5Lqk5aSx6LSlJyxcclxuICAgICAgICAgICAgICAgICAgY29udGVudDogcmVzLnBheWxvYWQubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgY3R4LnBhZ2VObyA9IDE7XHJcbiAgICAgICAgICAgICAgY3R4LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgIGN0eC5sb2FkT3JkZXJzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlVG9CSShpdGVtKSB7XHJcbiAgICAgIGdldFN0b3JlKClcclxuICAgICAgICAuZGlzcGF0Y2goYXN5bmNTZWFyY2hCdXNpbmVzcyhpdGVtLnJlY2VpdmVyX2lkKSlcclxuICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlcy5lcnJvcikge1xyXG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5wYXlsb2FkLm1lc3NhZ2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgIHVybDogJy9wYWdlcy9idXNpbmVzc19pbmZvJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcclxuICAgIGNvbnN0IGN0eCA9IHRoaXM7XHJcblxyXG4gICAgY3R4LnBhZ2VObyA9IDE7XHJcbiAgICBjdHguJGFwcGx5KCk7XHJcblxyXG4gICAgY3R4LmxvYWRPcmRlcnMoKTtcclxuICB9XHJcblxyXG4gIGxvYWRPcmRlcnMoZmIpIHtcclxuICAgIGNvbnN0IGN0eCA9IHRoaXM7XHJcblxyXG4gICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJ1xyXG4gICAgfSk7XHJcbiAgICBnZXRTdG9yZSgpXHJcbiAgICAgIC5kaXNwYXRjaChcclxuICAgICAgICBhc3luY0dldE9yZGVycyh7XHJcbiAgICAgICAgICB0b2tlbjogd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcclxuICAgICAgICAgIHN0YXR1czogY3R4LnN0YXR1cyxcclxuICAgICAgICAgIHBhZ2VTaXplOiBjdHgucGFnZVNpemUsXHJcbiAgICAgICAgICBwYWdlTm86IGN0eC5wYWdlTm9cclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xyXG4gICAgICAgIGlmIChyZXMuZXJyb3IpIHtcclxuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5wYXlsb2FkLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKHJlcy5wYXlsb2FkLmRhdGEgfHwgW10pLmxlbmd0aCA8IGN0eC5wYWdlU2l6ZSkge1xyXG4gICAgICAgICAgY3R4Lmhhc01vcmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY3R4Lmhhc01vcmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3R4LmxvYWRpbmdNb3JlID0gZmFsc2U7XHJcbiAgICAgICAgY3R4LiRhcHBseSgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLmxvYWRPcmRlcnMoKTtcclxuICB9XHJcbn1cclxuIl19