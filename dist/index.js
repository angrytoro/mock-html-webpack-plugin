'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MockHtml = function () {
  function MockHtml() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { data: {} };

    _classCallCheck(this, MockHtml);

    this.options = options;
  }

  _createClass(MockHtml, [{
    key: 'mock',
    value: function mock(tpl, data) {
      return tpl.replace(/\${([^\${}]+)}/g, function ($0, $1) {
        return _typeof(data[$1]) === 'object' && data[$1] ? JSON.stringify(data[$1]) : data[$1];
      });
    }
  }, {
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function (data, cb) {
          data.html = _this.mock(data.html, _this.options.data);
          cb(null, data);
        });
      });
    }
  }]);

  return MockHtml;
}();

exports.default = MockHtml;
module.exports = exports['default'];