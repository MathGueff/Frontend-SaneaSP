import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenHomeComponent } from './citizen-home.component';

describe('MenuComponent', () => {
  let component: CitizenHomeComponent;
  let fixture: ComponentFixture<CitizenHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
