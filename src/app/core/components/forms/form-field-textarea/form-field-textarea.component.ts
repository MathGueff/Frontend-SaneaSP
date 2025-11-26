import { Component, EventEmitter, Input, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { IFormFieldTextareaConfig } from '@core/models/form.model';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { CommonModule } from '@angular/common';
import { FormFieldBaseComponent } from '../form-field-base/form-field-base.component';

@Component({
  selector: 'app-form-field-textarea',
  imports: [ReactiveFormsModule, FormFieldErrorComponent, CommonModule],
  templateUrl: './form-field-textarea.component.html',
  styleUrl: './form-field-textarea.component.css',
})
export class FormFieldTextareaComponent extends FormFieldBaseComponent<IFormFieldTextareaConfig> {
  @Output() onEnter = new EventEmitter()

  constructor(@Self() public override ngControl: NgControl) {
    super(ngControl);
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

  handleInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }
  
  onTextAreaKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.onEnter.emit()
      if(this.ngControl.valid){
        this.ngControl.control?.reset()
      }
    }
  }
}
