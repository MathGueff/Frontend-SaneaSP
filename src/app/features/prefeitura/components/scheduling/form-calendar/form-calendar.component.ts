import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-calendar',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-calendar.component.html',
  styleUrls: [
     "../../../../../shared/styles/form.style.css",
     './form-calendar.component.css'
    ],
  standalone:true
})
export class FormCalendarComponent implements OnInit {
  form !: FormGroup;
  constructor(private fb:FormBuilder){} 
  ngOnInit(){
    this.form = this.fb.group({
      title:['',Validators.required],
      start:['',Validators.required],
      finally:['',Validators.required]
    })
  }
  adicionarEvento() {
  throw new Error('Method not implemented.');
  }
}
