import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamacaoEdicaoComponent } from './reclamacao-edicao.component';

describe('ReclamacaoEdicaoComponent', () => {
  let component: ReclamacaoEdicaoComponent;
  let fixture: ComponentFixture<ReclamacaoEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamacaoEdicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamacaoEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
