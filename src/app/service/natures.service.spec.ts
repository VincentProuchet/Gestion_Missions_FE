import { TestBed } from '@angular/core/testing';

import { NaturesService } from './natures.service';

describe('NaturesService', () => {
  let service: NaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
