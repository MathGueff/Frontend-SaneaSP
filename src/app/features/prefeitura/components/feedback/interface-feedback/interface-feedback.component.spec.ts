import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceFeedbackComponent } from './interface-feedback.component';

describe('InterfaceFeedbackComponent', () => {
  let component: InterfaceFeedbackComponent;
  let fixture: ComponentFixture<InterfaceFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterfaceFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfaceFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
