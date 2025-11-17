import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllComplaintComponent } from './all-complaint.component';

describe('AllComplaintComponent', () => {
  let component: AllComplaintComponent;
  let fixture: ComponentFixture<AllComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllComplaintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
