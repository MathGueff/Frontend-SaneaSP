import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciasGridComponent } from './denuncias-grid.component';

describe('DenunciasGridComponent', () => {
  let component: DenunciasGridComponent;
  let fixture: ComponentFixture<DenunciasGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenunciasGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciasGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
