import 'core-js';
import { PDFDocument, PDFPage, PDFLine, PDFItem } from './PDFDocument'

/**
 * 
 * @param {ArrayBuffer} pdfPath 
 * @returns {object} JSON
 */
async function getPDFData (pdfBuffer) {
    const pdfjsLib = require('pdfjs-dist/legacy/build/pdf')
    const doc = await pdfjsLib.getDocument(pdfBuffer).promise;

    const pdf = {
        numPages: doc.numPages,
        pages: []
    };

    for (var i = 1; i <= doc.numPages; i++) {
        const pagePDF = await doc.getPage(i);

        const viewport = pagePDF.getViewport({scale: 1.0});
        const pageInfo = {
            num: i,
            scale: viewport.scale,
            rotation: viewport.rotation,
            offsetX: viewport.offsetX,
            offsetY: viewport.offsetY,
            width: viewport.width,
            height: viewport.height
        };
        
        const options = {
            normalizeWhitespace: true,
            disableCombineTextItems: false,
        };
        const content = await pagePDF.getTextContent(options); 
        const page = {
            num: pageInfo.num,
            items: []
        };
        const allPageItems = content.items.map(item => {
            const trs = item.transform;
            let x = trs[4];
            let y = pageInfo.height - trs[5];
            if (viewport.rotation === 90) {
                x = trs[5];
                y = trs[4];
            }
            return {
                x: x,
                y: y,
                width: item.width,
                height: item.height,
                str: item.str.trim()
            };
        });
        
        page.items = allPageItems.filter(itm => itm.width > 0 );

        pdf.pages.push(page)
    }

    return pdf
};

/**
 * 
 * @param {object} page 
 * @returns {object}
 */
function GroupAndOrderItemsOfPage(page) {
    const itemsGroup = page.items.group(i => i.y);
    let lines = [];
    
    Object.getOwnPropertyNames(itemsGroup).forEach(line => {
        const lineOrderByX = itemsGroup[line].sort((a, b) => a.x - b.x);
        lines.push(lineOrderByX);
    });

    return lines.sort((a, b) => a[0].y - b[0].y);
}

/**
 * 
 * @param {string} pdfPath 
 * @returns {PDFDocument}
 */
async function parsePDF(pdfPath) {
    const pdfData = await getPDFData(pdfPath);

    let pdfDoc = new PDFDocument();
    pdfDoc.numPages = pdfData.numPages;

    for(let page of pdfData.pages) {
        let pdfPage = new PDFPage(page.num);
        const linesData = GroupAndOrderItemsOfPage(page);
        for(let lineData of linesData) {
            let line = new PDFLine(page.num);
            for(let itemData of lineData) {
                line.addItem(
                    new PDFItem(
                        itemData.x, itemData.y,
                        itemData.width, itemData.height,
                        itemData.str
                    )
                );
            }
            pdfPage.addLine(line);
        }
        pdfDoc.addPage(pdfPage);
    }

    return pdfDoc;
}

export default parsePDF;