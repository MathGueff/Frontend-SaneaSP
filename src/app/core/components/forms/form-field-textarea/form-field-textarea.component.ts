import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { IFormFieldTextareaConfig } from '@core/models/form.model';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field-textarea',
  imports: [ReactiveFormsModule, FormFieldErrorComponent, CommonModule],
  templateUrl: './form-field-textarea.component.html',
  styleUrl: './form-field-textarea.component.css',
})
export class FormFieldTextareaComponent implements ControlValueAccessor {
  @Input() config!: IFormFieldTextareaConfig;

  constructor(@Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get fieldClass() {
    if (this.config.class) {
      return this.config.class.join(' ');
    }
    return '';
  }

  get textareaClass() {
    if (this.config.textarea.class) {
      return this.config.textarea.class.join(' ');
    }
    return '';
  }

  get labelClass() {
    if (this.config.label && this.config.label.class) {
      return this.config.label.class.join(' ');
    }
    return '';
  }

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
    const value = (event.target as HTMLTextAreaElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  autoGrow?(event: Event): void;
  onTextAreaKeyDown?(event: KeyboardEvent): void;

  ngOnInit() {
    if (this.config.textarea.id && this.config.label && this.config.textarea.id !== this.config.label.for) {
      alert('O ID e FOR do textarea devem ser iguais');
    }
  }
}
