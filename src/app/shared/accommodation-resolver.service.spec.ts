import { TestBed } from '@angular/core/testing';

import { AccommodationResolverService } from './accommodation-resolver.service';

describe('AccommodationResolverService', () => {
  let service: AccommodationResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
