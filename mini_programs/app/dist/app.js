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
      pages: ['pages/index', 'pages/home', 'pages/order'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '享味点餐',
        navigationBarTextStyle: 'black'
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
    key: 'onLaunch',
    value: function onLaunch() {}
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRLHNCQUFkO0FBQ0EseUJBQVNBLEtBQVQ7Ozs7O0FBeUNFLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsVUF0Q2RDLE1Bc0NjLEdBdENMO0FBQ1BDLGFBQU8sQ0FBQyxhQUFELEVBQWdCLFlBQWhCLEVBQThCLGFBQTlCLENBREE7QUFFUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsTUFGeEI7QUFHTkMsZ0NBQXdCLE1BSGxCO0FBSU5DLGdDQUF3QjtBQUpsQixPQUZEOztBQVNQQyxjQUFRO0FBQ05DLHlCQUFpQixNQURYO0FBRU5DLGVBQU8sTUFGRDtBQUdOQyx1QkFBZSxTQUhUO0FBSU5DLGNBQU0sQ0FDSjtBQUNFQyxvQkFBVSxhQURaO0FBRUVDLGdCQUFNLElBRlI7QUFHRUMsb0JBQVUsdUJBSFo7QUFJRUMsNEJBQWtCO0FBSnBCLFNBREksRUFPSjtBQUNFSCxvQkFBVSxhQURaO0FBRUVDLGdCQUFNLElBRlI7QUFHRUMsb0JBQVUsd0JBSFo7QUFJRUMsNEJBQWtCO0FBSnBCLFNBUEksRUFhSjtBQUNFSCxvQkFBVSxZQURaO0FBRUVDLGdCQUFNLElBRlI7QUFHRUMsb0JBQVUsdUJBSFo7QUFJRUMsNEJBQWtCO0FBSnBCLFNBYkk7QUFKQTtBQVRELEtBc0NLO0FBQUEsVUFGZEMsVUFFYyxHQUZELEVBRUM7O0FBRVosVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFGWTtBQUdiOzs7OytCQUVVLENBQUU7Ozs7RUE1Q2MsZUFBS0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcblxuaW1wb3J0IHsgc2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4JztcbmltcG9ydCBjb25maWdTdG9yZSBmcm9tICcuL3N0b3JlJztcblxuY29uc3Qgc3RvcmUgPSBjb25maWdTdG9yZSgpO1xuc2V0U3RvcmUoc3RvcmUpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbJ3BhZ2VzL2luZGV4JywgJ3BhZ2VzL2hvbWUnLCAncGFnZXMvb3JkZXInXSxcbiAgICB3aW5kb3c6IHtcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdsaWdodCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Lqr5ZGz54K56aSQJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaydcbiAgICB9LFxuXG4gICAgdGFiQmFyOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIGNvbG9yOiAnIzMzMycsXG4gICAgICBzZWxlY3RlZENvbG9yOiAnIzQ3QjI0OCcsXG4gICAgICBsaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2luZGV4JyxcbiAgICAgICAgICB0ZXh0OiAn6aaW6aG1JyxcbiAgICAgICAgICBpY29uUGF0aDogJ2Fzc2V0cy9pY29ucy9ob21lLnBuZycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2Fzc2V0cy9pY29ucy9ob21lX2ZpbGwucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9vcmRlcicsXG4gICAgICAgICAgdGV4dDogJ+iuouWNlScsXG4gICAgICAgICAgaWNvblBhdGg6ICdhc3NldHMvaWNvbnMvb3JkZXIucG5nJyxcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnYXNzZXRzL2ljb25zL29yZGVyX2ZpbGwucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9ob21lJyxcbiAgICAgICAgICB0ZXh0OiAn5Liq5Lq6JyxcbiAgICAgICAgICBpY29uUGF0aDogJ2Fzc2V0cy9pY29ucy91c2VyLnBuZycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2Fzc2V0cy9pY29ucy91c2VyX2ZpbGwucG5nJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9O1xuXG4gIGdsb2JhbERhdGEgPSB7fTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4Jyk7XG4gIH1cblxuICBvbkxhdW5jaCgpIHt9XG59XG4iXX0=