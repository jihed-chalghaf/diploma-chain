import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaIssueComponent } from './diploma-issue.component';

describe('DiplomaIssueComponent', () => {
  let component: DiplomaIssueComponent;
  let fixture: ComponentFixture<DiplomaIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
