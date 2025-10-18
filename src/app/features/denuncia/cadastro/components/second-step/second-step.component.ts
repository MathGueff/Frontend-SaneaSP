import { Component, Input } from '@angular/core';
import { IStepForm } from '../../models/step-form.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-second-step',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.css', '../../../../../shared/styles/form.style.css']
})
export class SecondStepComponent implements IStepForm{
  @Input() formGroup !: FormGroup;
  
  isValid(): boolean {
    return true;
  }
  getData() {
    return true;
  }

}
