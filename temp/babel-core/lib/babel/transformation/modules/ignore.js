"use strict";

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _default = require("./_default");

var _default2 = _interopRequireDefault(_default);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

var IgnoreFormatter = (function (_DefaultFormatter) {
  function IgnoreFormatter() {
    _classCallCheck(this, IgnoreFormatter);

    if (_DefaultFormatter != null) {
      _DefaultFormatter.apply(this, arguments);
    }
  }

  _inherits(IgnoreFormatter, _DefaultFormatter);

  IgnoreFormatter.prototype.exportDeclaration = function exportDeclaration(node, nodes) {
    var declar = t.toStatement(node.declaration, true);
    if (declar) nodes.push(t.inherits(declar, node));
  };

  IgnoreFormatter.prototype.exportAllDeclaration = function exportAllDeclaration() {};

  IgnoreFormatter.prototype.importDeclaration = function importDeclaration() {};

  IgnoreFormatter.prototype.importSpecifier = function importSpecifier() {};

  IgnoreFormatter.prototype.exportSpecifier = function exportSpecifier() {};

  IgnoreFormatter.prototype.transform = function transform() {};

  return IgnoreFormatter;
})(_default2["default"]);

exports["default"] = IgnoreFormatter;
module.exports = exports["default"];