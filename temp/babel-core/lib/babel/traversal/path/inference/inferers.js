"use strict";

exports.__esModule = true;
exports.VariableDeclarator = VariableDeclarator;
exports.TypeCastExpression = TypeCastExpression;
exports.NewExpression = NewExpression;
exports.TemplateLiteral = TemplateLiteral;
exports.UnaryExpression = UnaryExpression;
exports.BinaryExpression = BinaryExpression;
exports.LogicalExpression = LogicalExpression;
exports.ConditionalExpression = ConditionalExpression;
exports.SequenceExpression = SequenceExpression;
exports.AssignmentExpression = AssignmentExpression;
exports.UpdateExpression = UpdateExpression;
exports.Literal = Literal;
exports.ObjectExpression = ObjectExpression;
exports.ArrayExpression = ArrayExpression;
exports.RestElement = RestElement;
exports.CallExpression = CallExpression;
exports.TaggedTemplateExpression = TaggedTemplateExpression;

function _interopRequire(obj) { return obj && obj.__esModule ? obj["default"] : obj; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var _infererReference = require("./inferer-reference");

exports.Identifier = _interopRequire(_infererReference);

//

function VariableDeclarator() {
  var id = this.get("id");

  if (id.isIdentifier()) {
    return this.get("init").getTypeAnnotation();
  } else {
    return;
  }
}

//

function TypeCastExpression(node) {
  return node.typeAnnotation;
}

TypeCastExpression.validParent = true;

//

function NewExpression(node) {
  if (this.get("callee").isIdentifier()) {
    // only resolve identifier callee
    return t.genericTypeAnnotation(node.callee);
  }
}

//

function TemplateLiteral() {
  return t.stringTypeAnnotation();
}

//

function UnaryExpression(node) {
  var operator = node.operator;

  if (operator === "void") {
    return t.voidTypeAnnotation();
  } else if (t.NUMBER_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t.numberTypeAnnotation();
  } else if (t.STRING_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t.stringTypeAnnotation();
  } else if (t.BOOLEAN_UNARY_OPERATORS.indexOf(operator) >= 0) {
    return t.booleanTypeAnnotation();
  }
}

//

function BinaryExpression(node) {
  var operator = node.operator;

  if (t.NUMBER_BINARY_OPERATORS.indexOf(operator) >= 0) {
    return t.numberTypeAnnotation();
  } else if (t.BOOLEAN_BINARY_OPERATORS.indexOf(operator) >= 0) {
    return t.booleanTypeAnnotation();
  } else if (operator === "+") {
    var right = this.get("right");
    var left = this.get("left");

    if (left.isBaseType("number") && right.isBaseType("number")) {
      // both numbers so this will be a number
      return t.numberTypeAnnotation();
    } else if (left.isBaseType("string") || right.isBaseType("string")) {
      // one is a string so the result will be a string
      return t.stringTypeAnnotation();
    }

    // unsure if left and right are strings or numbers so stay on the safe side
    return t.unionTypeAnnotation([t.stringTypeAnnotation(), t.numberTypeAnnotation()]);
  }
}

//

function LogicalExpression() {
  return t.createUnionTypeAnnotation([this.get("left").getTypeAnnotation(), this.get("right").getTypeAnnotation()]);
}

//

function ConditionalExpression() {
  return t.createUnionTypeAnnotation([this.get("consequent").getTypeAnnotation(), this.get("alternate").getTypeAnnotation()]);
}

//

function SequenceExpression(node) {
  return this.get("expressions").pop().getTypeAnnotation();
}

//

function AssignmentExpression(node) {
  return this.get("right").getTypeAnnotation();
}

//

function UpdateExpression(node) {
  var operator = node.operator;
  if (operator === "++" || operator === "--") {
    return t.numberTypeAnnotation();
  }
}

//

function Literal(node) {
  var value = node.value;
  if (typeof value === "string") return t.stringTypeAnnotation();
  if (typeof value === "number") return t.numberTypeAnnotation();
  if (typeof value === "boolean") return t.booleanTypeAnnotation();
  if (value === null) return t.voidTypeAnnotation();
  if (node.regex) return t.genericTypeAnnotation(t.identifier("RegExp"));
}

//

function ObjectExpression() {
  return t.genericTypeAnnotation(t.identifier("Object"));
}

//

function ArrayExpression() {
  return t.genericTypeAnnotation(t.identifier("Array"));
}

//

function RestElement() {
  return ArrayExpression();
}

RestElement.validParent = true;

//

function Func() {
  return t.genericTypeAnnotation(t.identifier("Function"));
}

exports.Function = Func;
exports.Class = Func;

//

function CallExpression() {
  return resolveCall(this.get("callee"));
}

function TaggedTemplateExpression() {
  return resolveCall(this.get("tag"));
}

function resolveCall(callee) {
  callee = callee.resolve();

  if (callee.isFunction()) {
    if (callee.is("async")) {
      if (callee.is("generator")) {
        return t.genericTypeAnnotation(t.identifier("AsyncIterator"));
      } else {
        return t.genericTypeAnnotation(t.identifier("Promise"));
      }
    } else {
      if (callee.node.returnType) {
        return callee.node.returnType;
      } else {}
    }
  }
}

// todo: get union type of all return arguments