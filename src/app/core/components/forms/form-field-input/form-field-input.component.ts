import { Component, Input, Self } from '@angular/core';
import { ReactiveFormsModule, NgControl } from '@angular/forms';
import { IFormFieldInputConfig } from '@core/models/form.model';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { FormFieldBaseComponent } from '../form-field-base/form-field-base.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field-input',
  imports: [ReactiveFormsModule, FormFieldErrorComponent, CommonModule],
  templateUrl: './form-field-input.component.html',
  styleUrl: './form-field-input.component.css'
})
export class FormFieldInputComponent extends FormFieldBaseComponent<IFormFieldInputConfig> {
  constructor(@Self() public override ngControl: NgControl) {
    super(ngControl);
  }

  get fieldClass() {
    if (this.config.class) {
      return this.config.class.join(' ')
    }
    return ''
  }

  get inputClass() {
    if (this.config.input.class) {
      return this.config.input.class.join(' ')
    }
    return ''
  }

  get labelClass() {
    if (this.config.label.class) {
      return this.config.label.class.join(' ')
    }
    return ''
  }

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}