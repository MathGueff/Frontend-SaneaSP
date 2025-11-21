import { Component, inject, OnInit } from '@angular/core';
import { CalendarioComponent } from "@core/components/calendario/calendario.component";
import { FormCalendarComponent } from "./components/form-calendar/form-calendar.component";
import { VisitsService } from '@core/services/visits.service';
import { Evento } from '@core/components/calendario/models/eventos.models';

@Component({
  selector: 'app-scheduling',
  imports: [CalendarioComponent, FormCalendarComponent],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.css',
})
export class SchedulingComponent implements OnInit {
  visitsService = inject(VisitsService);
  events: Evento[] = [];
  
  ngOnInit(): void {
    this.updateVisits();
  }

  updateVisits() {
    this.visitsService.getAllVisits().subscribe({
      next: (visits) => {
        this.events = [...visits.map(visit => ({
          title: visit.motivo,
          start: new Date(visit.dataInicio).toISOString(),
          end: new Date(visit.dataFinal).toISOString()
        }))];
        console.log('Eventos atualizados:', this.events);
      },
      error(err) {
        console.error('Erro ao buscar visitas:', err);
      },
    });
  }

  onVisitCreated() {
    console.log('visita criada')
    this.updateVisits();
  }
}
