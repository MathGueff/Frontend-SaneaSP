import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintFilterByStatusComponent } from './complaint-filter-by-status.component';

describe('ComplaintFilterByStatusComponent', () => {
  let component: ComplaintFilterByStatusComponent;
  let fixture: ComponentFixture<ComplaintFilterByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintFilterByStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintFilterByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
