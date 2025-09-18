import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaPesquisaComponent } from './denuncia-pesquisa.component';

describe('DenunciaPesquisaComponent', () => {
  let component: DenunciaPesquisaComponent;
  let fixture: ComponentFixture<DenunciaPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenunciaPesquisaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciaPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
