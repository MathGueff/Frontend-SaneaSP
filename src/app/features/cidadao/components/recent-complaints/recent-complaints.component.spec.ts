import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RecentComplaintsComponent } from "./recent-complaints.component";

describe("DenunciasRecentesComponent", () => {
  let component: RecentComplaintsComponent;
  let fixture: ComponentFixture<RecentComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentComplaintsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
