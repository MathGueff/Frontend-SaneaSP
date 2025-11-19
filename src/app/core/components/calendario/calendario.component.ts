import { FullCalendarModule } from "@fullcalendar/angular";
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from "@angular/core";
import { CalendarOptions, PluginDef } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FormGroup } from "@angular/forms";
import { isPlatformBrowser } from "@angular/common";
import { SweetAlertService } from "@shared/services/sweet-alert.service";
import { Evento } from "./models/eventos.models";

@Component({
  selector: "app-calendario",
  imports: [FullCalendarModule],
  templateUrl: "./calendario.component.html",
  styleUrls: ["./calendario.component.css"],
  standalone: true,
})
export class CalendarioComponent implements OnInit, OnChanges {
  @Input() editable: boolean = true;
  @Input() selectable: boolean = true;
  @Input() events: Evento[] = [
    {
      title: "Visita Agendada",
      start: "2024-11-01T10:00:00.000Z",
      end: "2024-11-01T12:00:00.000Z",
    },
    {
      title: "Visita Agendada",
      start: "2024-11-15T14:00:00.000Z",
      end: "2024-11-20T16:00:00.000Z",
    },
    {
      title: "Visita Agendada",
      start: "2024-11-01T09:00:00.000Z",
      end: "2024-11-27T11:00:00.000Z",
    },
  ];
  @Input() plugins: PluginDef[] = [dayGridPlugin, interactionPlugin];

  sweetAlert = inject(SweetAlertService);

  private platformId = inject(PLATFORM_ID);
  isBrowser = false;
  calendarOptions: CalendarOptions = {
    plugins: [],
    initialView: "dayGridMonth",
    editable: true,
    selectable: true,
    events: [],
    themeSystem: "standard",
    eventClassNames: ['minha-classe-evento'],
    dateClick: () => console.log("data clicada"),
  };

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) return;
    this.calendarOptions = {
      ...this.calendarOptions,
      plugins: this.plugins,
      editable: this.editable,
      selectable: this.selectable,
      events: this.events,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.calendarOptions) return;

    if (changes["events"]) {
      console.log("Eventos recebidos pelo calendário:", this.events);
      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.events
      };
    }
  }

  adicionarEvento(form: FormGroup) {
    const novoEvento = form.value as Evento;

    if (!novoEvento.title || !novoEvento.start) {
      alert("Preencha o título e a data!");
      return;
    }

    this.events = [...this.events, novoEvento];

    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events,
    };

    form.reset();
  }
}
