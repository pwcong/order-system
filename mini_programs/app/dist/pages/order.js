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
      handle2Login: function handle2Login() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIlNUQVRVU19WQUxVRSIsIk9yZGVyIiwidXNlcklkIiwic3RhdGUiLCJ1c2VyIiwiaWQiLCJ1c2VyQ2hlY2siLCJjaGVjayIsIm9yZGVycyIsIm9yZGVyIiwibWFwIiwiZGV0YWlscyIsIkpTT04iLCJwYXJzZSIsImJ1c2luZXNzTmFtZSIsInJlY2VpdmVyX2luZm8iLCJuaWNrbmFtZSIsImF2YXRhciIsInN0YXR1c1ZhbHVlIiwic3RhdHVzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkxvYWRNb3JlIiwibWl4aW5zIiwiZGF0YSIsImxvZ2luSW1nIiwidG9vbGJhcnMiLCJsYWJlbCIsImNoZWNrZWQiLCJ2YWx1ZSIsInBhZ2VTaXplIiwicGFnZU5vIiwibG9hZGluZ01vcmUiLCJoYXNNb3JlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiaGFuZGxlMkxvZ2luIiwibmF2aWdhdGVUbyIsInVybCIsImhhbmRsZVRvb2xiYXJDaGFuZ2UiLCJpdGVtIiwiZm9yRWFjaCIsInQiLCJsb2FkT3JkZXJzIiwiaGFuZGxlTG9hZE1vcmUiLCJjdHgiLCJkaXNwYXRjaCIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0aGVuIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsIiRhcHBseSIsInJlcyIsImVycm9yIiwic2hvd1RvYXN0IiwidGl0bGUiLCJwYXlsb2FkIiwibWVzc2FnZSIsImljb24iLCJsZW5ndGgiLCJoYW5kbGVQYXlPcmRlciIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzdWNjZXNzIiwiY29uZmlybSIsInNob3dMb2FkaW5nIiwiaGlkZUxvYWRpbmciLCJzaG93Q2FuY2VsIiwiaGFuZGxlQ2FuY2VsT3JkZXIiLCJoYW5kbGVGaW5pc2hPcmRlciIsImV2ZW50cyIsImZiIiwicGFnZSJdLCJt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ZUFBTztBQURRLE9BQWpCO0FBR0EsaUNBQ0dULFFBREgsQ0FFSSw2QkFBZTtBQUNiQyxlQUFPLGVBQUtDLGNBQUwsQ0FBb0IsT0FBcEIsQ0FETTtBQUVibEMsZ0JBQVErQixJQUFJL0IsTUFGQztBQUdiZ0Isa0JBQVVlLElBQUlmLFFBSEQ7QUFJYkMsZ0JBQVFjLElBQUlkO0FBSkMsT0FBZixDQUZKLEVBU0drQixJQVRILENBU1EsZUFBTztBQUNYLHVCQUFLaUIsV0FBTDtBQUNBLHVCQUFLaEIsbUJBQUw7QUFDQSxZQUFJRSxJQUFJQyxLQUFSLEVBQWU7QUFDYix5QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPSCxJQUFJSSxPQUFKLENBQVlDLE9BRE47QUFFYkMsa0JBQU07QUFGTyxXQUFmO0FBSUE7QUFDRDs7QUFFRCxZQUFJLENBQUNOLElBQUlJLE9BQUosQ0FBWWhDLElBQVosSUFBb0IsRUFBckIsRUFBeUJtQyxNQUF6QixHQUFrQ2QsSUFBSWYsUUFBMUMsRUFBb0Q7QUFDbERlLGNBQUlaLE9BQUosR0FBYyxLQUFkO0FBQ0QsU0FGRCxNQUVPO0FBQ0xZLGNBQUlaLE9BQUosR0FBYyxJQUFkO0FBQ0Q7QUFDRFksWUFBSU0sTUFBSjtBQUNELE9BMUJIO0FBMkJEOzs7NkJBSVE7QUFDUCxXQUFLUixVQUFMO0FBQ0Q7Ozs7RUE3UGdDLGVBQUs2QixJO2tCQUFuQjVFLEsiLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAnd2VweS1yZWR1eCc7XHJcblxyXG5pbXBvcnQgeyBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnO1xyXG5pbXBvcnQge1xyXG4gIGFzeW5jR2V0T3JkZXJzLFxyXG4gIGFzeW5jR2V0TW9yZU9yZGVycyxcclxuICBhc3luY1BheU9yZGVyLFxyXG4gIGFzeW5jQ2FuY2VsT3JkZXIsXHJcbiAgYXN5bmNGaW5pc2hPcmRlclxyXG59IGZyb20gJ0Avc3RvcmUvYWN0aW9ucyc7XHJcblxyXG5pbXBvcnQgeyBCQVNFX0FQSSB9IGZyb20gJ0AvY29uc3QvY29uZmlnJztcclxuXHJcbmltcG9ydCBMb2FkTW9yZSBmcm9tICdAL2NvbXBvbmVudHMvbG9hZG1vcmUnO1xyXG5cclxuY29uc3QgU1RBVFVTX1ZBTFVFID0ge1xyXG4gICcwJzogJ+WPkei1tycsXHJcbiAgJzEnOiAn5bey5pSv5LuYJyxcclxuICAnMic6ICflt7LlrozmiJAnLFxyXG4gICczJzogJ+WPlua2iOS4rScsXHJcbiAgJzQnOiAn5bey5Y+W5raIJ1xyXG59O1xyXG5cclxuQGNvbm5lY3QoXHJcbiAge1xyXG4gICAgdXNlcklkKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyLmlkO1xyXG4gICAgfSxcclxuICAgIHVzZXJDaGVjayhzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUudXNlci5jaGVjaztcclxuICAgIH0sXHJcbiAgICBvcmRlcnMoc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLm9yZGVyLm9yZGVycy5tYXAob3JkZXIgPT4gKHtcclxuICAgICAgICAuLi5vcmRlcixcclxuICAgICAgICBkZXRhaWxzOiBKU09OLnBhcnNlKG9yZGVyLmRldGFpbHMpLFxyXG4gICAgICAgIGJ1c2luZXNzTmFtZTogb3JkZXIucmVjZWl2ZXJfaW5mby5uaWNrbmFtZSxcclxuICAgICAgICBhdmF0YXI6IG9yZGVyLnJlY2VpdmVyX2luZm8uYXZhdGFyXHJcbiAgICAgICAgICA/IEJBU0VfQVBJICsgb3JkZXIucmVjZWl2ZXJfaW5mby5hdmF0YXJcclxuICAgICAgICAgIDogJy9hc3NldHMvaW1ncy9hdmF0YXIucG5nJyxcclxuICAgICAgICBzdGF0dXNWYWx1ZTogU1RBVFVTX1ZBTFVFWycnICsgb3JkZXIuc3RhdHVzXVxyXG4gICAgICB9KSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICB7fVxyXG4pXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE6K6i5Y2VJyxcclxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxyXG4gIH07XHJcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIkxvYWRNb3JlXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpsb2FkaW5nTW9yZS5zeW5jXCI6XCJsb2FkaW5nTW9yZVwiLFwidi1iaW5kOmhhc01vcmUuc3luY1wiOlwiaGFzTW9yZVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBMb2FkTW9yZVxyXG4gIH07XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgbG9naW5JbWc6ICcvYXNzZXRzL2ltZ3MvbG9naW4ucG5nJyxcclxuICAgIHRvb2xiYXJzOiBbXHJcbiAgICAgIHsgbGFiZWw6ICfov5vooYzkuK0nLCBjaGVja2VkOiB0cnVlLCB2YWx1ZTogWzAsIDEsIDNdIH0sXHJcbiAgICAgIHsgbGFiZWw6ICflt7LlrozmiJAnLCBjaGVja2VkOiBmYWxzZSwgdmFsdWU6IFsyXSB9LFxyXG4gICAgICB7IGxhYmVsOiAn5bey5Y+W5raIJywgY2hlY2tlZDogZmFsc2UsIHZhbHVlOiBbNF0gfVxyXG4gICAgXSxcclxuICAgIHBhZ2VTaXplOiA1LFxyXG4gICAgcGFnZU5vOiAxLFxyXG4gICAgc3RhdHVzOiBbMCwgMSwgM10sXHJcbiAgICBsb2FkaW5nTW9yZTogZmFsc2UsXHJcbiAgICBoYXNNb3JlOiB0cnVlXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGhhbmRsZTJMb2dpbigpIHtcclxuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcvcGFnZXMvbG9naW4nXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZVRvb2xiYXJDaGFuZ2UoaXRlbSkge1xyXG4gICAgICB0aGlzLnRvb2xiYXJzLmZvckVhY2godCA9PiB7XHJcbiAgICAgICAgaWYgKHQubGFiZWwgPT09IGl0ZW0ubGFiZWwpIHtcclxuICAgICAgICAgIHQuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHQuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnN0YXR1cyA9IGl0ZW0udmFsdWU7XHJcbiAgICAgIHRoaXMucGFnZU5vID0gMTtcclxuICAgICAgdGhpcy5sb2FkT3JkZXJzKCk7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlTG9hZE1vcmUoKSB7XHJcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXM7XHJcblxyXG4gICAgICBpZiAoIWN0eC5oYXNNb3JlIHx8IGN0eC5sb2FkaW5nTW9yZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY3R4LnBhZ2VObysrO1xyXG5cclxuICAgICAgY3R4LmxvYWRpbmdNb3JlID0gdHJ1ZTtcclxuICAgICAgZ2V0U3RvcmUoKVxyXG4gICAgICAgIC5kaXNwYXRjaChcclxuICAgICAgICAgIGFzeW5jR2V0TW9yZU9yZGVycyh7XHJcbiAgICAgICAgICAgIHRva2VuOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxyXG4gICAgICAgICAgICBzdGF0dXM6IGN0eC5zdGF0dXMsXHJcbiAgICAgICAgICAgIHBhZ2VTaXplOiBjdHgucGFnZVNpemUsXHJcbiAgICAgICAgICAgIHBhZ2VObzogY3R4LnBhZ2VOb1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xyXG4gICAgICAgICAgY3R4LmxvYWRpbmdNb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICBjdHguJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgaWYgKHJlcy5lcnJvcikge1xyXG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHJlcy5wYXlsb2FkLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKChyZXMucGF5bG9hZC5kYXRhIHx8IFtdKS5sZW5ndGggPCBjdHgucGFnZVNpemUpIHtcclxuICAgICAgICAgICAgY3R4Lmhhc01vcmUgPSBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN0eC5oYXNNb3JlID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGN0eC4kYXBwbHkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVQYXlPcmRlcihpdGVtKSB7XHJcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXM7XHJcbiAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgY29udGVudDogJ+aYr+WQpuehruiupOaUr+S7mOivpeiuouWNlT8nLFxyXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICBpZiAoIXJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jkuK0nXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGdldFN0b3JlKClcclxuICAgICAgICAgICAgLmRpc3BhdGNoKFxyXG4gICAgICAgICAgICAgIGFzeW5jUGF5T3JkZXIoe1xyXG4gICAgICAgICAgICAgICAgdG9rZW46IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXHJcbiAgICAgICAgICAgICAgICBpZDogaXRlbS5pZFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5wYXlsb2FkLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGN0eC5wYWdlTm8gPSAxO1xyXG4gICAgICAgICAgICAgIGN0eC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICBjdHgubG9hZE9yZGVycygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZUNhbmNlbE9yZGVyKGl0ZW0pIHtcclxuICAgICAgY29uc3QgY3R4ID0gdGhpcztcclxuICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICBjb250ZW50OiAn5piv5ZCm56Gu6K6k5Y+W5raI6K+l6K6i5Y2VPycsXHJcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgIGlmICghcmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WPlua2iOS4rSdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZ2V0U3RvcmUoKVxyXG4gICAgICAgICAgICAuZGlzcGF0Y2goXHJcbiAgICAgICAgICAgICAgYXN5bmNDYW5jZWxPcmRlcih7XHJcbiAgICAgICAgICAgICAgICB0b2tlbjogd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcclxuICAgICAgICAgICAgICAgIGlkOiBpdGVtLmlkXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICBpZiAocmVzLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Y+W5raI5aSx6LSlJyxcclxuICAgICAgICAgICAgICAgICAgY29udGVudDogcmVzLnBheWxvYWQubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgY3R4LnBhZ2VObyA9IDE7XHJcbiAgICAgICAgICAgICAgY3R4LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgIGN0eC5sb2FkT3JkZXJzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlRmluaXNoT3JkZXIoaXRlbSkge1xyXG4gICAgICBjb25zdCBjdHggPSB0aGlzO1xyXG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbnoa7orqTor6XorqLljZXlt7LlrozmiJA/JyxcclxuICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgaWYgKCFyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q5Lqk5LitJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBnZXRTdG9yZSgpXHJcbiAgICAgICAgICAgIC5kaXNwYXRjaChcclxuICAgICAgICAgICAgICBhc3luY0ZpbmlzaE9yZGVyKHtcclxuICAgICAgICAgICAgICAgIHRva2VuOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxyXG4gICAgICAgICAgICAgICAgaWQ6IGl0ZW0uaWRcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICAgIGlmIChyZXMuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DkuqTlpLHotKUnLFxyXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiByZXMucGF5bG9hZC5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBjdHgucGFnZU5vID0gMTtcclxuICAgICAgICAgICAgICBjdHguJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgY3R4LmxvYWRPcmRlcnMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcclxuICAgIGNvbnN0IGN0eCA9IHRoaXM7XHJcblxyXG4gICAgY3R4LnBhZ2VObyA9IDE7XHJcbiAgICBjdHguJGFwcGx5KCk7XHJcblxyXG4gICAgY3R4LmxvYWRPcmRlcnMoKTtcclxuICB9XHJcblxyXG4gIGxvYWRPcmRlcnMoZmIpIHtcclxuICAgIGNvbnN0IGN0eCA9IHRoaXM7XHJcblxyXG4gICAgd2VweS5zaG93TG9hZGluZyh7XHJcbiAgICAgIHRpdGxlOiAn5Yqg6L295LitJ1xyXG4gICAgfSk7XHJcbiAgICBnZXRTdG9yZSgpXHJcbiAgICAgIC5kaXNwYXRjaChcclxuICAgICAgICBhc3luY0dldE9yZGVycyh7XHJcbiAgICAgICAgICB0b2tlbjogd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcclxuICAgICAgICAgIHN0YXR1czogY3R4LnN0YXR1cyxcclxuICAgICAgICAgIHBhZ2VTaXplOiBjdHgucGFnZVNpemUsXHJcbiAgICAgICAgICBwYWdlTm86IGN0eC5wYWdlTm9cclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xyXG4gICAgICAgIGlmIChyZXMuZXJyb3IpIHtcclxuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5wYXlsb2FkLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKHJlcy5wYXlsb2FkLmRhdGEgfHwgW10pLmxlbmd0aCA8IGN0eC5wYWdlU2l6ZSkge1xyXG4gICAgICAgICAgY3R4Lmhhc01vcmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY3R4Lmhhc01vcmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguJGFwcGx5KCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uU2hvdygpIHtcclxuICAgIHRoaXMubG9hZE9yZGVycygpO1xyXG4gIH1cclxufVxyXG4iXX0=