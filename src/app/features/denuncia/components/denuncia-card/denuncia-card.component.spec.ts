import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaCardComponent } from './denuncia-card.component';

describe('DenunciaCardComponent', () => {
  let component: DenunciaCardComponent;
  let fixture: ComponentFixture<DenunciaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenunciaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
