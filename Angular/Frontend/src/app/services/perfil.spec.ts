import { TestBed } from '@angular/core/testing';

import { Perfil } from './perfilService';

describe('Perfil', () => {
  let service: Perfil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Perfil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
