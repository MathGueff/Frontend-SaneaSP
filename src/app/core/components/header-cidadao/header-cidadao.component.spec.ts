import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderCidadaoComponent } from "./header-cidadao.component";

describe("HeaderCidadaoComponent", () => {
  let component: HeaderCidadaoComponent;
  let fixture: ComponentFixture<HeaderCidadaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCidadaoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCidadaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
