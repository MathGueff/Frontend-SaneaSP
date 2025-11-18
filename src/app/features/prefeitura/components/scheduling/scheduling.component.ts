import { Component, inject, OnInit } from '@angular/core';
import { CalendarioComponent } from "@core/components/calendario/calendario.component";
import { FormCalendarComponent } from "./form-calendar/form-calendar.component";
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
    this.visitsService.getAllVisits().subscribe({
      next: (visits) => {
        this.events = visits.map(visit => ({
          title: 'Visita Agendada',
          start: new Date(visit.data_inicio).toISOString(),
          end: new Date(visit.data_final).toISOString()
        }));
      },
      error(err) {
        console.error('Erro ao buscar visitas:', err);
      },
    });
  }
}
