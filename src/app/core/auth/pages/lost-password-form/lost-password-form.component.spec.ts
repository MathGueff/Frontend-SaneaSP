import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEsqueciSenhaComponent } from './form-esqueci-senha.component';

describe('FormEsqueciSenhaComponent', () => {
  let component: FormEsqueciSenhaComponent;
  let fixture: ComponentFixture<FormEsqueciSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEsqueciSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEsqueciSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
