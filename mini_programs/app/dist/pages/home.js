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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsInVzZXJJZCIsInN0YXRlIiwidXNlciIsImlkIiwidXNlckNoZWNrIiwiY2hlY2siLCJ1c2VyTmlja25hbWUiLCJ1c2VySW5mbyIsIm5pY2tuYW1lIiwidXNlckludHJvIiwiaW50cm8iLCJ1c2VyU2V4Iiwic2V4IiwidXNlckF2YXRhciIsImF2YXRhciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImhhbmRsZTJMb2dpbiIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJoYW5kbGUyU2V0dGluZyIsImV2ZW50cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFJQTs7Ozs7Ozs7OztJQTJCcUJBLEksV0F6QnBCLHdCQUNDO0FBQ0VDLFFBREYsa0JBQ1NDLEtBRFQsRUFDZ0I7QUFDWixXQUFPQSxNQUFNQyxJQUFOLENBQVdDLEVBQWxCO0FBQ0QsR0FISDtBQUlFQyxXQUpGLHFCQUlZSCxLQUpaLEVBSW1CO0FBQ2YsV0FBT0EsTUFBTUMsSUFBTixDQUFXRyxLQUFsQjtBQUNELEdBTkg7QUFPRUMsY0FQRix3QkFPZUwsS0FQZixFQU9zQjtBQUNsQixXQUFPQSxNQUFNQyxJQUFOLENBQVdLLFFBQVgsQ0FBb0JDLFFBQTNCO0FBQ0QsR0FUSDtBQVVFQyxXQVZGLHFCQVVZUixLQVZaLEVBVW1CO0FBQ2YsV0FBT0EsTUFBTUMsSUFBTixDQUFXSyxRQUFYLENBQW9CRyxLQUFwQixJQUE2QixTQUFwQztBQUNELEdBWkg7QUFhRUMsU0FiRixtQkFhVVYsS0FiVixFQWFpQjtBQUNiLFdBQU9BLE1BQU1DLElBQU4sQ0FBV0ssUUFBWCxDQUFvQkssR0FBcEIsSUFBMkIsQ0FBbEM7QUFDRCxHQWZIO0FBZ0JFQyxZQWhCRixzQkFnQmFaLEtBaEJiLEVBZ0JvQjtBQUFBLFFBQ1JhLE1BRFEsR0FDR2IsTUFBTUMsSUFBTixDQUFXSyxRQURkLENBQ1JPLE1BRFE7OztBQUdoQixXQUFPQSxTQUFTLG1CQUFXQSxNQUFwQixHQUE2Qix5QkFBcEM7QUFDRDtBQXBCSCxDQURELEVBdUJDLEVBdkJELEM7Ozs7Ozs7Ozs7Ozs7O2tMQTBCQ0MsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTyxFLFFBRVBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSQyxrQkFEUSwwQkFDTztBQUNiLFlBQUksS0FBS2xCLFNBQVQsRUFBb0I7QUFDbEI7QUFDRDs7QUFFRCx1QkFBS21CLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FUTztBQVVSQyxvQkFWUSw0QkFVUztBQUNmLHVCQUFLRixVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdEO0FBZE8sSyxRQWlCVkUsTSxHQUFTLEU7Ozs7OzZCQUVBLENBQUU7Ozs7RUEvQnFCLGVBQUtDLEk7a0JBQWxCNUIsSSIsImZpbGUiOiJob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5cclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3dlcHktcmVkdXgnO1xyXG5cclxuaW1wb3J0IHsgZ2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4JztcclxuXHJcbmltcG9ydCB7IEJBU0VfQVBJIH0gZnJvbSAnQC9jb25zdC9jb25maWcnO1xyXG5cclxuQGNvbm5lY3QoXHJcbiAge1xyXG4gICAgdXNlcklkKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyLmlkO1xyXG4gICAgfSxcclxuICAgIHVzZXJDaGVjayhzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUudXNlci5jaGVjaztcclxuICAgIH0sXHJcbiAgICB1c2VyTmlja25hbWUoc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLnVzZXIudXNlckluZm8ubmlja25hbWU7XHJcbiAgICB9LFxyXG4gICAgdXNlckludHJvKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyLnVzZXJJbmZvLmludHJvIHx8ICfmsqHmnInoh6rmiJHku4vnu41+JztcclxuICAgIH0sXHJcbiAgICB1c2VyU2V4KHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyLnVzZXJJbmZvLnNleCB8fCAwO1xyXG4gICAgfSxcclxuICAgIHVzZXJBdmF0YXIoc3RhdGUpIHtcclxuICAgICAgY29uc3QgeyBhdmF0YXIgfSA9IHN0YXRlLnVzZXIudXNlckluZm87XHJcblxyXG4gICAgICByZXR1cm4gYXZhdGFyID8gQkFTRV9BUEkgKyBhdmF0YXIgOiAnL2Fzc2V0cy9pbWdzL2F2YXRhci5wbmcnO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAge31cclxuKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJ1xyXG4gIH07XHJcbiAgY29tcG9uZW50cyA9IHt9O1xyXG5cclxuICBtaXhpbnMgPSBbXTtcclxuXHJcbiAgZGF0YSA9IHt9O1xyXG5cclxuICBjb21wdXRlZCA9IHt9O1xyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgaGFuZGxlMkxvZ2luKCkge1xyXG4gICAgICBpZiAodGhpcy51c2VyQ2hlY2spIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2xvZ2luJ1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGUyU2V0dGluZygpIHtcclxuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcvcGFnZXMvc2V0dGluZydcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZXZlbnRzID0ge307XHJcblxyXG4gIG9uTG9hZCgpIHt9XHJcbn1cclxuIl19