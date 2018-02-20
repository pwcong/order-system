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
      pages: ['pages/index', 'pages/login', 'pages/order', 'pages/order_details', 'pages/home', 'pages/business', 'pages/business_info', 'pages/cart', 'pages/recipe', 'pages/setting'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlIiwidG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImRpc3BhdGNoIiwiY2hlY2tUb2tlbiIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUtBOzs7Ozs7Ozs7O0FBSEEsSUFBTUEsUUFBUSxzQkFBZDtBQUNBLHlCQUFTQSxLQUFUOzs7OztBQXNERSxzQkFBYztBQUFBOztBQUFBOztBQUFBLFVBakRkQyxNQWlEYyxHQWpETDtBQUNQQyxhQUFPLENBQ0wsYUFESyxFQUVMLGFBRkssRUFHTCxhQUhLLEVBSUwscUJBSkssRUFLTCxZQUxLLEVBTUwsZ0JBTkssRUFPTCxxQkFQSyxFQVFMLFlBUkssRUFTTCxjQVRLLEVBVUwsZUFWSyxDQURBO0FBYVBDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixNQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FiRDs7QUFvQlBDLGNBQVE7QUFDTkMseUJBQWlCLE1BRFg7QUFFTkMsZUFBTyxNQUZEO0FBR05DLHVCQUFlLFNBSFQ7QUFJTkMsY0FBTSxDQUNKO0FBQ0VDLG9CQUFVLGFBRFo7QUFFRUMsZ0JBQU0sSUFGUjtBQUdFQyxvQkFBVSx1QkFIWjtBQUlFQyw0QkFBa0I7QUFKcEIsU0FESSxFQU9KO0FBQ0VILG9CQUFVLGFBRFo7QUFFRUMsZ0JBQU0sSUFGUjtBQUdFQyxvQkFBVSx3QkFIWjtBQUlFQyw0QkFBa0I7QUFKcEIsU0FQSSxFQWFKO0FBQ0VILG9CQUFVLFlBRFo7QUFFRUMsZ0JBQU0sSUFGUjtBQUdFQyxvQkFBVSx1QkFIWjtBQUlFQyw0QkFBa0I7QUFKcEIsU0FiSTtBQUpBO0FBcEJELEtBaURLO0FBQUEsVUFGZEMsVUFFYyxHQUZELEVBRUM7O0FBRVosVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFGWTtBQUdiOzs7O2lDQUVZO0FBQ1gsVUFBTUMsUUFBUSxlQUFLQyxjQUFMLENBQW9CLE9BQXBCLENBQWQ7O0FBRUEsVUFBSSxDQUFDRCxLQUFMLEVBQVk7QUFDVjtBQUNEOztBQUVELGlDQUFXRSxRQUFYLENBQW9CLHlCQUFXRixLQUFYLENBQXBCO0FBQ0Q7OzsrQkFFVTtBQUNULFdBQUtHLFVBQUw7QUFDRDs7OztFQW5FMEIsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcblxuaW1wb3J0IHsgc2V0U3RvcmUsIGdldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCc7XG5pbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKTtcbnNldFN0b3JlKHN0b3JlKTtcblxuaW1wb3J0IHsgYXN5bmNDaGVjayB9IGZyb20gJ0Avc3RvcmUvYWN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvbG9naW4nLFxuICAgICAgJ3BhZ2VzL29yZGVyJyxcbiAgICAgICdwYWdlcy9vcmRlcl9kZXRhaWxzJyxcbiAgICAgICdwYWdlcy9ob21lJyxcbiAgICAgICdwYWdlcy9idXNpbmVzcycsXG4gICAgICAncGFnZXMvYnVzaW5lc3NfaW5mbycsXG4gICAgICAncGFnZXMvY2FydCcsXG4gICAgICAncGFnZXMvcmVjaXBlJyxcbiAgICAgICdwYWdlcy9zZXR0aW5nJ1xuICAgIF0sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyM0N0IyNDgnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S6q+WRs+eCuemkkCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcblxuICAgIHRhYkJhcjoge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBjb2xvcjogJyMzMzMnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyM0N0IyNDgnLFxuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgICAgdGV4dDogJ+mmlumhtScsXG4gICAgICAgICAgaWNvblBhdGg6ICdhc3NldHMvaWNvbnMvaG9tZS5wbmcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdhc3NldHMvaWNvbnMvaG9tZV9maWxsLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvb3JkZXInLFxuICAgICAgICAgIHRleHQ6ICforqLljZUnLFxuICAgICAgICAgIGljb25QYXRoOiAnYXNzZXRzL2ljb25zL29yZGVyLnBuZycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2Fzc2V0cy9pY29ucy9vcmRlcl9maWxsLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaG9tZScsXG4gICAgICAgICAgdGV4dDogJ+S4quS6uicsXG4gICAgICAgICAgaWNvblBhdGg6ICdhc3NldHMvaWNvbnMvdXNlci5wbmcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdhc3NldHMvaWNvbnMvdXNlcl9maWxsLnBuZydcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfTtcblxuICBnbG9iYWxEYXRhID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpO1xuICB9XG5cbiAgY2hlY2tUb2tlbigpIHtcbiAgICBjb25zdCB0b2tlbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyk7XG5cbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2V0U3RvcmUoKS5kaXNwYXRjaChhc3luY0NoZWNrKHRva2VuKSk7XG4gIH1cblxuICBvbkxhdW5jaCgpIHtcbiAgICB0aGlzLmNoZWNrVG9rZW4oKTtcbiAgfVxufVxuIl19