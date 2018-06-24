import { TestBed, inject } from '@angular/core/testing';

import { FundingService } from './funding.service';

describe('FundingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FundingService]
    });
  });

  it('should be created', inject([FundingService], (service: FundingService) => {
    expect(service).toBeTruthy();
  }));
});
