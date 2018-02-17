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
      pages: ['pages/business', 'pages/index', 'pages/home', 'pages/order'],
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
    key: 'onLaunch',
    value: function onLaunch() {}
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJzdG9yZSIsImNvbmZpZyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWxEYXRhIiwidXNlIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRLHNCQUFkO0FBQ0EseUJBQVNBLEtBQVQ7Ozs7O0FBeUNFLHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsVUF0Q2RDLE1Bc0NjLEdBdENMO0FBQ1BDLGFBQU8sQ0FBQyxnQkFBRCxFQUFtQixhQUFuQixFQUFrQyxZQUFsQyxFQUFnRCxhQUFoRCxDQURBO0FBRVBDLGNBQVE7QUFDTkMsNkJBQXFCLE9BRGY7QUFFTkMsc0NBQThCLFNBRnhCO0FBR05DLGdDQUF3QixNQUhsQjtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FGRDs7QUFTUEMsY0FBUTtBQUNOQyx5QkFBaUIsTUFEWDtBQUVOQyxlQUFPLE1BRkQ7QUFHTkMsdUJBQWUsU0FIVDtBQUlOQyxjQUFNLENBQ0o7QUFDRUMsb0JBQVUsYUFEWjtBQUVFQyxnQkFBTSxJQUZSO0FBR0VDLG9CQUFVLHVCQUhaO0FBSUVDLDRCQUFrQjtBQUpwQixTQURJLEVBT0o7QUFDRUgsb0JBQVUsYUFEWjtBQUVFQyxnQkFBTSxJQUZSO0FBR0VDLG9CQUFVLHdCQUhaO0FBSUVDLDRCQUFrQjtBQUpwQixTQVBJLEVBYUo7QUFDRUgsb0JBQVUsWUFEWjtBQUVFQyxnQkFBTSxJQUZSO0FBR0VDLG9CQUFVLHVCQUhaO0FBSUVDLDRCQUFrQjtBQUpwQixTQWJJO0FBSkE7QUFURCxLQXNDSztBQUFBLFVBRmRDLFVBRWMsR0FGRCxFQUVDOztBQUVaLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBRlk7QUFHYjs7OzsrQkFFVSxDQUFFOzs7O0VBNUNjLGVBQUtDLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7XG5cbmltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnd2VweS1yZWR1eCc7XG5pbXBvcnQgY29uZmlnU3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IHN0b3JlID0gY29uZmlnU3RvcmUoKTtcbnNldFN0b3JlKHN0b3JlKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBwYWdlczogWydwYWdlcy9idXNpbmVzcycsICdwYWdlcy9pbmRleCcsICdwYWdlcy9ob21lJywgJ3BhZ2VzL29yZGVyJ10sXG4gICAgd2luZG93OiB7XG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyM0N0IyNDgnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S6q+WRs+eCuemkkCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfSxcblxuICAgIHRhYkJhcjoge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXG4gICAgICBjb2xvcjogJyMzMzMnLFxuICAgICAgc2VsZWN0ZWRDb2xvcjogJyM0N0IyNDgnLFxuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9pbmRleCcsXG4gICAgICAgICAgdGV4dDogJ+mmlumhtScsXG4gICAgICAgICAgaWNvblBhdGg6ICdhc3NldHMvaWNvbnMvaG9tZS5wbmcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdhc3NldHMvaWNvbnMvaG9tZV9maWxsLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvb3JkZXInLFxuICAgICAgICAgIHRleHQ6ICforqLljZUnLFxuICAgICAgICAgIGljb25QYXRoOiAnYXNzZXRzL2ljb25zL29yZGVyLnBuZycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2Fzc2V0cy9pY29ucy9vcmRlcl9maWxsLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaG9tZScsXG4gICAgICAgICAgdGV4dDogJ+S4quS6uicsXG4gICAgICAgICAgaWNvblBhdGg6ICdhc3NldHMvaWNvbnMvdXNlci5wbmcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdhc3NldHMvaWNvbnMvdXNlcl9maWxsLnBuZydcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfTtcblxuICBnbG9iYWxEYXRhID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpO1xuICB9XG5cbiAgb25MYXVuY2goKSB7fVxufVxuIl19