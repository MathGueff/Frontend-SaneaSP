import { Component } from "@angular/core";
import { FormStepsComponent } from "@features/denuncia/cadastro/components/form-steps/form-steps.component";
import { PrimeiraEtapaFormularioComponent } from "../../components/primeira-etapa-formulario/primeira-etapa-formulario.component";
import { ComplaintRegisterStepsTypes } from "../../models/complaint-register-steps.model";
import { ViewportScroller } from "@angular/common";

@Component({
  selector: "app-denuncia-cadastro",
  standalone: true,
  imports: [FormStepsComponent, PrimeiraEtapaFormularioComponent],
  templateUrl: "./denuncia-cadastro.component.html",
  styleUrls: [
    "./denuncia-cadastro.component.css",
    "../../../../../shared/styles/form.style.css",
  ],
})
export class DenunciaCadastroComponent {
  activeStep = 0;
  formData: any = {};

  constructor(private scroller: ViewportScroller) {}


  private readonly stepValues = Object.values(ComplaintRegisterStepsTypes)
    .filter(v => typeof v === 'number') as number[];
  
  readonly totalSteps = this.stepValues.length;
  readonly lastStep = Math.max(...this.stepValues);

  getStepTitle(): string {
    const titles = [
      'O que aconteceu',
      'Onde ocorreu o problema', 
      'Qual o tipo de denúncia',
      'Sua denuncia'
    ];
    return titles[this.activeStep] || 'Formulário';
  }

  nextStep(): void {
    if (this.isCurrentStepValid() && this.activeStep < this.lastStep) {
      this.activeStep++;
      this.scrollToTop();
    }
  }

  previousStep(): void {
    if (this.activeStep > 0) {
      this.activeStep--;
      this.scrollToTop();
    }
  }

  goToStep(step: number): void {
    if (step >= 0 && step <= this.lastStep) {
      this.activeStep = step;
      this.scrollToTop();
    }
  }

  isCurrentStepValid(): boolean {
    // Lógica de validação específica para cada etapa
    switch(this.activeStep) {
      case 0: return this.validateStep1();
      case 1: return this.validateStep2();
      case 2: return this.validateStep3();
      default: return true;
    }
  }

  validateStep1(): boolean {
    return true;
  }
  validateStep2(): boolean {
    return true;
  }
  validateStep3(): boolean {
    return true;
  }

  private scrollToTop(): void {
    this.scroller.scrollToPosition([0, 0]);
  }

  onFormChange(data: any): void {
    this.formData = { ...this.formData, ...data };
  }

  onSubmit(): void {
    // Lógica de submissão final
    console.log('Formulário submetido:', this.formData);
  }
}
