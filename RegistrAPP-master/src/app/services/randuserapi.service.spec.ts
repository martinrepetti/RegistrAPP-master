import { TestBed } from '@angular/core/testing';

import { RanduserapiService } from './randuserapi.service';

describe('RanduserapiService', () => {
  let service: RanduserapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RanduserapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
