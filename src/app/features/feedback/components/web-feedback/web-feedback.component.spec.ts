import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebFeedbackComponent } from './web-feedback.component';

describe('WebFeedbackComponent', () => {
  let component: WebFeedbackComponent;
  let fixture: ComponentFixture<WebFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
