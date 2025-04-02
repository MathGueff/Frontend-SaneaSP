import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagModalComponent } from './tag-modal.component';

describe('TagModalComponent', () => {
  let component: TagModalComponent;
  let fixture: ComponentFixture<TagModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
