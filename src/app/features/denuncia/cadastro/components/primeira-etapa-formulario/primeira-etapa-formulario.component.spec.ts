import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeiraEtapaFormularioComponent } from './primeira-etapa-formulario.component';

describe('PrimeiraEtapaFormularioComponent', () => {
  let component: PrimeiraEtapaFormularioComponent;
  let fixture: ComponentFixture<PrimeiraEtapaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeiraEtapaFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeiraEtapaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
