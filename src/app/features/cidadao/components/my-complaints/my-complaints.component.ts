import { Component, inject } from "@angular/core";
import { ComplaintsGridComponent } from "@features/denuncia/components/complaints-grid/complaints-grid.component";
import {
  IDenuncia,
  StatusDenuncia,
} from "@features/denuncia/models/denuncia.model";
import { CommonModule } from "@angular/common";
import { IComplaintStatusFilter } from "@features/cidadao/models/complaint-status-filter.model";
import { ComplaintService } from "@features/denuncia/services/complaint.service";
import { IComplaintStatusInfo } from "@features/cidadao/models/complaint-status-info.model";

@Component({
  selector: "app-my-complaints",
  standalone: true,
  imports: [CommonModule, ComplaintsGridComponent],
  templateUrl: "./my-complaints.component.html",
  styleUrl: "./my-complaints.component.css",
})
export class MyComplaintsComponent {
  protected StatusDenuncia = StatusDenuncia;
  protected currentFilter: StatusDenuncia = StatusDenuncia.Aberto;

  protected complaintService = inject(ComplaintService);
  protected denuncias: IDenuncia[] = this.complaintService.getTestComplaints();

  protected filters: IComplaintStatusFilter[] = [
    {
      text: "Em aberto",
      icon: { folder: "status/complaint", name: "opened", alt : "Exibir em aberto"},
      status: StatusDenuncia.Aberto,
    },
    {
      text: "Em análise",
      icon: { folder: "status/complaint", name: "reviewed", alt : "Exibir em análise"},
      status: StatusDenuncia.Analise,
    },
    {
      text: "Visualizada",
      icon: { folder: "status/complaint", name: "viewed", alt : "Exibir visualizadas"},
      status: StatusDenuncia.Visualizada,
    },
    {
      text: "Concluída",
      icon: { folder: "status/complaint", name: "completed", alt : "Exibir concluídas" },
      status: StatusDenuncia.Resolvida,
    },
  ];

  statusList: IComplaintStatusInfo[] = [
    {
      status: StatusDenuncia.Aberto,
      class: "opened",
      title: "Denúncias em aberto",
      description: "Aguarde até que sua denúncia seja visualizada",
    },
    {
      status: StatusDenuncia.Analise,
      class: "viewed",
      title: "Denúncias visualizadas",
      description: "Sua denúncia logo será respondida",
    },
    {
      status: StatusDenuncia.Visualizada,
      class: "reviewed",
      title: "Denúncias em análise",
      description: "Sendo encaminhada para outra organização",
    },
    {
      status: StatusDenuncia.Resolvida,
      class: "completed",
      title: "Denúncias finalizadas",
      description: "Seu problema foi resolvido",
    },
  ];

  protected isActiveStatus = (status: StatusDenuncia) =>
    status === this.currentFilter;
  protected changeActiveStatus = (status: StatusDenuncia) =>
    (this.currentFilter = status);
  // busca o objeto StatusInfo correspondente ao filtro atual
  get currentStatusInfo(): IComplaintStatusInfo {
    return this.statusList.find(s => s.status === this.currentFilter)!;
  }
}
