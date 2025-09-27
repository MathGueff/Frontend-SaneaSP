import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCategoriesComponent } from './top-categories.component';

describe('CategoriasPrincipaisComponent', () => {
  let component: TopCategoriesComponent;
  let fixture: ComponentFixture<TopCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
