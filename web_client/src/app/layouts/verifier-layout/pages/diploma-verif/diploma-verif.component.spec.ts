import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaVerifComponent } from './diploma-verif.component';

describe('DiplomaVerifComponent', () => {
  let component: DiplomaVerifComponent;
  let fixture: ComponentFixture<DiplomaVerifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaVerifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaVerifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
