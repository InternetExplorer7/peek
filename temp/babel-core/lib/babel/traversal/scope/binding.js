"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Binding = (function () {
  function Binding(_ref) {
    var existing = _ref.existing;
    var identifier = _ref.identifier;
    var scope = _ref.scope;
    var path = _ref.path;
    var kind = _ref.kind;

    _classCallCheck(this, Binding);

    this.constantViolations = [];
    this.constant = true;

    this.identifier = identifier;
    this.references = 0;
    this.referenced = false;

    this.scope = scope;
    this.path = path;
    this.kind = kind;

    this.hasValue = false;
    this.hasDeoptedValue = false;
    this.value = null;

    this.clearValue();

    if (existing) {
      this.constantViolations = [].concat(existing.path, existing.constantViolations, this.constantViolations);
    }
  }

  /**
   * Description
   */

  Binding.prototype.deoptValue = function deoptValue() {
    this.clearValue();
    this.hasDeoptedValue = true;
  };

  /**
   * Description
   */

  Binding.prototype.setValue = function setValue(value) {
    if (this.hasDeoptedValue) return;
    this.hasValue = true;
    this.value = value;
  };

  /**
   * Description
   */

  Binding.prototype.clearValue = function clearValue() {
    this.hasDeoptedValue = false;
    this.hasValue = false;
    this.value = null;
  };

  /**
   * Description
   */

  Binding.prototype.reassign = function reassign(path) {
    this.constant = false;
    this.constantViolations.push(path);
  };

  /**
   * Description
   */

  Binding.prototype.reference = function reference() {
    this.referenced = true;
    this.references++;
  };

  /**
   * Description
   */

  Binding.prototype.dereference = function dereference() {
    this.references--;
    this.referenced = !!this.references;
  };

  /**
   * Description
   */

  Binding.prototype.isCompatibleWithType = function isCompatibleWithType() {
    return false;
  };

  return Binding;
})();

exports["default"] = Binding;
module.exports = exports["default"];