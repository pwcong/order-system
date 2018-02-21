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
      pages: ['pages/index', 'pages/order', 'pages/home', 'pages/order_details', 'pages/setting', 'pages/business', 'pages/business_info', 'pages/cart', 'pages/recipe', 'pages/login', 'pages/bill'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlIiwidG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImRpc3BhdGNoIiwiY2hlY2tUb2tlbiIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUtBOzs7Ozs7Ozs7O0FBSEEsSUFBTUEsUUFBUSxzQkFBZDtBQUNBLHlCQUFTQSxLQUFUOzs7OztBQXVERSxzQkFBYztBQUFBOztBQUFBOztBQUFBLFVBbERkQyxNQWtEYyxHQWxETDtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxZQUhLLEVBSUwscUJBSkssRUFLTCxlQUxLLEVBTUwsZ0JBTkssRUFPTCxxQkFQSyxFQVFMLFlBUkssRUFTTCxjQVRLLEVBVUwsYUFWSyxFQVdMLFlBWEssQ0FEQTtBQWNQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixTQUZ4QjtBQUdOQyxnQ0FBd0IsTUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BZEQ7O0FBcUJQQyxjQUFRO0FBQ05DLHlCQUFpQixNQURYO0FBRU5DLGVBQU8sTUFGRDtBQUdOQyx1QkFBZSxTQUhUO0FBSU5DLGNBQU0sQ0FDSjtBQUNFQyxvQkFBVSxhQURaO0FBRUVDLGdCQUFNLElBRlI7QUFHRUMsb0JBQVUsdUJBSFo7QUFJRUMsNEJBQWtCO0FBSnBCLFNBREksRUFPSjtBQUNFSCxvQkFBVSxhQURaO0FBRUVDLGdCQUFNLElBRlI7QUFHRUMsb0JBQVUsd0JBSFo7QUFJRUMsNEJBQWtCO0FBSnBCLFNBUEksRUFhSjtBQUNFSCxvQkFBVSxZQURaO0FBRUVDLGdCQUFNLElBRlI7QUFHRUMsb0JBQVUsdUJBSFo7QUFJRUMsNEJBQWtCO0FBSnBCLFNBYkk7QUFKQTtBQXJCRCxLQWtESztBQUFBLFVBRmRDLFVBRWMsR0FGRCxFQUVDOztBQUVaLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBRlk7QUFHYjs7OztpQ0FFWTtBQUNYLFVBQU1DLFFBQVEsZUFBS0MsY0FBTCxDQUFvQixPQUFwQixDQUFkOztBQUVBLFVBQUksQ0FBQ0QsS0FBTCxFQUFZO0FBQ1Y7QUFDRDs7QUFFRCxpQ0FBV0UsUUFBWCxDQUFvQix5QkFBV0YsS0FBWCxDQUFwQjtBQUNEOzs7K0JBRVU7QUFDVCxXQUFLRyxVQUFMO0FBQ0Q7Ozs7RUFwRTBCLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XG5cbmltcG9ydCB7IHNldFN0b3JlLCBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnO1xuaW1wb3J0IGNvbmZpZ1N0b3JlIGZyb20gJy4vc3RvcmUnO1xuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ1N0b3JlKCk7XG5zZXRTdG9yZShzdG9yZSk7XG5cbmltcG9ydCB7IGFzeW5jQ2hlY2sgfSBmcm9tICdAL3N0b3JlL2FjdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL29yZGVyJyxcbiAgICAgICdwYWdlcy9ob21lJyxcbiAgICAgICdwYWdlcy9vcmRlcl9kZXRhaWxzJyxcbiAgICAgICdwYWdlcy9zZXR0aW5nJyxcbiAgICAgICdwYWdlcy9idXNpbmVzcycsXG4gICAgICAncGFnZXMvYnVzaW5lc3NfaW5mbycsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvcmVjaXBlJyxcbiAgICAgICdwYWdlcy9sb2dpbicsXG4gICAgICAncGFnZXMvYmlsbCdcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjNDdCMjQ4JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuqvlkbPngrnppJAnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH0sXG5cbiAgICB0YWJCYXI6IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgY29sb3I6ICcjMzMzJyxcbiAgICAgIHNlbGVjdGVkQ29sb3I6ICcjNDdCMjQ4JyxcbiAgICAgIGxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaW5kZXgnLFxuICAgICAgICAgIHRleHQ6ICfpppbpobUnLFxuICAgICAgICAgIGljb25QYXRoOiAnYXNzZXRzL2ljb25zL2hvbWUucG5nJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnYXNzZXRzL2ljb25zL2hvbWVfZmlsbC5wbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL29yZGVyJyxcbiAgICAgICAgICB0ZXh0OiAn6K6i5Y2VJyxcbiAgICAgICAgICBpY29uUGF0aDogJ2Fzc2V0cy9pY29ucy9vcmRlci5wbmcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdhc3NldHMvaWNvbnMvb3JkZXJfZmlsbC5wbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2hvbWUnLFxuICAgICAgICAgIHRleHQ6ICfkuKrkuronLFxuICAgICAgICAgIGljb25QYXRoOiAnYXNzZXRzL2ljb25zL3VzZXIucG5nJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnYXNzZXRzL2ljb25zL3VzZXJfZmlsbC5wbmcnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH07XG5cbiAgZ2xvYmFsRGF0YSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKTtcbiAgfVxuXG4gIGNoZWNrVG9rZW4oKSB7XG4gICAgY29uc3QgdG9rZW4gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpO1xuXG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGdldFN0b3JlKCkuZGlzcGF0Y2goYXN5bmNDaGVjayh0b2tlbikpO1xuICB9XG5cbiAgb25MYXVuY2goKSB7XG4gICAgdGhpcy5jaGVja1Rva2VuKCk7XG4gIH1cbn1cbiJdfQ==