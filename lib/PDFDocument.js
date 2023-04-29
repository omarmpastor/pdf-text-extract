/**
 * @typedef {Object} PDFItem
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {string} str
 */
class PDFItem {
  x;
  y;
  width;
  height;
  str;

  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   * @param {string} str 
   */
  constructor(x, y, width, height, str) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.str = str;
  }
}

/**
 * @typedef {Object} PDFLine
 * @property {Array<PDFItem>} items
 */
class PDFLine {
  items;
  numPagePDF;
  /**
   * 
   * @param {number} numPagePDF 
   */
  constructor(numPagePDF) {
    this.items = [];
    this.numPagePDF = numPagePDF;
  }

  /**
   * 
   * @param {PDFItem} item 
   */
  addItem(item) {
    this.items.push(item);
  }

  /**
   * @returns {number} the x of the first item
   */
  get x() {
    if (this.items.length < 1) {
      return -1;
    }
    return this.items[0].x;
  }

  /**
   * @returns {number} the y of the first item
   */
  get y() {
    if (this.items.length < 1) {
      return -1;
    }
    return this.items[0].y;
  }

  /**
   * @returns {string} concatenates the str property of all items separated by a space
   */
  get text() {
    let str = "";
    this.items.forEach(i => str += i.str + " ");
    return str.trim();
  }
}

/**
 * @typedef {Object} PDFPage
 * @property {number} num
 * @property {Array<PDFLine>} lines
 */
class PDFPage {
  num;
  lines;

  /**
   * 
   * @param {number} numPage 
   */
  constructor(numPage) {
    this.num = numPage;
    this.lines = [];
  }

  /**
   * 
   * @param {PDFLine} line 
   */
  addLine(line) {
    this.lines.push(line);
  }
}

/**
 * @typedef {Object} PDFDocument
 * @property {number} numPages
 * @property {Array<PDFPage>} pages
 */
class PDFDocument {
  numPages;
  pages;
  constructor() {
    this.pages = [];
  }

  /**
   * 
   * @param {PDFPage} page 
   */
  addPage(page) {
    this.pages.push(page);
  }

  /**
   * @returns {string} all text
   */
  get text() {
    return this.pages.flatMap(p => p.lines).map(l => {
      let str = "";
      l.items.forEach(i => str += i.str + " ");
      return str.trim();
    });
  }

  /**
   * Hay que revisarlo
   */
  deleteNumPages() {
    this.pages.forEach(p => {
      const lastLine = p.lines.length - 1;
      const lastItem = p.lines[lastLine].items.length - 1;
      if (p.lines[lastLine].items.length == 1 && p.lines[lastLine].items[lastItem].str == p.num) {
        p.lines.pop();
      }
    });
  }
}
export { PDFItem, PDFLine, PDFPage, PDFDocument };