import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundaEtapaFormularioComponent } from './segunda-etapa-formulario.component';

describe('SegundaEtapaFormularioComponent', () => {
  let component: SegundaEtapaFormularioComponent;
  let fixture: ComponentFixture<SegundaEtapaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegundaEtapaFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegundaEtapaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
