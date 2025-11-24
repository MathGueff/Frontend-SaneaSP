import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpComplaintsComponent } from './follow-up-complaints.component';

describe('FollowUpComplaintsComponent', () => {
  let component: FollowUpComplaintsComponent;
  let fixture: ComponentFixture<FollowUpComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowUpComplaintsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowUpComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
