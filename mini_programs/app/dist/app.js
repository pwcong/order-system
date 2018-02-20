'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _wepyRedux = require('./npm/wepy-redux/lib/index.js');

var _store = require('./store/index.js');

var _store2 = _interopRequireDefault(_store);

var _actions = require('./store/actions/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _store2.default)();
(0, _wepyRedux.setStore)(store);

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/order', 'pages/home', 'pages/order_details', 'pages/setting', 'pages/business', 'pages/business_info', 'pages/cart', 'pages/recipe', 'pages/login'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#47B248',
        navigationBarTitleText: '享味点餐',
        navigationBarTextStyle: 'white'
      },

      tabBar: {
        backgroundColor: '#fff',
        color: '#333',
        selectedColor: '#47B248',
        list: [{
          pagePath: 'pages/index',
          text: '首页',
          iconPath: 'assets/icons/home.png',
          selectedIconPath: 'assets/icons/home_fill.png'
        }, {
          pagePath: 'pages/order',
          text: '订单',
          iconPath: 'assets/icons/order.png',
          selectedIconPath: 'assets/icons/order_fill.png'
        }, {
          pagePath: 'pages/home',
          text: '个人',
          iconPath: 'assets/icons/user.png',
          selectedIconPath: 'assets/icons/user_fill.png'
        }]
      }

    };
    _this.globalData = {};

    _this.use('requestfix');
    return _this;
  }

  _createClass(_default, [{
    key: 'checkToken',
    value: function checkToken() {
      var token = _wepy2.default.getStorageSync('token');

      if (!token) {
        return;
      }

      (0, _wepyRedux.getStore)().dispatch((0, _actions.asyncCheck)(token));
    }
  }, {
    key: 'onLaunch',
    value: function onLaunch() {
      this.checkToken();
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlIiwidG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImRpc3BhdGNoIiwiY2hlY2tUb2tlbiIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUtBOzs7Ozs7Ozs7O0FBSEEsSUFBTUEsUUFBUSxzQkFBZDtBQUNBLHlCQUFTQSxLQUFUOzs7OztBQXdERSxzQkFBYztBQUFBOztBQUFBOztBQUFBLFVBbkRkQyxNQW1EYyxHQW5ETDtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxZQUhLLEVBSUwscUJBSkssRUFLTCxlQUxLLEVBTUwsZ0JBTkssRUFPTCxxQkFQSyxFQVFMLFlBUkssRUFTTCxjQVRLLEVBVUwsYUFWSyxDQURBO0FBYVBDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixNQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FiRDs7QUFxQlBDLGNBQVE7QUFDTkMseUJBQWlCLE1BRFg7QUFFTkMsZUFBTyxNQUZEO0FBR05DLHVCQUFlLFNBSFQ7QUFJTkMsY0FBTSxDQUNKO0FBQ0VDLG9CQUFVLGFBRFo7QUFFRUMsZ0JBQU0sSUFGUjtBQUdFQyxvQkFBVSx1QkFIWjtBQUlFQyw0QkFBa0I7QUFKcEIsU0FESSxFQU9KO0FBQ0VILG9CQUFVLGFBRFo7QUFFRUMsZ0JBQU0sSUFGUjtBQUdFQyxvQkFBVSx3QkFIWjtBQUlFQyw0QkFBa0I7QUFKcEIsU0FQSSxFQWFKO0FBQ0VILG9CQUFVLFlBRFo7QUFFRUMsZ0JBQU0sSUFGUjtBQUdFQyxvQkFBVSx1QkFIWjtBQUlFQyw0QkFBa0I7QUFKcEIsU0FiSTtBQUpBOztBQXJCRCxLQW1ESztBQUFBLFVBRmRDLFVBRWMsR0FGRCxFQUVDOztBQUVaLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBRlk7QUFHYjs7OztpQ0FFWTtBQUNYLFVBQU1DLFFBQVEsZUFBS0MsY0FBTCxDQUFvQixPQUFwQixDQUFkOztBQUVBLFVBQUksQ0FBQ0QsS0FBTCxFQUFZO0FBQ1Y7QUFDRDs7QUFFRCxpQ0FBV0UsUUFBWCxDQUFvQix5QkFBV0YsS0FBWCxDQUFwQjtBQUNEOzs7K0JBRVU7QUFDVCxXQUFLRyxVQUFMO0FBQ0Q7Ozs7RUFyRTBCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XG5cbmltcG9ydCB7IHNldFN0b3JlLCBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnO1xuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKCk7XG5zZXRTdG9yZShzdG9yZSk7XG5cbmltcG9ydCB7IGFzeW5jQ2hlY2sgfSBmcm9tICdAL3N0b3JlL2FjdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL29yZGVyJyxcbiAgICAgICdwYWdlcy9ob21lJyxcbiAgICAgICdwYWdlcy9vcmRlcl9kZXRhaWxzJyxcbiAgICAgICdwYWdlcy9zZXR0aW5nJyxcbiAgICAgICdwYWdlcy9idXNpbmVzcycsXG4gICAgICAncGFnZXMvYnVzaW5lc3NfaW5mbycsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvcmVjaXBlJyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzQ3QjI0OCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Lqr5ZGz54K56aSQJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICB9LFxuXG4gICAgXG4gICAgdGFiQmFyOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIGNvbG9yOiAnIzMzMycsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnIzQ3QjI0OCcsXG4gICAgICBsaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgICB0ZXh0OiAn6aaW6aG1JyxcbiAgICAgICAgICBpY29uUGF0aDogJ2Fzc2V0cy9pY29ucy9ob21lLnBuZycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2Fzc2V0cy9pY29ucy9ob21lX2ZpbGwucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9vcmRlcicsXG4gICAgICAgICAgdGV4dDogJ+iuouWNlScsXG4gICAgICAgICAgaWNvblBhdGg6ICdhc3NldHMvaWNvbnMvb3JkZXIucG5nJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnYXNzZXRzL2ljb25zL29yZGVyX2ZpbGwucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9ob21lJyxcbiAgICAgICAgICB0ZXh0OiAn5Liq5Lq6JyxcbiAgICAgICAgICBpY29uUGF0aDogJ2Fzc2V0cy9pY29ucy91c2VyLnBuZycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2Fzc2V0cy9pY29ucy91c2VyX2ZpbGwucG5nJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICAgIFxuICB9O1xuXG4gIGdsb2JhbERhdGEgPSB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4Jyk7XG4gIH1cblxuICBjaGVja1Rva2VuKCkge1xuICAgIGNvbnN0IHRva2VuID0gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKTtcblxuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBnZXRTdG9yZSgpLmRpc3BhdGNoKGFzeW5jQ2hlY2sodG9rZW4pKTtcbiAgfVxuXG4gIG9uTGF1bmNoKCkge1xuICAgIHRoaXMuY2hlY2tUb2tlbigpO1xuICB9XG59XG4iXX0=