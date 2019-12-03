import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

describe('DateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service).toBeTruthy();
  });

  it('should parse date', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service.parseDate('26.11.2019').toLocaleDateString('ru-RU')).toEqual('26.11.2019');
  });
});
