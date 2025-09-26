import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() return = new EventEmitter<StepsTypes>(); 

  getStepState(step : ISteps){
    if(step.type === this.activeStep)
      return "--active"
    
    if(step.completed){
      return "--completed"  
    } 
    return "";
  } 

  getSeparatorState(step : ISteps){
    if(step.completed)
      return "--completed"
    return "";
  }

  goToStep(step : ISteps){
    if(step.completed)
      this.return.emit(step.type);
  }
}
