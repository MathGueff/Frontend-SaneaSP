import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CitizenBannerComponent } from "./citizen-banner.component";

describe("BannerComponent", () => {
  let component: CitizenBannerComponent;
  let fixture: ComponentFixture<CitizenBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitizenBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
