import { FullCalendarModule } from '@fullcalendar/angular';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

interface Evento {
  title: string;
  start: string;
  end?: string;
}
@Component({
  selector: 'app-calendario',
  imports: [FullCalendarModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})

export class CalendarioComponent {
calendarOptions!: CalendarOptions;
  form: FormGroup;
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


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [''],
      start: [''],
      end: ['']
    });
  }

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      events: this.eventos,
      dateClick: this.handleDateClick.bind(this)
    };
  }

  handleDateClick(info: any) {
   // this.form.patchValue({ start: info.dateStr });
  }

  adicionarEvento() {
    const novoEvento = this.form.value as Evento;

    if (!novoEvento.title || !novoEvento.start) {
      alert('Preencha o título e a data!');
      return;
    }

    this.eventos.push(novoEvento);

    // Atualiza o calendário com os novos eventos
    this.calendarOptions = {
      ...this.calendarOptions,
      events: [...this.eventos]
    };

    this.form.reset();
  }
}

