import { TestBed } from '@angular/core/testing';

import { AuthTokenStorageService } from './auth-token-storage.service';

describe('AuthTokenStorageService', () => {
  let service: AuthTokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
