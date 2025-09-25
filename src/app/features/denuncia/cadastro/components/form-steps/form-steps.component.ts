import { Component, Input } from '@angular/core';
import { ISteps, StepsTypes } from '../../models/steps';

@Component({
  selector: 'app-form-steps',
  standalone: true,
  imports: [],
  templateUrl: './form-steps.component.html',
  styleUrl: './form-steps.component.css'
})
export class FormStepsComponent {
  @Input() activeStep : StepsTypes = 0;
  @Input() steps : ISteps[] = [];

  getStepStatus(step : StepsTypes){
    return step === this.activeStep ? "--active" : "";
  } 
}
