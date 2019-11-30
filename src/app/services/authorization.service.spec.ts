import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { Consts } from '../consts/consts';

describe('AuthorizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    expect(service).toBeTruthy();
  });

  it('should authentificate on login', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    service.login('user','password');
    expect(service.isAuthentificated()).toEqual(true);
  });

  it('should generate username on login', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    service.login('user','password');
    expect(service.getUserInfo()).toEqual('Test User (user)');
  });

  it('should unauthentificate on logout', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    service.logout();
    expect(service.isAuthentificated()).toEqual(false);
  });

  it('should clear username and token on logout', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    service.logout();
    expect(localStorage.getItem(Consts.LS_USERNAME)).toEqual(null);
    expect(localStorage.getItem(Consts.LS_TOKEN)).toEqual(null);
  });
});
