"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PDFPage = exports.PDFLine = exports.PDFItem = exports.PDFDocument = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @typedef {Object} PDFItem
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {string} str
 */
var PDFItem = /*#__PURE__*/_createClass(
/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {string} str 
 */
function PDFItem(x, y, width, height, str) {
  _classCallCheck(this, PDFItem);
  _defineProperty(this, "x", void 0);
  _defineProperty(this, "y", void 0);
  _defineProperty(this, "width", void 0);
  _defineProperty(this, "height", void 0);
  _defineProperty(this, "str", void 0);
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.str = str;
});
/**
 * @typedef {Object} PDFLine
 * @property {Array<PDFItem>} items
 */
exports.PDFItem = PDFItem;
var PDFLine = /*#__PURE__*/function () {
  /**
   * 
   * @param {number} numPagePDF 
   */
  function PDFLine(numPagePDF) {
    _classCallCheck(this, PDFLine);
    _defineProperty(this, "items", void 0);
    _defineProperty(this, "numPagePDF", void 0);
    this.items = [];
    this.numPagePDF = numPagePDF;
  }

  /**
   * 
   * @param {PDFItem} item 
   */
  _createClass(PDFLine, [{
    key: "addItem",
    value: function addItem(item) {
      this.items.push(item);
    }

    /**
     * @returns {number} the x of the first item
     */
  }, {
    key: "x",
    get: function get() {
      if (this.items.length < 1) {
        return -1;
      }
      return this.items[0].x;
    }

    /**
     * @returns {number} the y of the first item
     */
  }, {
    key: "y",
    get: function get() {
      if (this.items.length < 1) {
        return -1;
      }
      return this.items[0].y;
    }

    /**
     * @returns {string} concatenates the str property of all items separated by a space
     */
  }, {
    key: "text",
    get: function get() {
      var str = "";
      this.items.forEach(function (i) {
        return str += i.str + " ";
      });
      return str.trim();
    }
  }]);
  return PDFLine;
}();
/**
 * @typedef {Object} PDFPage
 * @property {number} num
 * @property {Array<PDFLine>} lines
 */
exports.PDFLine = PDFLine;
var PDFPage = /*#__PURE__*/function () {
  /**
   * 
   * @param {number} numPage 
   */
  function PDFPage(numPage) {
    _classCallCheck(this, PDFPage);
    _defineProperty(this, "num", void 0);
    _defineProperty(this, "lines", void 0);
    this.num = numPage;
    this.lines = [];
  }

  /**
   * 
   * @param {PDFLine} line 
   */
  _createClass(PDFPage, [{
    key: "addLine",
    value: function addLine(line) {
      this.lines.push(line);
    }
  }]);
  return PDFPage;
}();
/**
 * @typedef {Object} PDFDocument
 * @property {number} numPages
 * @property {Array<PDFPage>} pages
 */
exports.PDFPage = PDFPage;
var PDFDocument = /*#__PURE__*/function () {
  function PDFDocument() {
    _classCallCheck(this, PDFDocument);
    _defineProperty(this, "numPages", void 0);
    _defineProperty(this, "pages", void 0);
    this.pages = [];
  }

  /**
   * 
   * @param {PDFPage} page 
   */
  _createClass(PDFDocument, [{
    key: "addPage",
    value: function addPage(page) {
      this.pages.push(page);
    }

    /**
     * @returns {string} all text
     */
  }, {
    key: "text",
    get: function get() {
      return this.pages.flatMap(function (p) {
        return p.lines;
      }).map(function (l) {
        var str = "";
        l.items.forEach(function (i) {
          return str += i.str + " ";
        });
        return str.trim();
      });
    }

    /**
     * Hay que revisarlo
     */
  }, {
    key: "deleteNumPages",
    value: function deleteNumPages() {
      this.pages.forEach(function (p) {
        var lastLine = p.lines.length - 1;
        var lastItem = p.lines[lastLine].items.length - 1;
        if (p.lines[lastLine].items.length == 1 && p.lines[lastLine].items[lastItem].str == p.num) {
          p.lines.pop();
        }
      });
    }
  }]);
  return PDFDocument;
}();
exports.PDFDocument = PDFDocument;