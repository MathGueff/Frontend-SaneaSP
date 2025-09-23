import { ComplaintRegisterStepsTypes, IComplaintRegisterSteps } from './../../models/complaint-register-steps.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-steps',
  standalone: true,
  imports: [],
  templateUrl: './form-steps.component.html',
  styleUrl: './form-steps.component.css'
})
export class FormStepsComponent {
  @Input() activeStep : ComplaintRegisterStepsTypes = ComplaintRegisterStepsTypes.WHAT;

  protected steps : IComplaintRegisterSteps[] = [
    {title : 'O que', type : ComplaintRegisterStepsTypes.WHAT},
    {title : 'Onde', type : ComplaintRegisterStepsTypes.WHERE},
    {title : 'Tipo', type : ComplaintRegisterStepsTypes.HOW}
  ]

  getStepStatus(step : ComplaintRegisterStepsTypes){
    return step === this.activeStep ? "--active" : "";
  } 
}
