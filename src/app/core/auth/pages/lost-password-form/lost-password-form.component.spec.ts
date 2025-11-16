import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPasswordFormComponent } from './lost-password-form.component';

describe('LostPasswordFormComponent', () => {
  let component: LostPasswordFormComponent;
  let fixture: ComponentFixture<LostPasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostPasswordFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
