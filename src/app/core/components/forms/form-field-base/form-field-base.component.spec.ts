import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldBaseComponent } from './form-field-base.component';

describe('FormFieldBaseComponent', () => {
  let component: FormFieldBaseComponent;
  let fixture: ComponentFixture<FormFieldBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFieldBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
