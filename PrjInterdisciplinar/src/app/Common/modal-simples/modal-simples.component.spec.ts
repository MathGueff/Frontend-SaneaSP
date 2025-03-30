import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSimplesComponent } from './modal-simples.component';

describe('ModalSimplesComponent', () => {
  let component: ModalSimplesComponent;
  let fixture: ComponentFixture<ModalSimplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSimplesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSimplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
