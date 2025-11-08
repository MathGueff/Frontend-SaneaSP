import { Component, inject, OnInit } from "@angular/core";
import { ComplaintsGridComponent } from "@features/denuncia/components/complaints-grid/complaints-grid.component";
import {
  IComplaint,
  ComplaintStatus,
} from "@features/denuncia/models/complaint.model";
import { CommonModule } from "@angular/common";
import { IComplaintStatusFilter } from "@features/cidadao/models/complaint-status-filter.model";
import { ComplaintService } from "@features/denuncia/services/complaint.service";
import { IComplaintStatusInfo } from "@features/cidadao/models/complaint-status-info.model";

@Component({
  selector: "app-my-complaints",
  imports: [CommonModule, ComplaintsGridComponent],
  templateUrl: "./my-complaints.component.html",
  styleUrl: "./my-complaints.component.css",
})
export class MyComplaintsComponent implements OnInit {
  protected StatusDenuncia = ComplaintStatus;
  protected currentFilter: ComplaintStatus = ComplaintStatus.Aberto;

  protected complaintService = inject(ComplaintService);
  complaints!: IComplaint[];

  ngOnInit(): void {
    this.loadComplaints();
  }

  protected filters: IComplaintStatusFilter[] = [
    {
      text: "Em aberto",
      icon: {
        folder: "status/complaint",
        name: "opened",
        alt: "Exibir em aberto",
      },
      status: ComplaintStatus.Aberto,
    },
    {
      text: "Em análise",
      icon: {
        folder: "status/complaint",
        name: "reviewed",
        alt: "Exibir em análise",
      },
      status: ComplaintStatus.Analise,
    },
    {
      text: "Visualizada",
      icon: {
        folder: "status/complaint",
        name: "viewed",
        alt: "Exibir visualizadas",
      },
      status: ComplaintStatus.Visualizada,
    },
    {
      text: "Concluída",
      icon: {
        folder: "status/complaint",
        name: "completed",
        alt: "Exibir concluídas",
      },
      status: ComplaintStatus.Resolvida,
    },
  ];

  statusList: IComplaintStatusInfo[] = [
    {
      status: ComplaintStatus.Aberto,
      class: "opened",
      title: "Denúncias em aberto",
      description: "Aguarde até que sua denúncia seja visualizada",
    },
    {
      status: ComplaintStatus.Analise,
      class: "viewed",
      title: "Denúncias visualizadas",
      description: "Sua denúncia logo será respondida",
    },
    {
      status: ComplaintStatus.Visualizada,
      class: "reviewed",
      title: "Denúncias em análise",
      description: "Sendo encaminhada para outra organização",
    },
    {
      status: ComplaintStatus.Resolvida,
      class: "completed",
      title: "Denúncias finalizadas",
      description: "Seu problema foi resolvido",
    },
  ];

  protected isActiveStatus = (status: ComplaintStatus) =>
    status === this.currentFilter;

  // busca o objeto StatusInfo correspondente ao filtro atual
  get currentStatusInfo(): IComplaintStatusInfo {
    return this.statusList.find((s) => s.status === this.currentFilter)!;
  }

  private loadComplaints() {
    this.complaintService
      .getUserComplaint({ status: this.currentFilter })
      .subscribe({
        next: (complaints) => {
          this.complaints = complaints;
        },
      });
  }

  protected changeActiveStatus = (status: ComplaintStatus) => {
    this.currentFilter = status;
    this.loadComplaints();
  };
}
