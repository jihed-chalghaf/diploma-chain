import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaRequestComponent } from './diploma-request.component';

describe('DiplomaRequestComponent', () => {
  let component: DiplomaRequestComponent;
  let fixture: ComponentFixture<DiplomaRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
