import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCidadaoComponent } from './layout-cidadao.component';

describe('LayoutCidadaoComponent', () => {
  let component: LayoutCidadaoComponent;
  let fixture: ComponentFixture<LayoutCidadaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutCidadaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutCidadaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
