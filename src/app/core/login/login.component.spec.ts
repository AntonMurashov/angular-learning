import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from 'src/app/services/authorization.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthorizationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        CommonModule
      ],
      providers: [ AuthorizationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthorizationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call service on login', () => {
    const spy = spyOn(authService, 'login');
    component.onLoginClick();
    
    expect(spy).toHaveBeenCalled();
  });  

  it('should return false on loginDisabled if no credentials, true otherwise', () => {
    const spy = spyOn(authService, 'login');
    component.email = '';
    component.password = '';
    expect(component.isLoginDisabled()).toEqual(true);
    component.email = 'email';
    component.password = '';
    expect(component.isLoginDisabled()).toEqual(true);
    component.password = 'password';
    expect(component.isLoginDisabled()).toEqual(false);
  });
});
