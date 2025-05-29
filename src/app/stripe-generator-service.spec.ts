import { TestBed } from '@angular/core/testing';

import { StripeGeneratorService } from './stripe-generator-service';

describe('StripeGeneratorService', () => {
  let service: StripeGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
