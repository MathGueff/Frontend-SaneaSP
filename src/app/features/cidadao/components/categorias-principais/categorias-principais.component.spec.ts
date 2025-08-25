import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasPrincipaisComponent } from './categorias-principais.component';

describe('CategoriasPrincipaisComponent', () => {
  let component: CategoriasPrincipaisComponent;
  let fixture: ComponentFixture<CategoriasPrincipaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasPrincipaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasPrincipaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
