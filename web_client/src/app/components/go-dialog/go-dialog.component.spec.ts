import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoDialogComponent } from './go-dialog.component';

describe('GoDialogComponent', () => {
  let component: GoDialogComponent;
  let fixture: ComponentFixture<GoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
