declare class PDFItem {
  x: number;
  y: number;
  width: number;
  height: number;
  str: string;
  constructor(x: number, y: number, width: number, height: number, str: string);
}
declare class PDFLine {
  numPagePDF: number;
  items: PDFItem[];
  constructor(numPagePDF: number);
  addItem(item: PDFItem): void;
  get x(): number;
  get y(): number;
  get text(): string;
}
declare class PDFPage {
  num: number;
  lines: PDFLine[];
  constructor(numPage: number);
  addLine(line: PDFLine): void;
}
declare class PDFDocument {
  numPages: number;
  pages: PDFPage[];
  constructor();
  addPage(page: PDFPage): void;
  get text(): string[];
  deleteNumPages(): void;
}
export { PDFItem, PDFLine, PDFPage, PDFDocument };
