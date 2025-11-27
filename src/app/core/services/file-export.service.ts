import { inject, Injectable } from "@angular/core";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment'

import { saveAs } from 'file-saver';
import { SweetAlertService } from "@shared/services/sweet-alert.service";
import { EnviromentService } from "./enviroment.service";
export interface IFileExportEntry{
    element ?: HTMLElement,
    pdfName : string
}

@Injectable({ providedIn: 'root' })
export class FileExportService {
    private envService = inject(EnviromentService);
    private BASE_URL = this.envService.getUrl()
    private httpClient = inject(HttpClient)
    private sweetAlertService = inject(SweetAlertService)

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

    exportComplaintExcel(){
        return this.httpClient.get(`${this.BASE_URL}denuncia/export`, {
            responseType: 'blob'
        });
    }

    downloadExcel() {
        this.exportComplaintExcel().subscribe({
        next: (res: Blob) => {
            const blob = new Blob([res], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            saveAs(blob, 'denuncias.xlsx');
            this.sweetAlertService.confirmExport()
        },
        error: (err) => console.error('Erro ao exportar Excel', err)
        });
    }
}