import { TestBed } from '@angular/core/testing';

import { GovDataService } from './gov-data.service';

describe('GovDataService', () => {
  let service: GovDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
