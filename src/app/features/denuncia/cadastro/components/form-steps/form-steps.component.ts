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

  goToStep(step: ISteps) {
    if (step.completed) {
      this.return.emit(step.type);
    }
  }

  isStepClickable(step: ISteps): boolean {
    return step.completed;
  }
}
