import { TestBed, inject } from '@angular/core/testing';

import { BrandService } from './brand.service';
import { HttpClient } from '@angular/common/http';

describe('BrandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandService]
    });
  });

  it('should be created', inject([BrandService], (service: BrandService) => {
    expect(service).toBeTruthy();
  }));
});
