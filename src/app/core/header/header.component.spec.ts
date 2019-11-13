import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo/logo.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, LogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call exit', () => {
    let spy = spyOn(component, 'exit');

    let button = fixture.debugElement.nativeElement.querySelector("img[src='assets/img/ic-exit.svg']");
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should log on exit', () => {
    const spy = spyOn(console, 'log');

    let button = fixture.debugElement.nativeElement.querySelector("img[src='assets/img/ic-exit.svg']");
    button.click();

    expect(spy).toHaveBeenCalledWith('Exit clicked');
  });
});
