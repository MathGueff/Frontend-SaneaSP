import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ComplaintFeedbackComponent } from "./complaint-feedback.component";

describe("ComplaintFeedbackComponent", () => {
  let component: ComplaintFeedbackComponent;
  let fixture: ComponentFixture<ComplaintFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintFeedbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplaintFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
