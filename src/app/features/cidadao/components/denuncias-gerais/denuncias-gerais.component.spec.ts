import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciasGeraisComponent } from './denuncias-gerais.component';

describe('DenunciasGeraisComponent', () => {
  let component: DenunciasGeraisComponent;
  let fixture: ComponentFixture<DenunciasGeraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenunciasGeraisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciasGeraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
