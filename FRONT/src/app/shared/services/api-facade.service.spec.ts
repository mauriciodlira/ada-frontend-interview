import { TestBed } from '@angular/core/testing';

import { ApiFacadeService } from './api-facade.service';

describe('ApiFacadeService', () => {
  let service: ApiFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
