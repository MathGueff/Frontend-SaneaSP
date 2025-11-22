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
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
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
  @Input() events: Evento[] = [];
  @Input() plugins: PluginDef[] = [dayGridPlugin, interactionPlugin];

  sweetAlert = inject(SweetAlertService);

  private platformId = inject(PLATFORM_ID);
  isBrowser = false;
  calendarOptions: CalendarOptions = {
    plugins: [],
    initialView: "dayGridMonth",
    editable: true,
    selectable: true,
    eventDisplay: 'block',
    displayEventTime: false,
    events: [],
    themeSystem: "standard",
    locale: 'pt-br',
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
    if (changes["events"] && this.isBrowser) {
      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.events
      };
    }
  }
}
