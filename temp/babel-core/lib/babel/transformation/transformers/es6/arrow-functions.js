"use strict";

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var visitor = {
  ArrowFunctionExpression: function ArrowFunctionExpression(node) {
    t.ensureBlock(node);

    node.expression = false;
    node.type = "FunctionExpression";
    node.shadow = true;
  }
};
exports.visitor = visitor;