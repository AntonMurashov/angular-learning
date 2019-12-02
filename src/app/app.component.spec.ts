import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';
import { routes} from "./app-routing.module"
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        CoreModule,
        CoursesModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent
      ],
      providers: [AuthorizationService, Location]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  }));
/*
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should nagigate to courses by default', fakeAsync(() => {
    console.log('loc1: ' + router);
    console.log('loc1: ' + location);
    router.navigate(['']);
    console.log('loc2: ' + location);
    tick();
    console.log('loc3: ' + location);
    expect(location.pathname).toBe("/courses");
  }));*/
});
