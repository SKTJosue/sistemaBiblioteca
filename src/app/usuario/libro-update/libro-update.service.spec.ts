import { TestBed } from '@angular/core/testing';

import { LibroUpdateService } from './libro-update.service';

describe('LibroUpdateService', () => {
  let service: LibroUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibroUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
