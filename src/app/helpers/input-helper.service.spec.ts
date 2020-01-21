import { TestBed } from '@angular/core/testing';

import { InputHelperService } from './input-helper.service';

describe('InputHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputHelperService = TestBed.get(InputHelperService);
    expect(service).toBeTruthy();
  });
});
