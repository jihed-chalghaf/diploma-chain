import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaListComponent } from './diploma-list.component';

describe('DiplomaListComponent', () => {
  let component: DiplomaListComponent;
  let fixture: ComponentFixture<DiplomaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
