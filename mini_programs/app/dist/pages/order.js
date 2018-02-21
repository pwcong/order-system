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
      var t = order.name.split('&').filter(function (t) {
        return !!t;
      });
      var i = void 0,
          l = t.length,
          rs = [];
      for (i = 0; i < l; i++) {
        var tt = t[i].split('#');
        rs.push(tt[1] + '*' + tt[2]);
      }

      return _extends({}, order, {
        name: rs.join('+'),
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
      navigationBarTitleText: '我的订单'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      loginImg: '/assets/imgs/login.png',
      toolbars: [{ label: '进行中', checked: true, value: [1, 2, 4] }, { label: '已完成', checked: false, value: [3] }, { label: '已取消', checked: false, value: [5] }],
      pageSize: 15,
      pageNo: 1,
      status: [1, 2, 4]
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
      },
      handleLoadMore: function handleLoadMore() {
        console.log('more');
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Order, [{
    key: 'loadOrders',
    value: function loadOrders() {
      var ctx = this;

      (0, _wepyRedux.getStore)().dispatch((0, _actions.asyncGetOrders)({
        token: _wepy2.default.getStorageSync('token'),
        status: ctx.status,
        pageSize: ctx.pageSize,
        pageNo: ctx.pageNo
      })).then(function (res) {
        if (res.error) {
          _wepy2.default.showToast({
            title: res.payload.message,
            icon: 'none'
          });
          return;
        }

        console.log(res);
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.loadOrders();
    }
  }]);

  return Order;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIlNUQVRVU19WQUxVRSIsIk9yZGVyIiwidXNlcklkIiwic3RhdGUiLCJ1c2VyIiwiaWQiLCJ1c2VyQ2hlY2siLCJjaGVjayIsIm9yZGVycyIsIm9yZGVyIiwibWFwIiwidCIsIm5hbWUiLCJzcGxpdCIsImZpbHRlciIsImkiLCJsIiwibGVuZ3RoIiwicnMiLCJ0dCIsInB1c2giLCJqb2luIiwic3RhdHVzVmFsdWUiLCJzdGF0dXMiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJsb2dpbkltZyIsInRvb2xiYXJzIiwibGFiZWwiLCJjaGVja2VkIiwidmFsdWUiLCJwYWdlU2l6ZSIsInBhZ2VObyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImhhbmRsZTJMb2dpbiIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJoYW5kbGVUb29sYmFyQ2hhbmdlIiwiaXRlbSIsImZvckVhY2giLCJoYW5kbGVMb2FkTW9yZSIsImNvbnNvbGUiLCJsb2ciLCJldmVudHMiLCJjdHgiLCJkaXNwYXRjaCIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJzaG93VG9hc3QiLCJ0aXRsZSIsInBheWxvYWQiLCJtZXNzYWdlIiwiaWNvbiIsImxvYWRPcmRlcnMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFHQTs7QUFFQTs7Ozs7Ozs7OztBQUVBLElBQU1BLGVBQWU7QUFDbkIsT0FBSyxJQURjO0FBRW5CLE9BQUssS0FGYztBQUduQixPQUFLLEtBSGM7QUFJbkIsT0FBSyxLQUpjO0FBS25CLE9BQUs7QUFMYyxDQUFyQjs7SUFxQ3FCQyxLLFdBN0JwQix3QkFDQztBQUNFQyxRQURGLGtCQUNTQyxLQURULEVBQ2dCO0FBQ1osV0FBT0EsTUFBTUMsSUFBTixDQUFXQyxFQUFsQjtBQUNELEdBSEg7QUFJRUMsV0FKRixx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QWY7QUFJQTtBQUNEOztBQUVEZCxnQkFBUUMsR0FBUixDQUFZTyxHQUFaO0FBQ0QsT0FuQkg7QUFvQkQ7Ozs2QkFJUTtBQUNQLFdBQUtPLFVBQUw7QUFDRDs7OztFQXZFZ0MsZUFBS0MsSTtrQkFBbkI1RCxLIiwiZmlsZSI6Im9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3dlcHktcmVkdXgnO1xyXG5cclxuaW1wb3J0IHsgZ2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4JztcclxuaW1wb3J0IHsgYXN5bmNHZXRPcmRlcnMgfSBmcm9tICdAL3N0b3JlL2FjdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgQkFTRV9BUEkgfSBmcm9tICdAL2NvbnN0L2NvbmZpZyc7XHJcblxyXG5jb25zdCBTVEFUVVNfVkFMVUUgPSB7XHJcbiAgJzAnOiAn5Y+R6LW3JyxcclxuICAnMSc6ICflt7LmlK/ku5gnLFxyXG4gICcyJzogJ+W3suWujOaIkCcsXHJcbiAgJzMnOiAn5Y+W5raI5LitJyxcclxuICAnNCc6ICflt7Llj5bmtognXHJcbn07XHJcblxyXG5AY29ubmVjdChcclxuICB7XHJcbiAgICB1c2VySWQoc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLnVzZXIuaWQ7XHJcbiAgICB9LFxyXG4gICAgdXNlckNoZWNrKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyLmNoZWNrO1xyXG4gICAgfSxcclxuICAgIG9yZGVycyhzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUub3JkZXIub3JkZXJzLm1hcChvcmRlciA9PiB7XHJcbiAgICAgICAgY29uc3QgdCA9IG9yZGVyLm5hbWUuc3BsaXQoJyYnKS5maWx0ZXIodCA9PiAhIXQpO1xyXG4gICAgICAgIGxldCBpLFxyXG4gICAgICAgICAgbCA9IHQubGVuZ3RoLFxyXG4gICAgICAgICAgcnMgPSBbXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICBsZXQgdHQgPSB0W2ldLnNwbGl0KCcjJyk7XHJcbiAgICAgICAgICBycy5wdXNoKHR0WzFdICsgJyonICsgdHRbMl0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLm9yZGVyLFxyXG4gICAgICAgICAgbmFtZTogcnMuam9pbignKycpLFxyXG4gICAgICAgICAgc3RhdHVzVmFsdWU6IFNUQVRVU19WQUxVRVsnJyArIG9yZGVyLnN0YXR1c11cclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHt9XHJcbilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTorqLljZUnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgbG9naW5JbWc6ICcvYXNzZXRzL2ltZ3MvbG9naW4ucG5nJyxcclxuICAgIHRvb2xiYXJzOiBbXHJcbiAgICAgIHsgbGFiZWw6ICfov5vooYzkuK0nLCBjaGVja2VkOiB0cnVlLCB2YWx1ZTogWzEsIDIsIDRdIH0sXHJcbiAgICAgIHsgbGFiZWw6ICflt7LlrozmiJAnLCBjaGVja2VkOiBmYWxzZSwgdmFsdWU6IFszXSB9LFxyXG4gICAgICB7IGxhYmVsOiAn5bey5Y+W5raIJywgY2hlY2tlZDogZmFsc2UsIHZhbHVlOiBbNV0gfVxyXG4gICAgXSxcclxuICAgIHBhZ2VTaXplOiAxNSxcclxuICAgIHBhZ2VObzogMSxcclxuICAgIHN0YXR1czogWzEsIDIsIDRdXHJcbiAgfTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGhhbmRsZTJMb2dpbigpIHtcclxuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcvcGFnZXMvbG9naW4nXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZVRvb2xiYXJDaGFuZ2UoaXRlbSkge1xyXG4gICAgICB0aGlzLnRvb2xiYXJzLmZvckVhY2godCA9PiB7XHJcbiAgICAgICAgaWYgKHQubGFiZWwgPT09IGl0ZW0ubGFiZWwpIHtcclxuICAgICAgICAgIHQuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHQuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlTG9hZE1vcmUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdtb3JlJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgbG9hZE9yZGVycygpIHtcclxuICAgIGNvbnN0IGN0eCA9IHRoaXM7XHJcblxyXG4gICAgZ2V0U3RvcmUoKVxyXG4gICAgICAuZGlzcGF0Y2goXHJcbiAgICAgICAgYXN5bmNHZXRPcmRlcnMoe1xyXG4gICAgICAgICAgdG9rZW46IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXHJcbiAgICAgICAgICBzdGF0dXM6IGN0eC5zdGF0dXMsXHJcbiAgICAgICAgICBwYWdlU2l6ZTogY3R4LnBhZ2VTaXplLFxyXG4gICAgICAgICAgcGFnZU5vOiBjdHgucGFnZU5vXHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuZXJyb3IpIHtcclxuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5wYXlsb2FkLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGV2ZW50cyA9IHt9O1xyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICB0aGlzLmxvYWRPcmRlcnMoKTtcclxuICB9XHJcbn1cclxuIl19