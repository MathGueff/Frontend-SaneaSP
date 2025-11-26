import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  imports: [CommonModule],
  templateUrl: './form-field-error.component.html',
  styleUrl: './form-field-error.component.css',
})
export class FormFieldErrorComponent {
  @Input() ngControl!: NgControl;

  get errorMessages(): string[] {
    if (!this.ngControl || !this.ngControl.errors || !this.ngControl.touched) {
      return [];
    }

    const errors = this.ngControl.errors;
    const messages: string[] = [];

    for (const errorKey in errors) {
      if (errors.hasOwnProperty(errorKey)) {
        const message = this.getErrorMessage(errorKey, errors[errorKey]);
        if (message) {
          messages.push(message);
        }
      }
    }

    return messages;
  }

  get shouldShowErrors(): boolean {
    return this.ngControl && 
           this.ngControl.invalid && 
           (this.ngControl.touched || this.ngControl.dirty) || false;
  }

  private getErrorMessage(errorKey: string, errorValue: any): string {
    const messages: Record<string, string> = {
      required: 'Este campo é obrigatório.',
      minlength: `Mínimo de ${errorValue.requiredLength} caracteres.`,
      maxlength: `Máximo de ${errorValue.requiredLength} caracteres.`,
      email: 'Digite um e-mail válido.',
      pattern: 'Formato inválido.',
      min: `Valor mínimo é ${errorValue.min}.`,
      max: `Valor máximo é ${errorValue.max}.`
    };

    return messages[errorKey] || 'Campo inválido.';
  }
}