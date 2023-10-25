import { TestBed } from '@angular/core/testing';

import { CatalogacionesService } from './catalogaciones.service';

describe('CatalogacionesService', () => {
  let service: CatalogacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
