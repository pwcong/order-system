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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwic2NhbkltZyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImhhbmRsZVNjYW5CdXNpbmVzc0NvZGUiLCJzY2FuQ29kZSIsInN1Y2Nlc3MiLCJyZXMiLCJkaXNwYXRjaCIsInJlc3VsdCIsInRoZW4iLCJlcnJvciIsInNob3dNb2RhbCIsInRpdGxlIiwic2hvd0NhbmNlbCIsImNvbnRlbnQiLCJwYXlsb2FkIiwibWVzc2FnZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJmYWlsIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImV2ZW50cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxlQUFTO0FBREosSyxRQUlQQyxRLEdBQVcsRSxRQUVYQyxPLEdBQVU7QUFDUkMsNEJBRFEsb0NBQ2lCO0FBQ3ZCLHVCQUFLQyxRQUFMLENBQWM7QUFDWkMsaUJBRFksbUJBQ0pDLEdBREksRUFDQztBQUNYLHVDQUNHQyxRQURILENBQ1ksa0NBQW9CRCxJQUFJRSxNQUF4QixDQURaLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ1gsa0JBQUlILElBQUlJLEtBQVIsRUFBZTtBQUNiLCtCQUFLQyxTQUFMLENBQWU7QUFDYkMseUJBQU8sSUFETTtBQUViQyw4QkFBWSxLQUZDO0FBR2JDLDJCQUFTUixJQUFJUyxPQUFKLENBQVlDO0FBSFIsaUJBQWY7QUFLRCxlQU5ELE1BTU87QUFDTCwrQkFBS0MsVUFBTCxDQUFnQjtBQUNkQyx1QkFBSztBQURTLGlCQUFoQjtBQUdEO0FBQ0YsYUFkSDtBQWVELFdBakJXO0FBa0JaQyxjQWxCWSxnQkFrQlBDLEdBbEJPLEVBa0JGO0FBQ1JDLG9CQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDRDtBQXBCVyxTQUFkO0FBc0JEO0FBeEJPLEssUUEyQlZHLE0sR0FBUyxFOzs7Ozs2QkFFQSxDQUFFOzs7O0VBM0NzQixlQUFLQyxJOztrQkFBbkI5QixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuaW1wb3J0IHsgZ2V0U3RvcmUgfSBmcm9tICd3ZXB5LXJlZHV4JztcblxuaW1wb3J0IHsgYXN5bmNTZWFyY2hCdXNpbmVzcyB9IGZyb20gJ0Avc3RvcmUvYWN0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuqvlkbPngrnppJAnXG4gIH07XG4gIGNvbXBvbmVudHMgPSB7fTtcblxuICBtaXhpbnMgPSBbXTtcblxuICBkYXRhID0ge1xuICAgIHNjYW5JbWc6ICcuLi9hc3NldHMvaW1ncy9zY2FuLnBuZydcbiAgfTtcblxuICBjb21wdXRlZCA9IHt9O1xuXG4gIG1ldGhvZHMgPSB7XG4gICAgaGFuZGxlU2NhbkJ1c2luZXNzQ29kZSgpIHtcbiAgICAgIHdlcHkuc2NhbkNvZGUoe1xuICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgIGdldFN0b3JlKClcbiAgICAgICAgICAgIC5kaXNwYXRjaChhc3luY1NlYXJjaEJ1c2luZXNzKHJlcy5yZXN1bHQpKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5lcnJvcikge1xuICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgY29udGVudDogcmVzLnBheWxvYWQubWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvYnVzaW5lc3MnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBldmVudHMgPSB7fTtcblxuICBvbkxvYWQoKSB7fVxufVxuIl19