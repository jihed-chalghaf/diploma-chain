import { TestBed } from '@angular/core/testing';

import { DiplomaService } from './diploma.service';

describe('DiplomaService', () => {
  let service: DiplomaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
