import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';

describe('AuthorizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    expect(service).toBeTruthy();
  });

  it('should authentificate on login', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    service.Login('user','password');
    expect(service.IsAuthentificated()).toEqual(true);
  });

  it('should generate username on login', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    service.Login('user','password');
    expect(service.GetUserInfo()).toEqual('Test User (user)');
  });

  it('should unauthentificate on logout', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    service.Logout();
    expect(service.IsAuthentificated()).toEqual(false);
  });

  it('should clear username on logout', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    service.Logout();
  });
});
