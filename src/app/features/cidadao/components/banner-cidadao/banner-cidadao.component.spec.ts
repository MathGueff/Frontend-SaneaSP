import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCidadaoComponent } from './banner-cidadao.component';

describe('BannerComponent', () => {
  let component: BannerCidadaoComponent;
  let fixture: ComponentFixture<BannerCidadaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCidadaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerCidadaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
