import { Injectable } from "@angular/core";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface IFileExportEntry{
    element ?: HTMLElement,
    pdfName : string
}

@Injectable({ providedIn: 'root' })
export class FileExportService {
    exportPDF(fileExportEntry : IFileExportEntry){
        const { element, pdfName } = fileExportEntry
        if (!element) return;
        html2canvas(element).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(pdfName);
        });
    }
}