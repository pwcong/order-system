'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Order = (_dec = (0, _wepyRedux.connect)({
  userId: function userId(state) {
    return state.user.id;
  },
  userCheck: function userCheck(state) {
    return state.user.check;
  },
  orders: function orders(state) {
    return state.order.orders;
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
      toolbars: [{ label: '进行中', checked: true, value: [1, 2, 4] }, { label: '已完成', checked: false, value: [3] }, { label: '已取消', checked: false, value: [5] }]
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
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Order;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwidXNlcklkIiwic3RhdGUiLCJ1c2VyIiwiaWQiLCJ1c2VyQ2hlY2siLCJjaGVjayIsIm9yZGVycyIsIm9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwibG9naW5JbWciLCJ0b29sYmFycyIsImxhYmVsIiwiY2hlY2tlZCIsInZhbHVlIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiaGFuZGxlMkxvZ2luIiwibmF2aWdhdGVUbyIsInVybCIsImhhbmRsZVRvb2xiYXJDaGFuZ2UiLCJpdGVtIiwiZm9yRWFjaCIsInQiLCJoYW5kbGVMb2FkTW9yZSIsImNvbnNvbGUiLCJsb2ciLCJldmVudHMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFrQnFCQSxLLFdBZHBCLHdCQUNDO0FBQ0VDLFFBREYsa0JBQ1NDLEtBRFQsRUFDZ0I7QUFDWixXQUFPQSxNQUFNQyxJQUFOLENBQVdDLEVBQWxCO0FBQ0QsR0FISDtBQUlFQyxXQUpGLHFCQUlZSCxLQUpaLEVBSW1CO0FBQ2YsV0FBT0EsTUFBTUMsSUFBTixDQUFXRyxLQUFsQjtBQUNELEdBTkg7QUFPRUMsUUFQRixrQkFPU0wsS0FQVCxFQU9nQjtBQUNaLFdBQU9BLE1BQU1NLEtBQU4sQ0FBWUQsTUFBbkI7QUFDRDtBQVRILENBREQsRUFZQyxFQVpELEM7Ozs7Ozs7Ozs7Ozs7O29MQWVDRSxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLHdCQURMO0FBRUxDLGdCQUFVLENBQ1IsRUFBRUMsT0FBTyxLQUFULEVBQWdCQyxTQUFTLElBQXpCLEVBQStCQyxPQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQXRDLEVBRFEsRUFFUixFQUFFRixPQUFPLEtBQVQsRUFBZ0JDLFNBQVMsS0FBekIsRUFBZ0NDLE9BQU8sQ0FBQyxDQUFELENBQXZDLEVBRlEsRUFHUixFQUFFRixPQUFPLEtBQVQsRUFBZ0JDLFNBQVMsS0FBekIsRUFBZ0NDLE9BQU8sQ0FBQyxDQUFELENBQXZDLEVBSFE7QUFGTCxLLFFBU1BDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyxrQkFEUSwwQkFDTztBQUNiLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BTE87QUFNUkMseUJBTlEsK0JBTVlDLElBTlosRUFNa0I7QUFDeEIsYUFBS1YsUUFBTCxDQUFjVyxPQUFkLENBQXNCLGFBQUs7QUFDekIsY0FBSUMsRUFBRVgsS0FBRixLQUFZUyxLQUFLVCxLQUFyQixFQUE0QjtBQUMxQlcsY0FBRVYsT0FBRixHQUFZLElBQVo7QUFDRCxXQUZELE1BRU87QUFDTFUsY0FBRVYsT0FBRixHQUFZLEtBQVo7QUFDRDtBQUNGLFNBTkQ7QUFPRCxPQWRPO0FBZVJXLG9CQWZRLDRCQWVRO0FBQ2RDLGdCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNEO0FBakJPLEssUUFvQlZDLE0sR0FBUyxFOzs7Ozs2QkFFQSxDQUFFOzs7O0VBekNzQixlQUFLQyxJO2tCQUFuQmhDLEsiLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAnd2VweS1yZWR1eCc7XHJcblxyXG5pbXBvcnQgeyBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnO1xyXG5cclxuQGNvbm5lY3QoXHJcbiAge1xyXG4gICAgdXNlcklkKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyLmlkO1xyXG4gICAgfSxcclxuICAgIHVzZXJDaGVjayhzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUudXNlci5jaGVjaztcclxuICAgIH0sXHJcbiAgICBvcmRlcnMoc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLm9yZGVyLm9yZGVycztcclxuICAgIH1cclxuICB9LFxyXG4gIHt9XHJcbilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTorqLljZUnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgbG9naW5JbWc6ICcvYXNzZXRzL2ltZ3MvbG9naW4ucG5nJyxcclxuICAgIHRvb2xiYXJzOiBbXHJcbiAgICAgIHsgbGFiZWw6ICfov5vooYzkuK0nLCBjaGVja2VkOiB0cnVlLCB2YWx1ZTogWzEsIDIsIDRdIH0sXHJcbiAgICAgIHsgbGFiZWw6ICflt7LlrozmiJAnLCBjaGVja2VkOiBmYWxzZSwgdmFsdWU6IFszXSB9LFxyXG4gICAgICB7IGxhYmVsOiAn5bey5Y+W5raIJywgY2hlY2tlZDogZmFsc2UsIHZhbHVlOiBbNV0gfVxyXG4gICAgXVxyXG4gIH07XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBoYW5kbGUyTG9naW4oKSB7XHJcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2xvZ2luJ1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVUb29sYmFyQ2hhbmdlKGl0ZW0pIHtcclxuICAgICAgdGhpcy50b29sYmFycy5mb3JFYWNoKHQgPT4ge1xyXG4gICAgICAgIGlmICh0LmxhYmVsID09PSBpdGVtLmxhYmVsKSB7XHJcbiAgICAgICAgICB0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0LmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZUxvYWRNb3JlKCl7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdtb3JlJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZCgpIHt9XHJcbn1cclxuIl19