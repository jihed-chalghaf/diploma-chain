import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaBlueprintCreateComponent } from './diploma-blueprint-create.component';

describe('DiplomaBlueprintCreateComponent', () => {
  let component: DiplomaBlueprintCreateComponent;
  let fixture: ComponentFixture<DiplomaBlueprintCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaBlueprintCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaBlueprintCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
