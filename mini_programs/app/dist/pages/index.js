'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _actions = require('./../store/actions/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '享味点餐'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      scanImg: '../assets/imgs/scan.png'
    }, _this.computed = {}, _this.methods = {
      handleScanBusinessCode: function handleScanBusinessCode() {
        _wepy2.default.scanCode({
          success: function success(res) {
            (0, _wepyRedux.getStore)().dispatch((0, _actions.asyncSearchBusiness)(res.result)).then(function (res) {
              if (res.error) {
                _wepy2.default.showModal({
                  title: '提示',
                  showCancel: false,
                  content: res.payload.message
                });
              } else {
                _wepy2.default.navigateTo({
                  url: '/pages/business'
                });
              }
            });
          },
          fail: function fail(err) {
            console.log(err);
          }
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwic2NhbkltZyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImhhbmRsZVNjYW5CdXNpbmVzc0NvZGUiLCJzY2FuQ29kZSIsInN1Y2Nlc3MiLCJyZXMiLCJkaXNwYXRjaCIsInJlc3VsdCIsInRoZW4iLCJlcnJvciIsInNob3dNb2RhbCIsInRpdGxlIiwic2hvd0NhbmNlbCIsImNvbnRlbnQiLCJwYXlsb2FkIiwibWVzc2FnZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJmYWlsIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImV2ZW50cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxlQUFTO0FBREosSyxRQUlQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUkMsNEJBRFEsb0NBQ2lCO0FBQ3ZCLHVCQUFLQyxRQUFMLENBQWM7QUFDWkMsaUJBRFksbUJBQ0pDLEdBREksRUFDQztBQUNYLHVDQUNHQyxRQURILENBQ1ksa0NBQW9CRCxJQUFJRSxNQUF4QixDQURaLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ1gsa0JBQUlILElBQUlJLEtBQVIsRUFBZTtBQUNiLCtCQUFLQyxTQUFMLENBQWU7QUFDYkMseUJBQU8sSUFETTtBQUViQyw4QkFBWSxLQUZDO0FBR2JDLDJCQUFTUixJQUFJUyxPQUFKLENBQVlDO0FBSFIsaUJBQWY7QUFLRCxlQU5ELE1BTU87QUFDTCwrQkFBS0MsVUFBTCxDQUFnQjtBQUNkQyx1QkFBSztBQURTLGlCQUFoQjtBQUdEO0FBQ0YsYUFkSDtBQWVELFdBakJXO0FBa0JaQyxjQWxCWSxnQkFrQlBDLEdBbEJPLEVBa0JGO0FBQ1JDLG9CQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDRDtBQXBCVyxTQUFkO0FBc0JEO0FBeEJPLEssUUEyQlZHLE0sR0FBUyxFOzs7Ozs2QkFFQSxDQUFFOzs7O0VBM0NzQixlQUFLQyxJOztrQkFBbkI5QixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5pbXBvcnQgeyBnZXRTdG9yZSB9IGZyb20gJ3dlcHktcmVkdXgnO1xuXG5pbXBvcnQgeyBhc3luY1NlYXJjaEJ1c2luZXNzIH0gZnJvbSAnQC9zdG9yZS9hY3Rpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S6q+WRs+eCuemkkCdcbiAgfTtcbiAgY29tcG9uZW50cyA9IHt9O1xuXG4gIG1peGlucyA9IFtdO1xuXG4gIGRhdGEgPSB7XG4gICAgc2NhbkltZzogJy4uL2Fzc2V0cy9pbWdzL3NjYW4ucG5nJ1xuICB9O1xuXG4gIGNvbXB1dGVkID0ge307XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBoYW5kbGVTY2FuQnVzaW5lc3NDb2RlKCkge1xuICAgICAgd2VweS5zY2FuQ29kZSh7XG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgZ2V0U3RvcmUoKVxuICAgICAgICAgICAgLmRpc3BhdGNoKGFzeW5jU2VhcmNoQnVzaW5lc3MocmVzLnJlc3VsdCkpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiByZXMucGF5bG9hZC5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9idXNpbmVzcydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGV2ZW50cyA9IHt9O1xuXG4gIG9uTG9hZCgpIHt9XG59XG4iXX0=