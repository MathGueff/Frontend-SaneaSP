import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IComplaintStatusFilterLabel, TComplaintStatusFilter } from "@features/cidadao/models/complaint-status-filter.model";
import { IComplaintStatusInfo } from "@features/cidadao/models/complaint-status-info.model";
import { ComplaintStatus } from "@features/denuncia/models/complaint.model";

@Component({
  selector: "app-complaint-filter-by-status",
  imports: [FormsModule, CommonModule],
  templateUrl: "./complaint-filter-by-status.component.html",
  styleUrl: "./complaint-filter-by-status.component.css",
})
export class ComplaintFilterByStatusComponent {
  protected currentFilter: TComplaintStatusFilter = 'Todas';
  @Output() onStatusFilterChange = new EventEmitter<TComplaintStatusFilter>()

  protected get filters(): IComplaintStatusFilterLabel[] {
    return [
      {
        text: "Todas",
        icon: {
          folder: "status/complaint",
          name: "todas",
          alt: "Exibir todas",
        },
        status: "Todas",
      },
      ...Object.entries(ComplaintStatus).map(([key, value]) => ({
        text: key.replace(/([A-Z])/g, " $1").trim(),
        icon: {
          folder: "status/complaint",
          name: value,
          alt: `Exibir ${key}`,
        },
        status: value as ComplaintStatus,
      })),
    ];
  }

  private statusInfoMap: Record<
    string,
    { class: string; title: string; description: string }
  > = {
    Enviada: {
      class: "opened",
      title: "Denúncia enviada",
      description: "A denúncia foi publicada e aguarda análise.",
    },
    EmAnalise: {
      class: "reviewed",
      title: "Em análise",
      description: "A equipe está analisando a denúncia.",
    },
    AguardandoInformacoes: {
      class: "waiting",
      title: "Aguardando informações",
      description: "Aguardando mais informações do cidadão.",
    },
    EmResolucao: {
      class: "in-progress",
      title: "Em resolução",
      description: "A prefeitura está trabalhando para resolver o problema.",
    },
    VisitaAgendada: {
      class: "scheduled",
      title: "Visita agendada",
      description: "Uma visita ao local foi agendada.",
    },
    NaoProcede: {
      class: "not-applied",
      title: "Não procede",
      description: "A denúncia não pôde ser confirmada ou não se aplica.",
    },
    Cancelada: {
      class: "cancelled",
      title: "Cancelada",
      description: "A denúncia foi cancelada.",
    },
    Resolvida: {
      class: "completed",
      title: "Resolvida",
      description: "O problema foi resolvido pela equipe técnica.",
    },
    Finalizada: {
      class: "finalized",
      title: "Finalizada",
      description: "A denúncia foi oficialmente encerrada no sistema.",
    },
  };

  get statusList(): IComplaintStatusInfo[] {
    return Object.entries(ComplaintStatus).map(([key, value]) => {
      const info = this.statusInfoMap[key] || {
        class: key.toLowerCase(),
        title: key,
        description: "",
      };
      return {
        status: value as unknown as ComplaintStatus,
        class: info.class,
        title: info.title,
        description: info.description,
      };
    });
  }

  protected isActiveStatus = (status: ComplaintStatus | "Todas") =>
    status === this.currentFilter;

  get currentStatusInfo(): IComplaintStatusInfo | undefined {
    if (this.currentFilter === "Todas") return undefined;
    return this.statusList.find((s) => s.status === this.currentFilter);
  }

  protected changeActiveStatus = (status: ComplaintStatus | 'Todas') => {
    this.currentFilter = status;
    this.onStatusFilterChange.emit(this.currentFilter);
  }
}
