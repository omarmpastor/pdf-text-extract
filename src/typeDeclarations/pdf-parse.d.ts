import { PDFDocument } from './PDFDocument';
declare function parsePDF(pdfBuffer: ArrayBuffer): Promise<PDFDocument>;
export default parsePDF;
