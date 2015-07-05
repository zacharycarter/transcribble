if (typeof transcribble === 'undefined') {
  /* global transcribble: true */
  transcribble = function() {};
}

// Default log function sends all arguments to console.
transcribble.L = function(block, args) {
  if (!args) return;
  var line = Array.prototype.slice.call(args).join(" ");
  window.console.log(block + ": " + line);
};

// Default runtime exception.
transcribble.RuntimeError = function(code, message) {
  this.code = code;
  this.message = message;
};
transcribble.RuntimeError.prototype.toString = function() {
  return "RuntimeError: " + this.message;
};

// Shortcut method for `RuntimeError`.
transcribble.RERR = transcribble.RuntimeError;

// UMD to export transcribble.
//
/* global require: false */
/* global define: false */
/* global module: false */
if (typeof require == "function") {
  try {
    module.exports = transcribble;
  } catch (e) {}
} else if (typeof define == "function" && define.amd) {
  define("transcribble", [], function(){ return transcribble; });
} else {
  (this || window)["transcribble"] = transcribble;
}