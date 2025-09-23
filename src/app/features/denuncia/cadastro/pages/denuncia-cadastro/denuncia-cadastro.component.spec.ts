import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaCadastroComponent } from './denuncia-cadastro.component';

describe('DenunciaCadastroComponent', () => {
  let component: DenunciaCadastroComponent;
  let fixture: ComponentFixture<DenunciaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenunciaCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
