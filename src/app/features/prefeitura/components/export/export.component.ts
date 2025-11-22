import { Component, inject } from '@angular/core';
import { FileExportService } from '@core/services/file-export.service';
import { SweetAlertService } from '@shared/services/sweet-alert.service';

@Component({
  selector: 'app-export',
  imports: [],
  templateUrl: './export.component.html',
  styleUrl: './export.component.css',
})
export class ExportComponent {
  
  private fileExportService = inject(FileExportService)
  
  exportExcel(){
    console.log('entrou')
    this.fileExportService.downloadExcel()
  }
}
