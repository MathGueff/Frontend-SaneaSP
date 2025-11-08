import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FormNavigationComponent } from "./form-navigation.component";

describe("FormNavigationComponent", () => {
  let component: FormNavigationComponent;
  let fixture: ComponentFixture<FormNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
