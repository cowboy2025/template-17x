import { TestBed } from '@angular/core/testing';

import { HcsSharedDataService } from './hcs-shared-data.service';

describe('HcsSharedDataService', () => {
  let service: HcsSharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HcsSharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
