import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ComplaintsGridComponent } from "./complaints-grid.component";

describe("DenunciasGridComponent", () => {
  let component: ComplaintsGridComponent;
  let fixture: ComponentFixture<ComplaintsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplaintsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
