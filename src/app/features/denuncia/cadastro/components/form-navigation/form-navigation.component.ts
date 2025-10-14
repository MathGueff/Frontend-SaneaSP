import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ISteps } from "../../models/steps";

@Component({
  selector: "app-form-navigation",
  standalone: true,
  imports: [],
  templateUrl: "./form-navigation.component.html",
  styleUrl: "./form-navigation.component.css",
})
export class FormNavigationComponent {
  @Input() activeStep!: number;
  @Input() steps!: ISteps[];
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  // getButtonAction(){
  //   const isLastStep = this.activeStep === this.steps.length - 1  
  //   return {
  //     label : isLastStep ? "Enviar denúncia": "Prosseguir",
  //     function : isLastStep ? this.submit.emit() : this.next.emit()
  //   }
  // }
}
