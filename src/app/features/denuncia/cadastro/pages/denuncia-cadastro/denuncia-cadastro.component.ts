import { Component, inject } from '@angular/core';
import { FormStepsComponent } from '@features/denuncia/cadastro/components/form-steps/form-steps.component';
import { FormNavigationComponent } from '../../components/form-navigation/form-navigation.component';
import { PrimeiraEtapaFormularioComponent } from '../../components/primeira-etapa-formulario/primeira-etapa-formulario.component';
import { SegundaEtapaFormularioComponent } from '../../components/segunda-etapa-formulario/segunda-etapa-formulario.component';
import { ISteps, StepsTypes } from '../../models/steps';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ThirdStepComponent } from '../../components/third-step/third-step.component';

@Component({
  selector: 'app-denuncia-cadastro',
  standalone: true,
  imports: [
    FormStepsComponent,
    FormNavigationComponent,
    PrimeiraEtapaFormularioComponent,
    SegundaEtapaFormularioComponent,
    ThirdStepComponent,
    ReactiveFormsModule
  ],
  templateUrl: './denuncia-cadastro.component.html',
  styleUrls: [
    './denuncia-cadastro.component.css'
  ]
})
export class DenunciaCadastroComponent {

  private fb = inject(FormBuilder);
  // private scrollService = inject(ScrollService);

  protected activeStep = 2;
  protected steps: ISteps[] = [
    { formTitle: 'O que aconteceu?', name: 'O que', type: StepsTypes.WHAT },
    { formTitle: 'Onde foi o ocorrido?', name: 'Onde', type: StepsTypes.WHERE },
    { formTitle: 'Qual o tipo do problema?', name: 'Tipo', type: StepsTypes.HOW }
  ];

  protected formGroup: FormGroup = this.fb.group({
    what: this.fb.group({ description: [''] }),
    where: this.fb.group({ address: [''] }),
    how: this.fb.group({ type: [''] })
  });
  
  formData: Record<string, any> = {};

  get stepTitle(): string {
    return this.steps.find(step => this.activeStep === step.type)?.formTitle || '';
  }

  nextStep(): void {
    if (this.isCurrentStepValid() && this.activeStep < this.steps.length - 1) {
      this.activeStep++;
      this.scrollTop();
    }
  }

  previousStep(): void {
    if (this.activeStep > 0) {
      this.activeStep--;
      this.scrollTop();
    }
  }

  getFormGroup(name : string) : FormGroup{
    return this.formGroup.get(name) as FormGroup;;
  }

  private scrollTop(): void {
    // this.scroller.scrollToPosition([0, 0]);
  }

  private isCurrentStepValid(): boolean {
    const stepKeys = ['what', 'where', 'how'];
    const key = stepKeys[this.activeStep];
    const stepGroup = this.formGroup.get(key);
    return stepGroup?.valid ?? true;
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Formulário submetido:', this.formGroup.value);
    }
  }
}
