import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaFeedbackComponent } from './denuncia-feedback.component';

describe('FeedbacksComponent', () => {
  let component: DenunciaFeedbackComponent;
  let fixture: ComponentFixture<DenunciaFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenunciaFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciaFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
