import { TestBed } from '@angular/core/testing';

import { LaborsService } from './labors.service';

describe('LaborsService', () => {
  let service: LaborsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaborsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
