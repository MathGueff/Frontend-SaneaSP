import { FullCalendarModule } from '@fullcalendar/angular';
import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CalendarOptions, PluginDef } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FormGroup} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Evento } from './models/eventos.models';
import { SweetAlertService } from '@shared/services/sweet-alert.service';

@Component({
  selector: 'app-calendario',
  imports: [FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: [
    './calendario.component.css'
  ],
  standalone:true
})

export class CalendarioComponent implements OnInit {
  @Input() editable : boolean = true;
  @Input() selectable : boolean = true;
  @Input() events: Evento[] = [];
  @Input() plugins : PluginDef[] = [dayGridPlugin, interactionPlugin  ]
  sweetAlert = inject(SweetAlertService)
   
calendarOptions!: CalendarOptions;
  private platformId = inject(PLATFORM_ID);
  isBrowser = false;
  async ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if(!this.isBrowser) return;
    this.calendarOptions = {
      plugins: this.plugins,
      initialView: 'dayGridMonth',
      editable: this.editable,
      selectable: this.selectable,
      events: this.events,
      themeSystem: 'standard',
      dateClick: ()=>console.log("foi")
    };
  }

  adicionarEvento(form: FormGroup) {
    const novoEvento = form.value as Evento;

    if (!novoEvento.title || !novoEvento.start) {
      alert('Preencha o título e a data!');
      return;
    }

    this.events.push(novoEvento);

    // Atualiza o calendário com os novos eventos
    this.calendarOptions = {
      ...this.calendarOptions,
      events: [...this.events]
    };

    form.reset();
  }
  private showModal(info:any){
    
  }
}

