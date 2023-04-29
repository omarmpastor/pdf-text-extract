import { PDFDocument } from './PDFDocument';
declare function parsePDF(pdfPath: string): Promise<PDFDocument>;
export default parsePDF;
