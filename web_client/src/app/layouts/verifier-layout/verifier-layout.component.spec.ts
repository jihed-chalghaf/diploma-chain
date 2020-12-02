import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifierLayoutComponent } from './verifier-layout.component';

describe('VerifierLayoutComponent', () => {
  let component: VerifierLayoutComponent;
  let fixture: ComponentFixture<VerifierLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifierLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifierLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
