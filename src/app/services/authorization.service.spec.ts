import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { Consts } from '../consts/consts';
import { routes } from '../app-routing.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoursesModule } from '../courses/courses.module';
import { CoreModule } from '../core/core.module';

describe('AuthorizationService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({    
      imports: [
        FormsModule,
        CommonModule,
        CoursesModule,
        CoreModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
  })

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

  it('should clear username on logout', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    service.logout();
    expect(localStorage.getItem(Consts.LS_USERNAME)).toEqual(null);
  });
});
