"use strict";

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _pluginPass = require("./plugin-pass");

var _pluginPass2 = _interopRequireDefault(_pluginPass);

var _messages = require("../messages");

var messages = _interopRequireWildcard(_messages);

var _lodashLangIsFunction = require("lodash/lang/isFunction");

var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

var _traversal = require("../traversal");

var _traversal2 = _interopRequireDefault(_traversal);

var _lodashObjectAssign = require("lodash/object/assign");

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var _lodashLangClone = require("lodash/lang/clone");

var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);

var _file = require("./file");

var _file2 = _interopRequireDefault(_file);

var Plugin = (function () {
  function Plugin(key, plugin) {
    _classCallCheck(this, Plugin);

    plugin = (0, _lodashObjectAssign2["default"])({}, plugin);

    var take = function take(key) {
      var val = plugin[key];
      delete plugin[key];
      return val;
    };

    this.manipulateOptions = take("manipulateOptions");
    this.metadata = take("metadata") || {};
    this.dependencies = this.metadata.dependencies || [];
    this.post = take("post");
    this.pre = take("pre");

    //

    if (this.metadata.stage != null) {
      this.metadata.optional = true;
    }

    //

    this.visitor = this.normalize((0, _lodashLangClone2["default"])(take("visitor")) || {});
    this.key = key;
  }

  Plugin.prototype.normalize = function normalize(visitor) {
    if ((0, _lodashLangIsFunction2["default"])(visitor)) {
      visitor = { ast: visitor };
    }

    _traversal2["default"].explode(visitor);

    return visitor;
  };

  Plugin.prototype.buildPass = function buildPass(file) {
    // validate Transformer instance
    if (!(file instanceof _file2["default"])) {
      throw new TypeError(messages.get("pluginNotFile", this.key));
    }

    return new _pluginPass2["default"](file, this);
  };

  return Plugin;
})();

exports["default"] = Plugin;
module.exports = exports["default"];