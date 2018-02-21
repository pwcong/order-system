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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIlNUQVRVU19WQUxVRSIsIk9yZGVyIiwidXNlcklkIiwic3RhdGUiLCJ1c2VyIiwiaWQiLCJ1c2VyQ2hlY2siLCJjaGVjayIsIm9yZGVycyIsIm9yZGVyIiwibWFwIiwiZGV0YWlscyIsIkpTT04iLCJwYXJzZSIsImJ1c2luZXNzTmFtZSIsInJlY2VpdmVyX2luZm8iLCJuaWNrbmFtZSIsImF2YXRhciIsInN0YXR1c1ZhbHVlIiwic3RhdHVzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkxvYWRNb3JlIiwibWl4aW5zIiwiZGF0YSIsImxvZ2luSW1nIiwidG9vbGJhcnMiLCJsYWJlbCIsImNoZWNrZWQiLCJ2YWx1ZSIsInBhZ2VTaXplIiwicGFnZU5vIiwibG9hZGluZ01vcmUiLCJoYXNNb3JlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiaGFuZGxlMkxvZ2luIiwibmF2aWdhdGVUbyIsInVybCIsImhhbmRsZVRvb2xiYXJDaGFuZ2UiLCJpdGVtIiwiZm9yRWFjaCIsInQiLCJsb2FkT3JkZXJzIiwiaGFuZGxlTG9hZE1vcmUiLCJjdHgiLCJkaXNwYXRjaCIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0aGVuIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsIiRhcHBseSIsInJlcyIsImVycm9yIiwic2hvd1RvYXN0IiwidGl0bGUiLCJwYXlsb2FkIiwibWVzc2FnZSIsImljb24iLCJsZW5ndGgiLCJldmVudHMiLCJmYiIsInNob3dMb2FkaW5nIiwiaGlkZUxvYWRpbmciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFHQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZUFBZTtBQUNuQixPQUFLLElBRGM7QUFFbkIsT0FBSyxLQUZjO0FBR25CLE9BQUssS0FIYztBQUluQixPQUFLLEtBSmM7QUFLbkIsT0FBSztBQUxjLENBQXJCOztJQThCcUJDLEssV0F0QnBCLHdCQUNDO0FBQ0VDLFFBREYsa0JBQ1NDLEtBRFQsRUFDZ0I7QUFDWixXQUFPQSxNQUFNQyxJQUFOLENBQVdDLEVBQWxCO0FBQ0QsR0FISDtBQUlFQyxXQUpGLHFCQUlZSCxLQUpaLEVBSW1CO0FBQ2YsV0FBT0EsTUFBTUMsSUFBTixDQUFXRyxLQUFsQjtBQUNELEdBTkg7QUFPRUMsUUFQRixrQkFPU0wsS0FQVCxFQU9nQjtBQUNaLFdBQU9BLE1BQU1NLEtBQU4sQ0FBWUQsTUFBWixDQUFtQkUsR0FBbkIsQ0FBdUI7QUFBQSwwQkFDekJELEtBRHlCO0FBRTVCRSxpQkFBU0MsS0FBS0MsS0FBTCxDQUFXSixNQUFNRSxPQUFqQixDQUZtQjtBQUc1Qkcsc0JBQWNMLE1BQU1NLGFBQU4sQ0FBb0JDLFFBSE47QUFJNUJDLGdCQUFRUixNQUFNTSxhQUFOLENBQW9CRSxNQUFwQixHQUNKLG1CQUFXUixNQUFNTSxhQUFOLENBQW9CRSxNQUQzQixHQUVKLHlCQU53QjtBQU81QkMscUJBQWFsQixhQUFhLEtBQUtTLE1BQU1VLE1BQXhCO0FBUGU7QUFBQSxLQUF2QixDQUFQO0FBU0Q7QUFqQkgsQ0FERCxFQW9CQyxFQXBCRCxDOzs7Ozs7Ozs7Ozs7OztvTEF1QkNDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsNkJBQXVCO0FBRmhCLEssUUFJVkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLDJCQUEwQixhQUE3QyxFQUEyRCx1QkFBc0IsU0FBakYsRUFBWixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQztBQURVLEssUUFJWkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLHdCQURMO0FBRUxDLGdCQUFVLENBQ1IsRUFBRUMsT0FBTyxLQUFULEVBQWdCQyxTQUFTLElBQXpCLEVBQStCQyxPQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQXRDLEVBRFEsRUFFUixFQUFFRixPQUFPLEtBQVQsRUFBZ0JDLFNBQVMsS0FBekIsRUFBZ0NDLE9BQU8sQ0FBQyxDQUFELENBQXZDLEVBRlEsRUFHUixFQUFFRixPQUFPLEtBQVQsRUFBZ0JDLFNBQVMsS0FBekIsRUFBZ0NDLE9BQU8sQ0FBQyxDQUFELENBQXZDLEVBSFEsQ0FGTDtBQU9MQyxnQkFBVSxDQVBMO0FBUUxDLGNBQVEsQ0FSSDtBQVNMakIsY0FBUSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQVRIO0FBVUxrQixtQkFBYSxLQVZSO0FBV0xDLGVBQVM7QUFYSixLLFFBY1BDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyxrQkFEUSwwQkFDTztBQUNiLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BTE87QUFNUkMseUJBTlEsK0JBTVlDLElBTlosRUFNa0I7QUFDeEIsYUFBS2QsUUFBTCxDQUFjZSxPQUFkLENBQXNCLGFBQUs7QUFDekIsY0FBSUMsRUFBRWYsS0FBRixLQUFZYSxLQUFLYixLQUFyQixFQUE0QjtBQUMxQmUsY0FBRWQsT0FBRixHQUFZLElBQVo7QUFDRCxXQUZELE1BRU87QUFDTGMsY0FBRWQsT0FBRixHQUFZLEtBQVo7QUFDRDtBQUNGLFNBTkQ7O0FBUUEsYUFBS2QsTUFBTCxHQUFjMEIsS0FBS1gsS0FBbkI7QUFDQSxhQUFLRSxNQUFMLEdBQWMsQ0FBZDtBQUNBLGFBQUtZLFVBQUw7QUFDRCxPQWxCTztBQW1CUkMsb0JBbkJRLDRCQW1CUztBQUNmLFlBQU1DLE1BQU0sSUFBWjs7QUFFQSxZQUFJLENBQUNBLElBQUlaLE9BQUwsSUFBZ0JZLElBQUliLFdBQXhCLEVBQXFDO0FBQ25DO0FBQ0Q7O0FBRURhLFlBQUlkLE1BQUo7O0FBRUFjLFlBQUliLFdBQUosR0FBa0IsSUFBbEI7QUFDQSxtQ0FDR2MsUUFESCxDQUVJLGlDQUFtQjtBQUNqQkMsaUJBQU8sZUFBS0MsY0FBTCxDQUFvQixPQUFwQixDQURVO0FBRWpCbEMsa0JBQVErQixJQUFJL0IsTUFGSztBQUdqQmdCLG9CQUFVZSxJQUFJZixRQUhHO0FBSWpCQyxrQkFBUWMsSUFBSWQ7QUFKSyxTQUFuQixDQUZKLEVBU0drQixJQVRILENBU1EsZUFBTztBQUNYLHlCQUFLQyxtQkFBTDtBQUNBTCxjQUFJYixXQUFKLEdBQWtCLEtBQWxCO0FBQ0FhLGNBQUlNLE1BQUo7O0FBRUEsY0FBSUMsSUFBSUMsS0FBUixFQUFlO0FBQ2IsMkJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxxQkFBT0gsSUFBSUksT0FBSixDQUFZQyxPQUROO0FBRWJDLG9CQUFNO0FBRk8sYUFBZjtBQUlBO0FBQ0Q7O0FBRUQsY0FBSSxDQUFDTixJQUFJSSxPQUFKLENBQVloQyxJQUFaLElBQW9CLEVBQXJCLEVBQXlCbUMsTUFBekIsR0FBa0NkLElBQUlmLFFBQTFDLEVBQW9EO0FBQ2xEZSxnQkFBSVosT0FBSixHQUFjLEtBQWQ7QUFDRCxXQUZELE1BRU87QUFDTFksZ0JBQUlaLE9BQUosR0FBYyxJQUFkO0FBQ0Q7QUFDRFksY0FBSU0sTUFBSjtBQUNELFNBNUJIO0FBNkJEO0FBMURPLEssUUF5R1ZTLE0sR0FBUyxFOzs7Ozt3Q0E1Q1c7QUFDbEIsVUFBTWYsTUFBTSxJQUFaOztBQUVBQSxVQUFJZCxNQUFKLEdBQWEsQ0FBYjtBQUNBYyxVQUFJTSxNQUFKOztBQUVBTixVQUFJRixVQUFKO0FBQ0Q7OzsrQkFFVWtCLEUsRUFBSTtBQUNiLFVBQU1oQixNQUFNLElBQVo7O0FBRUEscUJBQUtpQixXQUFMLENBQWlCO0FBQ2ZQLGVBQU87QUFEUSxPQUFqQjtBQUdBLGlDQUNHVCxRQURILENBRUksNkJBQWU7QUFDYkMsZUFBTyxlQUFLQyxjQUFMLENBQW9CLE9BQXBCLENBRE07QUFFYmxDLGdCQUFRK0IsSUFBSS9CLE1BRkM7QUFHYmdCLGtCQUFVZSxJQUFJZixRQUhEO0FBSWJDLGdCQUFRYyxJQUFJZDtBQUpDLE9BQWYsQ0FGSixFQVNHa0IsSUFUSCxDQVNRLGVBQU87QUFDWCx1QkFBS2MsV0FBTDtBQUNBLHVCQUFLYixtQkFBTDtBQUNBLFlBQUlFLElBQUlDLEtBQVIsRUFBZTtBQUNiLHlCQUFLQyxTQUFMLENBQWU7QUFDYkMsbUJBQU9ILElBQUlJLE9BQUosQ0FBWUMsT0FETjtBQUViQyxrQkFBTTtBQUZPLFdBQWY7QUFJQTtBQUNEOztBQUVELFlBQUksQ0FBQ04sSUFBSUksT0FBSixDQUFZaEMsSUFBWixJQUFvQixFQUFyQixFQUF5Qm1DLE1BQXpCLEdBQWtDZCxJQUFJZixRQUExQyxFQUFvRDtBQUNsRGUsY0FBSVosT0FBSixHQUFjLEtBQWQ7QUFDRCxTQUZELE1BRU87QUFDTFksY0FBSVosT0FBSixHQUFjLElBQWQ7QUFDRDtBQUNEWSxZQUFJTSxNQUFKO0FBQ0QsT0ExQkg7QUEyQkQ7Ozs2QkFJUTtBQUNQLFdBQUtSLFVBQUw7QUFDRDs7OztFQTNJZ0MsZUFBS3FCLEk7a0JBQW5CcEUsSyIsImZpbGUiOiJvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuXHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICd3ZXB5LXJlZHV4JztcclxuXHJcbmltcG9ydCB7IGdldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCc7XHJcbmltcG9ydCB7IGFzeW5jR2V0T3JkZXJzLCBhc3luY0dldE1vcmVPcmRlcnMgfSBmcm9tICdAL3N0b3JlL2FjdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgQkFTRV9BUEkgfSBmcm9tICdAL2NvbnN0L2NvbmZpZyc7XHJcblxyXG5pbXBvcnQgTG9hZE1vcmUgZnJvbSAnQC9jb21wb25lbnRzL2xvYWRtb3JlJztcclxuXHJcbmNvbnN0IFNUQVRVU19WQUxVRSA9IHtcclxuICAnMCc6ICflj5HotbcnLFxyXG4gICcxJzogJ+W3suaUr+S7mCcsXHJcbiAgJzInOiAn5bey5a6M5oiQJyxcclxuICAnMyc6ICflj5bmtojkuK0nLFxyXG4gICc0JzogJ+W3suWPlua2iCdcclxufTtcclxuXHJcbkBjb25uZWN0KFxyXG4gIHtcclxuICAgIHVzZXJJZChzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUudXNlci5pZDtcclxuICAgIH0sXHJcbiAgICB1c2VyQ2hlY2soc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLnVzZXIuY2hlY2s7XHJcbiAgICB9LFxyXG4gICAgb3JkZXJzKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS5vcmRlci5vcmRlcnMubWFwKG9yZGVyID0+ICh7XHJcbiAgICAgICAgLi4ub3JkZXIsXHJcbiAgICAgICAgZGV0YWlsczogSlNPTi5wYXJzZShvcmRlci5kZXRhaWxzKSxcclxuICAgICAgICBidXNpbmVzc05hbWU6IG9yZGVyLnJlY2VpdmVyX2luZm8ubmlja25hbWUsXHJcbiAgICAgICAgYXZhdGFyOiBvcmRlci5yZWNlaXZlcl9pbmZvLmF2YXRhclxyXG4gICAgICAgICAgPyBCQVNFX0FQSSArIG9yZGVyLnJlY2VpdmVyX2luZm8uYXZhdGFyXHJcbiAgICAgICAgICA6ICcvYXNzZXRzL2ltZ3MvYXZhdGFyLnBuZycsXHJcbiAgICAgICAgc3RhdHVzVmFsdWU6IFNUQVRVU19WQUxVRVsnJyArIG9yZGVyLnN0YXR1c11cclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge31cclxuKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiuouWNlScsXHJcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcclxuICB9O1xyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJMb2FkTW9yZVwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bG9hZGluZ01vcmUuc3luY1wiOlwibG9hZGluZ01vcmVcIixcInYtYmluZDpoYXNNb3JlLnN5bmNcIjpcImhhc01vcmVcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgTG9hZE1vcmVcclxuICB9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGxvZ2luSW1nOiAnL2Fzc2V0cy9pbWdzL2xvZ2luLnBuZycsXHJcbiAgICB0b29sYmFyczogW1xyXG4gICAgICB7IGxhYmVsOiAn6L+b6KGM5LitJywgY2hlY2tlZDogdHJ1ZSwgdmFsdWU6IFswLCAxLCAzXSB9LFxyXG4gICAgICB7IGxhYmVsOiAn5bey5a6M5oiQJywgY2hlY2tlZDogZmFsc2UsIHZhbHVlOiBbMl0gfSxcclxuICAgICAgeyBsYWJlbDogJ+W3suWPlua2iCcsIGNoZWNrZWQ6IGZhbHNlLCB2YWx1ZTogWzRdIH1cclxuICAgIF0sXHJcbiAgICBwYWdlU2l6ZTogNSxcclxuICAgIHBhZ2VObzogMSxcclxuICAgIHN0YXR1czogWzAsIDEsIDNdLFxyXG4gICAgbG9hZGluZ01vcmU6IGZhbHNlLFxyXG4gICAgaGFzTW9yZTogdHJ1ZVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBoYW5kbGUyTG9naW4oKSB7XHJcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2xvZ2luJ1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVUb29sYmFyQ2hhbmdlKGl0ZW0pIHtcclxuICAgICAgdGhpcy50b29sYmFycy5mb3JFYWNoKHQgPT4ge1xyXG4gICAgICAgIGlmICh0LmxhYmVsID09PSBpdGVtLmxhYmVsKSB7XHJcbiAgICAgICAgICB0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0LmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5zdGF0dXMgPSBpdGVtLnZhbHVlO1xyXG4gICAgICB0aGlzLnBhZ2VObyA9IDE7XHJcbiAgICAgIHRoaXMubG9hZE9yZGVycygpO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZUxvYWRNb3JlKCkge1xyXG4gICAgICBjb25zdCBjdHggPSB0aGlzO1xyXG5cclxuICAgICAgaWYgKCFjdHguaGFzTW9yZSB8fCBjdHgubG9hZGluZ01vcmUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGN0eC5wYWdlTm8rKztcclxuXHJcbiAgICAgIGN0eC5sb2FkaW5nTW9yZSA9IHRydWU7XHJcbiAgICAgIGdldFN0b3JlKClcclxuICAgICAgICAuZGlzcGF0Y2goXHJcbiAgICAgICAgICBhc3luY0dldE1vcmVPcmRlcnMoe1xyXG4gICAgICAgICAgICB0b2tlbjogd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcclxuICAgICAgICAgICAgc3RhdHVzOiBjdHguc3RhdHVzLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogY3R4LnBhZ2VTaXplLFxyXG4gICAgICAgICAgICBwYWdlTm86IGN0eC5wYWdlTm9cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgICAgIGN0eC5sb2FkaW5nTW9yZSA9IGZhbHNlO1xyXG4gICAgICAgICAgY3R4LiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgIGlmIChyZXMuZXJyb3IpIHtcclxuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiByZXMucGF5bG9hZC5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICgocmVzLnBheWxvYWQuZGF0YSB8fCBbXSkubGVuZ3RoIDwgY3R4LnBhZ2VTaXplKSB7XHJcbiAgICAgICAgICAgIGN0eC5oYXNNb3JlID0gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdHguaGFzTW9yZSA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjdHguJGFwcGx5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICBjb25zdCBjdHggPSB0aGlzO1xyXG5cclxuICAgIGN0eC5wYWdlTm8gPSAxO1xyXG4gICAgY3R4LiRhcHBseSgpO1xyXG5cclxuICAgIGN0eC5sb2FkT3JkZXJzKCk7XHJcbiAgfVxyXG5cclxuICBsb2FkT3JkZXJzKGZiKSB7XHJcbiAgICBjb25zdCBjdHggPSB0aGlzO1xyXG5cclxuICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogJ+WKoOi9veS4rSdcclxuICAgIH0pO1xyXG4gICAgZ2V0U3RvcmUoKVxyXG4gICAgICAuZGlzcGF0Y2goXHJcbiAgICAgICAgYXN5bmNHZXRPcmRlcnMoe1xyXG4gICAgICAgICAgdG9rZW46IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXHJcbiAgICAgICAgICBzdGF0dXM6IGN0eC5zdGF0dXMsXHJcbiAgICAgICAgICBwYWdlU2l6ZTogY3R4LnBhZ2VTaXplLFxyXG4gICAgICAgICAgcGFnZU5vOiBjdHgucGFnZU5vXHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICAgICAgICBpZiAocmVzLmVycm9yKSB7XHJcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiByZXMucGF5bG9hZC5tZXNzYWdlLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKChyZXMucGF5bG9hZC5kYXRhIHx8IFtdKS5sZW5ndGggPCBjdHgucGFnZVNpemUpIHtcclxuICAgICAgICAgIGN0eC5oYXNNb3JlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGN0eC5oYXNNb3JlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LiRhcHBseSgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLmxvYWRPcmRlcnMoKTtcclxuICB9XHJcbn1cclxuIl19