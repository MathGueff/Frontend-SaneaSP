import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciasRecentesComponent } from './denuncias-recentes.component';

describe('DenunciasRecentesComponent', () => {
  let component: DenunciasRecentesComponent;
  let fixture: ComponentFixture<DenunciasRecentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenunciasRecentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciasRecentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
