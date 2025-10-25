import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintRegisterComponent } from './complaint-register.component';

describe('DenunciaCadastroComponent', () => {
  let component: ComplaintRegisterComponent;
  let fixture: ComponentFixture<ComplaintRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
