'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _config = require('./../const/config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = (_dec = (0, _wepyRedux.connect)({
  userId: function userId(state) {
    return state.user.id;
  },
  userCheck: function userCheck(state) {
    return state.user.check;
  },
  userNickname: function userNickname(state) {
    return state.user.userInfo.nickname;
  },
  userIntro: function userIntro(state) {
    return state.user.userInfo.intro || '没有自我介绍~';
  },
  userSex: function userSex(state) {
    return state.user.userInfo.sex || 0;
  },
  userAvatar: function userAvatar(state) {
    var avatar = state.user.userInfo.avatar;


    return avatar ? _config.BASE_API + avatar : '/assets/imgs/avatar.png';
  }
}, {}), _dec(_class = function (_wepy$page) {
  _inherits(Home, _wepy$page);

  function Home() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '个人中心'
    }, _this.components = {}, _this.mixins = [], _this.data = {}, _this.computed = {}, _this.methods = {
      handle2Login: function handle2Login() {
        if (this.userCheck) {
          return;
        }

        _wepy2.default.navigateTo({
          url: '/pages/login'
        });
      },
      handle2Setting: function handle2Setting() {
        _wepy2.default.navigateTo({
          url: '/pages/setting'
        });
      },
      handle2Bill: function handle2Bill() {
        _wepy2.default.showModal({
          showCancel: false,
          title: '提示',
          content: '账单页正在建设中/(ㄒoㄒ)/~~'
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Home, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Home;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/home'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsInVzZXJJZCIsInN0YXRlIiwidXNlciIsImlkIiwidXNlckNoZWNrIiwiY2hlY2siLCJ1c2VyTmlja25hbWUiLCJ1c2VySW5mbyIsIm5pY2tuYW1lIiwidXNlckludHJvIiwiaW50cm8iLCJ1c2VyU2V4Iiwic2V4IiwidXNlckF2YXRhciIsImF2YXRhciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImhhbmRsZTJMb2dpbiIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJoYW5kbGUyU2V0dGluZyIsImhhbmRsZTJCaWxsIiwic2hvd01vZGFsIiwic2hvd0NhbmNlbCIsInRpdGxlIiwiY29udGVudCIsImV2ZW50cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFJQTs7Ozs7Ozs7OztJQTJCcUJBLEksV0F6QnBCLHdCQUNDO0FBQ0VDLFFBREYsa0JBQ1NDLEtBRFQsRUFDZ0I7QUFDWixXQUFPQSxNQUFNQyxJQUFOLENBQVdDLEVBQWxCO0FBQ0QsR0FISDtBQUlFQyxXQUpGLHFCQUlZSCxLQUpaLEVBSW1CO0FBQ2YsV0FBT0EsTUFBTUMsSUFBTixDQUFXRyxLQUFsQjtBQUNELEdBTkg7QUFPRUMsY0FQRix3QkFPZUwsS0FQZixFQU9zQjtBQUNsQixXQUFPQSxNQUFNQyxJQUFOLENBQVdLLFFBQVgsQ0FBb0JDLFFBQTNCO0FBQ0QsR0FUSDtBQVVFQyxXQVZGLHFCQVVZUixLQVZaLEVBVW1CO0FBQ2YsV0FBT0EsTUFBTUMsSUFBTixDQUFXSyxRQUFYLENBQW9CRyxLQUFwQixJQUE2QixTQUFwQztBQUNELEdBWkg7QUFhRUMsU0FiRixtQkFhVVYsS0FiVixFQWFpQjtBQUNiLFdBQU9BLE1BQU1DLElBQU4sQ0FBV0ssUUFBWCxDQUFvQkssR0FBcEIsSUFBMkIsQ0FBbEM7QUFDRCxHQWZIO0FBZ0JFQyxZQWhCRixzQkFnQmFaLEtBaEJiLEVBZ0JvQjtBQUFBLFFBQ1JhLE1BRFEsR0FDR2IsTUFBTUMsSUFBTixDQUFXSyxRQURkLENBQ1JPLE1BRFE7OztBQUdoQixXQUFPQSxTQUFTLG1CQUFXQSxNQUFwQixHQUE2Qix5QkFBcEM7QUFDRDtBQXBCSCxDQURELEVBdUJDLEVBdkJELEM7Ozs7Ozs7Ozs7Ozs7O2tMQTBCQ0MsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTyxFLFFBRVBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyxrQkFEUSwwQkFDTztBQUNiLFlBQUksS0FBS2xCLFNBQVQsRUFBb0I7QUFDbEI7QUFDRDs7QUFFRCx1QkFBS21CLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FUTztBQVVSQyxvQkFWUSw0QkFVUztBQUNmLHVCQUFLRixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BZE87QUFlUkUsaUJBZlEseUJBZU07QUFDWix1QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLHNCQUFZLEtBREM7QUFFYkMsaUJBQU8sSUFGTTtBQUdiQyxtQkFBUztBQUhJLFNBQWY7QUFLRDtBQXJCTyxLLFFBd0JWQyxNLEdBQVMsRTs7Ozs7NkJBRUEsQ0FBRTs7OztFQXRDcUIsZUFBS0MsSTtrQkFBbEJqQyxJIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAnd2VweS1yZWR1eCc7XHJcblxyXG5pbXBvcnQgeyBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnO1xyXG5cclxuaW1wb3J0IHsgQkFTRV9BUEkgfSBmcm9tICdAL2NvbnN0L2NvbmZpZyc7XHJcblxyXG5AY29ubmVjdChcclxuICB7XHJcbiAgICB1c2VySWQoc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLnVzZXIuaWQ7XHJcbiAgICB9LFxyXG4gICAgdXNlckNoZWNrKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyLmNoZWNrO1xyXG4gICAgfSxcclxuICAgIHVzZXJOaWNrbmFtZShzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUudXNlci51c2VySW5mby5uaWNrbmFtZTtcclxuICAgIH0sXHJcbiAgICB1c2VySW50cm8oc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLnVzZXIudXNlckluZm8uaW50cm8gfHwgJ+ayoeacieiHquaIkeS7i+e7jX4nO1xyXG4gICAgfSxcclxuICAgIHVzZXJTZXgoc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLnVzZXIudXNlckluZm8uc2V4IHx8IDA7XHJcbiAgICB9LFxyXG4gICAgdXNlckF2YXRhcihzdGF0ZSkge1xyXG4gICAgICBjb25zdCB7IGF2YXRhciB9ID0gc3RhdGUudXNlci51c2VySW5mbztcclxuXHJcbiAgICAgIHJldHVybiBhdmF0YXIgPyBCQVNFX0FQSSArIGF2YXRhciA6ICcvYXNzZXRzL2ltZ3MvYXZhdGFyLnBuZyc7XHJcbiAgICB9XHJcbiAgfSxcclxuICB7fVxyXG4pXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrkuK3lv4MnXHJcbiAgfTtcclxuICBjb21wb25lbnRzID0ge307XHJcblxyXG4gIG1peGlucyA9IFtdO1xyXG5cclxuICBkYXRhID0ge307XHJcblxyXG4gIGNvbXB1dGVkID0ge307XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBoYW5kbGUyTG9naW4oKSB7XHJcbiAgICAgIGlmICh0aGlzLnVzZXJDaGVjaykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcvcGFnZXMvbG9naW4nXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZTJTZXR0aW5nKCkge1xyXG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJy9wYWdlcy9zZXR0aW5nJ1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGUyQmlsbCgpIHtcclxuICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxyXG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICBjb250ZW50OiAn6LSm5Y2V6aG15q2j5Zyo5bu66K6+5LitLyjjhJJv44SSKS9+fidcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZCgpIHt9XHJcbn1cclxuIl19