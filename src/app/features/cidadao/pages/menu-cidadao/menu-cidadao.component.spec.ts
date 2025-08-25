import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCidadaoComponent } from './menu-cidadao.component';

describe('MenuComponent', () => {
  let component: MenuCidadaoComponent;
  let fixture: ComponentFixture<MenuCidadaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCidadaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCidadaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
