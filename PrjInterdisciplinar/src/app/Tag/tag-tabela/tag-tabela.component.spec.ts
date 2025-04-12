import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagTabelaComponent } from './tag-tabela.component';

describe('UpdateTagComponent', () => {
  let component: TagTabelaComponent;
  let fixture: ComponentFixture<TagTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
