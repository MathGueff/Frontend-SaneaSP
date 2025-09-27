import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintDetailComponent } from './complaint-detail.component';

describe('ComplaintDetailComponent', () => {
  let component: ComplaintDetailComponent;
  let fixture: ComponentFixture<ComplaintDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
