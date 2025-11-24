import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ISteps, StepsTypes } from "../../models/steps";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-form-steps",
    imports: [CommonModule],
    templateUrl: "./form-steps.component.html",
    styleUrl: "./form-steps.component.css"
})
export class FormStepsComponent {
  @Input() activeStep !: StepsTypes;
  @Input() steps !: ISteps[];
  @Output() return = new EventEmitter<StepsTypes>();

  getStepState(step: ISteps) {
    if (step.type === this.activeStep) return "--active";

    if (step.completed) {
      return "--completed";
    }
    return "";
  }

  getSeparatorState(step: ISteps) {
    if (step.completed) return "--completed";
    return "";
  }


  isStepAccessible(step: ISteps): boolean {
    const idx = this.steps.findIndex(s => s.type === step.type);
    if (step.completed) return true;
    if (idx === 0) return true;
    return this.steps.slice(0, idx).every(s => s.completed);
  }

  isStepClickable(step: ISteps): boolean {
    return this.isStepAccessible(step);
  }

  goToStep(step: ISteps) {
    if (this.isStepAccessible(step)) {
      this.return.emit(step.type);
    }
  }



  isStepActive(step: ISteps): boolean{
    return step.type === this.activeStep
  }
}
