import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldInputComponent } from './form-field-input.component';

describe('FormInputComponent', () => {
  let component: FormFieldInputComponent;
  let fixture: ComponentFixture<FormFieldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
