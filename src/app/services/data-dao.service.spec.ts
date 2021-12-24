import { TestBed } from '@angular/core/testing';

import { DataDAOService } from './data-dao.service';

describe('DataDAOService', () => {
  let service: DataDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
