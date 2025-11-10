import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ICreateRecord, IRecordy } from '@features/record/models/registrer.models';

@Component({
  selector: 'app-form-record',
  imports: [ɵInternalFormsSharedModule],
  templateUrl: './form-record.component.html',
  styleUrl: './form-record.component.css',
})
export class FormRecordComponent {
onFileChange($event: Event) {
throw new Error('Method not implemented.');
}
private fb = inject(NonNullableFormBuilder);

  // FormGroup tipado com base na sua interface
  recordForm!: FormGroup;

  ngOnInit(): void {
    // Inicialização do FormGroup
    this.recordForm = this.fb.group({
      descricao: this.fb.control('', [Validators.required, Validators.minLength(10)]),
      tipo: this.fb.control(0, [Validators.required, Validators.min(1)]),
      arquivo: this.fb.control<string[] | undefined>(undefined), // Opcional no modelo
    });
  }

  // Getter para facilitar o acesso aos controles no template (opcional)
  get formControls() {
    return this.recordForm.controls;
  }

  onSubmit(): void {
    if (this.recordForm.valid) {
      console.log('Dados da Denúncia Válidos:', this.recordForm.getRawValue());
      // Aqui você faria a chamada ao serviço para enviar os dados
    } else {
      console.log('Formulário Inválido! Corrija os erros.');
      // Opcional: Marcar todos os campos como 'touched' para exibir os erros
      this.recordForm.markAllAsTouched();
    }
  }
}
