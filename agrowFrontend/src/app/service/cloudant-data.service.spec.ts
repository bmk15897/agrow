import { TestBed } from '@angular/core/testing';

import { CloudantDataService } from './cloudant-data.service';

describe('CloudantDataService', () => {
  let service: CloudantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
