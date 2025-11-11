import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdStepComponent } from './third-step.component';

describe('ThirdStepComponent', () => {
  let component: ThirdStepComponent;
  let fixture: ComponentFixture<ThirdStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
