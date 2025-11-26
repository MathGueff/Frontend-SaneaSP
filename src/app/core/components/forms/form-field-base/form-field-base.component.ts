import { Input } from '@angular/core';
import { Directive } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive()
export abstract class FormFieldBaseComponent<T> implements ControlValueAccessor {
  @Input() config!: T;
  value: any = '';
  isDisabled = false;
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: any): void {
    this.value = obj ?? '';
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

  get isInvalid(): boolean {
    return this.ngControl?.control?.invalid || false;
  }
  get isValid(): boolean {
    return this.ngControl?.control?.valid || false;
  }
  get hasTouched(): boolean {
    return this.ngControl?.control?.touched || false;
  }
  get isDirty(): boolean{
    return this.ngControl?.control?.dirty || false;
  }
  get isEmpty(): boolean{
    return !this.ngControl?.control?.value
  }

  get fieldStatusClass() {
    if(this.isValid && (this.hasTouched || !this.isEmpty)) return 'field--valid'
    if(this.isInvalid && (this.hasTouched || !this.isEmpty)) return 'field--invalid'
    return ''
  }
}