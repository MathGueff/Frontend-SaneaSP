import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VisitsService } from '@core/services/visits.service';
import { IVisitCreate } from '../../models/visits.model';
import { ToastService } from '@shared/services/toast.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-form-calendar',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-calendar.component.html',
  styleUrls: [
     "../../../../../../shared/styles/form.style.css",
     './form-calendar.component.css'
    ],
  standalone:true
})
export class FormCalendarComponent implements OnInit {
  form !: FormGroup;
  private visitService = inject(VisitsService)
  private authService = inject(AuthService)
  private toastService = inject(ToastService)
  @Output() onCreate = new EventEmitter()
  constructor(private fb:FormBuilder){} 
  ngOnInit(){
    this.form = this.fb.group({
      motivo:['',Validators.required],
      dataInicio:['',Validators.required],
      dataFinal:['',Validators.required]
    })
  }
  
  adicionarEvento() {
    const { motivo, dataInicio, dataFinal }  = this.form.value;
    if(!this.user){
      this.toastService.show({
        message: 'Você precisa estar autenticado para essa ação',
        error: true
      })
      return
    }
    const newVisit : IVisitCreate = { 
      motivo, 
      dataInicio, 
      dataFinal,
      idDenuncia: 1,
      idUsuario: this.user.id
    };
    this.visitService.createVisit(newVisit).subscribe({
      next : () => {
        this.onCreate.emit()
        this.form.reset();
        this.toastService.show({message: 'Seu evento foi criado', error: false})
      }
    });
  }

  get user(){
    return this.authService.currentUser()
  }
}
