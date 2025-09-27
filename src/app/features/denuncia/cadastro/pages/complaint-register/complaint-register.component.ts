import { Component, inject } from '@angular/core';
import { FormStepsComponent } from '@features/denuncia/cadastro/components/form-steps/form-steps.component';
import { FormNavigationComponent } from '../../components/form-navigation/form-navigation.component';
import { FirstStepComponent } from '../../components/first-step/first-step.component';
import { SecondStepComponent } from '../../components/second-step/second-step.component';
import { ISteps, StepsTypes } from '../../models/steps';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ThirdStepComponent } from '../../components/third-step/third-step.component';
import { ReviewComponent } from '@features/denuncia/cadastro/components/review/review.component';

@Component({
  selector: 'app-complaint-register',
  standalone: true,
  imports: [
    FormStepsComponent,
    FormNavigationComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    ReviewComponent,
    ReactiveFormsModule
  ],
  templateUrl: './complaint-register.component.html',
  styleUrls: [
    './complaint-register.component.css'
  ]
})
export class ComplaintRegisterComponent {

  private fb = inject(FormBuilder);

  protected activeStep = 0;
  protected steps: ISteps[] = [
    { formTitle: 'O que aconteceu?', name: 'O que', type: StepsTypes.WHAT, completed: false},
    { formTitle: 'Onde foi o ocorrido?', name: 'Onde', type: StepsTypes.WHERE, completed: false },
    { formTitle: 'Qual o tipo do problema?', name: 'Tipo', type: StepsTypes.HOW, completed: false }
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
    if (this.isCurrentStepValid()) {
      this.steps[this.activeStep].completed = true;
      this.goToStep(++this.activeStep);
    }
  }

  previousStep(): void {
    if (this.activeStep > 0) {
      this.goToStep(--this.activeStep);
    }
  }

  goToStep(step : StepsTypes){
    this.activeStep = step;
    this.scrollTop();
  }

  getFormGroup(name : string) : FormGroup{
    return this.formGroup.get(name) as FormGroup;
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
