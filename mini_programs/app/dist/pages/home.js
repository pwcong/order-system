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

var _actions = require('./../store/actions/index.js');

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
  userBalance: function userBalance(state) {
    return state.user.balance;
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
    key: 'loadBalance',
    value: function loadBalance() {
      (0, _wepyRedux.getStore)().dispatch((0, _actions.asyncQueryBalance)(_wepy2.default.getStorageSync('token'))).then(function (res) {
        if (res.error) {
          _wepy2.default.showToast({
            icon: 'none',
            title: res.payload.message
          });
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.loadBalance();
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Home;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Home , 'pages/home'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZSIsInVzZXJJZCIsInN0YXRlIiwidXNlciIsImlkIiwidXNlckNoZWNrIiwiY2hlY2siLCJ1c2VyQmFsYW5jZSIsImJhbGFuY2UiLCJ1c2VyTmlja25hbWUiLCJ1c2VySW5mbyIsIm5pY2tuYW1lIiwidXNlckludHJvIiwiaW50cm8iLCJ1c2VyU2V4Iiwic2V4IiwidXNlckF2YXRhciIsImF2YXRhciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImhhbmRsZTJMb2dpbiIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJoYW5kbGUyU2V0dGluZyIsImhhbmRsZTJCaWxsIiwic2hvd01vZGFsIiwic2hvd0NhbmNlbCIsInRpdGxlIiwiY29udGVudCIsImV2ZW50cyIsImRpc3BhdGNoIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0aGVuIiwicmVzIiwiZXJyb3IiLCJzaG93VG9hc3QiLCJpY29uIiwicGF5bG9hZCIsIm1lc3NhZ2UiLCJsb2FkQmFsYW5jZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7QUFJQTs7QUFFQTs7Ozs7Ozs7OztJQThCcUJBLEksV0E1QnBCLHdCQUNDO0FBQ0VDLFFBREYsa0JBQ1NDLEtBRFQsRUFDZ0I7QUFDWixXQUFPQSxNQUFNQyxJQUFOLENBQVdDLEVBQWxCO0FBQ0QsR0FISDtBQUlFQyxXQUpGLHFCQUlZSCxLQUpaLEVBSW1CO0FBQ2YsV0FBT0EsTUFBTUMsSUFBTixDQUFXRyxLQUFsQjtBQUNELEdBTkg7QUFPRUMsYUFQRix1QkFPY0wsS0FQZCxFQU9xQjtBQUNqQixXQUFPQSxNQUFNQyxJQUFOLENBQVdLLE9BQWxCO0FBQ0QsR0FUSDtBQVVFQyxjQVZGLHdCQVVlUCxLQVZmLEVBVXNCO0FBQ2xCLFdBQU9BLE1BQU1DLElBQU4sQ0FBV08sUUFBWCxDQUFvQkMsUUFBM0I7QUFDRCxHQVpIO0FBYUVDLFdBYkYscUJBYVlWLEtBYlosRUFhbUI7QUFDZixXQUFPQSxNQUFNQyxJQUFOLENBQVdPLFFBQVgsQ0FBb0JHLEtBQXBCLElBQTZCLFNBQXBDO0FBQ0QsR0FmSDtBQWdCRUMsU0FoQkYsbUJBZ0JVWixLQWhCVixFQWdCaUI7QUFDYixXQUFPQSxNQUFNQyxJQUFOLENBQVdPLFFBQVgsQ0FBb0JLLEdBQXBCLElBQTJCLENBQWxDO0FBQ0QsR0FsQkg7QUFtQkVDLFlBbkJGLHNCQW1CYWQsS0FuQmIsRUFtQm9CO0FBQUEsUUFDUmUsTUFEUSxHQUNHZixNQUFNQyxJQUFOLENBQVdPLFFBRGQsQ0FDUk8sTUFEUTs7O0FBR2hCLFdBQU9BLFNBQVMsbUJBQVdBLE1BQXBCLEdBQTZCLHlCQUFwQztBQUNEO0FBdkJILENBREQsRUEwQkMsRUExQkQsQzs7Ozs7Ozs7Ozs7Ozs7a0xBNkJDQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPLEUsUUFFUEMsUSxHQUFXLEUsUUFFWEMsTyxHQUFVO0FBQ1JDLGtCQURRLDBCQUNPO0FBQ2IsWUFBSSxLQUFLcEIsU0FBVCxFQUFvQjtBQUNsQjtBQUNEOztBQUVELHVCQUFLcUIsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQVRPO0FBVVJDLG9CQVZRLDRCQVVTO0FBQ2YsdUJBQUtGLFVBQUwsQ0FBZ0I7QUFDZEMsZUFBSztBQURTLFNBQWhCO0FBR0QsT0FkTztBQWVSRSxpQkFmUSx5QkFlTTtBQUNaLHVCQUFLQyxTQUFMLENBQWU7QUFDYkMsc0JBQVksS0FEQztBQUViQyxpQkFBTyxJQUZNO0FBR2JDLG1CQUFTO0FBSEksU0FBZjtBQUtEO0FBckJPLEssUUF3QlZDLE0sR0FBUyxFOzs7OztrQ0FFSztBQUNaLGlDQUNHQyxRQURILENBQ1ksZ0NBQWtCLGVBQUtDLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBbEIsQ0FEWixFQUVHQyxJQUZILENBRVEsZUFBTztBQUNYLFlBQUlDLElBQUlDLEtBQVIsRUFBZTtBQUNiLHlCQUFLQyxTQUFMLENBQWU7QUFDYkMsa0JBQU0sTUFETztBQUViVCxtQkFBT00sSUFBSUksT0FBSixDQUFZQztBQUZOLFdBQWY7QUFJRDtBQUNGLE9BVEg7QUFVRDs7OzZCQUVRO0FBQ1AsV0FBS0MsV0FBTDtBQUNEOzs7NkJBRVEsQ0FBRTs7OztFQXZEcUIsZUFBS0MsSTtrQkFBbEI3QyxJIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAnd2VweS1yZWR1eCc7XHJcblxyXG5pbXBvcnQgeyBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnO1xyXG5cclxuaW1wb3J0IHsgQkFTRV9BUEkgfSBmcm9tICdAL2NvbnN0L2NvbmZpZyc7XHJcblxyXG5pbXBvcnQgeyBhc3luY1F1ZXJ5QmFsYW5jZSB9IGZyb20gJ0Avc3RvcmUvYWN0aW9ucyc7XHJcblxyXG5AY29ubmVjdChcclxuICB7XHJcbiAgICB1c2VySWQoc3RhdGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlLnVzZXIuaWQ7XHJcbiAgICB9LFxyXG4gICAgdXNlckNoZWNrKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyLmNoZWNrO1xyXG4gICAgfSxcclxuICAgIHVzZXJCYWxhbmNlKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyLmJhbGFuY2U7XHJcbiAgICB9LFxyXG4gICAgdXNlck5pY2tuYW1lKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS51c2VyLnVzZXJJbmZvLm5pY2tuYW1lO1xyXG4gICAgfSxcclxuICAgIHVzZXJJbnRybyhzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUudXNlci51c2VySW5mby5pbnRybyB8fCAn5rKh5pyJ6Ieq5oiR5LuL57uNfic7XHJcbiAgICB9LFxyXG4gICAgdXNlclNleChzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUudXNlci51c2VySW5mby5zZXggfHwgMDtcclxuICAgIH0sXHJcbiAgICB1c2VyQXZhdGFyKHN0YXRlKSB7XHJcbiAgICAgIGNvbnN0IHsgYXZhdGFyIH0gPSBzdGF0ZS51c2VyLnVzZXJJbmZvO1xyXG5cclxuICAgICAgcmV0dXJuIGF2YXRhciA/IEJBU0VfQVBJICsgYXZhdGFyIDogJy9hc3NldHMvaW1ncy9hdmF0YXIucG5nJztcclxuICAgIH1cclxuICB9LFxyXG4gIHt9XHJcbilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quS6uuS4reW/gydcclxuICB9O1xyXG4gIGNvbXBvbmVudHMgPSB7fTtcclxuXHJcbiAgbWl4aW5zID0gW107XHJcblxyXG4gIGRhdGEgPSB7fTtcclxuXHJcbiAgY29tcHV0ZWQgPSB7fTtcclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGhhbmRsZTJMb2dpbigpIHtcclxuICAgICAgaWYgKHRoaXMudXNlckNoZWNrKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJy9wYWdlcy9sb2dpbidcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlMlNldHRpbmcoKSB7XHJcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnL3BhZ2VzL3NldHRpbmcnXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGhhbmRsZTJCaWxsKCkge1xyXG4gICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXHJcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfotKbljZXpobXmraPlnKjlu7rorr7kuK0vKOOEkm/jhJIpL35+J1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBldmVudHMgPSB7fTtcclxuXHJcbiAgbG9hZEJhbGFuY2UoKSB7XHJcbiAgICBnZXRTdG9yZSgpXHJcbiAgICAgIC5kaXNwYXRjaChhc3luY1F1ZXJ5QmFsYW5jZSh3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpKSlcclxuICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLmVycm9yKSB7XHJcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgdGl0bGU6IHJlcy5wYXlsb2FkLm1lc3NhZ2VcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLmxvYWRCYWxhbmNlKCk7XHJcbiAgfVxyXG5cclxuICBvbkxvYWQoKSB7fVxyXG59XHJcbiJdfQ==