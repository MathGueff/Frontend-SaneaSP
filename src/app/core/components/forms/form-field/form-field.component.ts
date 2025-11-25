import { Component, Input, Optional, Self, SkipSelf, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormGroup, NgControl } from '@angular/forms';
import { IFormFieldConfig } from '@core/models/form.model';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';

@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule, FormFieldErrorComponent],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() config!: IFormFieldConfig;

  constructor(@Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
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

  // Adicione esta propriedade para verificar se há erros
  get hasError(): boolean {
    return this.ngControl?.invalid && (this.ngControl?.dirty || this.ngControl?.touched) || false;
  }

  value: any = '';
  isDisabled = false;
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  ngOnInit() {
    if (this.config.input.id !== this.config.label.for) {
      alert('O ID e FOR do input devem ser iguais')
    }
  }
}