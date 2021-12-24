import { TestBed } from '@angular/core/testing';

import { DataBUSService } from './data-bus.service';

describe('DataBUSService', () => {
  let service: DataBUSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBUSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
