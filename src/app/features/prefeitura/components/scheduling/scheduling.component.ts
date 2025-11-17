import { Component } from '@angular/core';
import { CalendarioComponent } from "@core/components/calendario/calendario.component";
import { FormCalendarComponent } from "./form-calendar/form-calendar.component";
import { Evento } from '@core/components/calendario/models/eventos.models';

@Component({
  selector: 'app-scheduling',
  imports: [CalendarioComponent, FormCalendarComponent],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.css',
})
export class SchedulingComponent {
eventos: Evento[] = [
  { title: 'Reunião de equipe', start: '2025-11-10T10:00:00', end: '2025-11-10T11:00:00' },
  { title: 'Almoço com cliente', start: '2025-11-11T12:30:00' },
  { title: 'Entrega do projeto SaneaSP', start: '2025-11-12' },
  { title: 'Treinamento interno', start: '2025-11-13T09:00:00', end: '2025-11-13T17:00:00' },
  { title: 'Revisão de código', start: '2025-11-14T15:00:00' },
  { title: 'Reunião com gestor', start: '2025-11-17T10:00:00' },
  { title: 'Feriado - Proclamação da República', start: '2025-11-15', end: '2025-11-16' },
  { title: 'Planejamento mensal', start: '2025-11-18T09:00:00', end: '2025-11-18T11:00:00' },
  { title: 'Apresentação de resultados', start: '2025-11-19T14:00:00' },
  { title: 'Reunião de retrospectiva', start: '2025-11-20T16:00:00' },
  { title: 'Café com o time', start: '2025-11-21T09:30:00' },
  { title: 'Revisão de sprint', start: '2025-11-22T10:00:00' },
  { title: 'Deploy nova versão', start: '2025-11-25T20:00:00' },
  { title: 'Reunião do comitê técnico', start: '2025-11-26T14:00:00' },
  { title: 'Workshop de inovação', start: '2025-11-27T09:00:00', end: '2025-11-27T17:00:00' },
  { title: 'Aniversário do colega João', start: '2025-11-28' },
  { title: 'Feedback individual', start: '2025-11-29T11:00:00' },
  { title: 'Hackathon interno', start: '2025-11-30T09:00:00', end: '2025-11-30T18:00:00' },
];

}
