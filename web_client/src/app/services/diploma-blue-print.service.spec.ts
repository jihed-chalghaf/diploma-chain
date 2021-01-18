import { TestBed } from '@angular/core/testing';

import { DiplomaBluePrintService } from './diploma-blue-print.service';

describe('DiplomaBluePrintService', () => {
  let service: DiplomaBluePrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomaBluePrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
