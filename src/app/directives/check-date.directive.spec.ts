import { CheckDateDirective } from './check-date.directive';
import { ElementRef, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ICourse } from '../courses/course-item/course-item.component';

@Component({
  template: `
  <div [angularCheckDate]=items[0]></div>
  <div [angularCheckDate]=items[1]></div>
  <div [angularCheckDate]=items[2]></div>
  `
})
class TestComponent { 
  items: ICourse[];
}
describe('CheckDateDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directives: DebugElement[];
  
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ CheckDateDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    component = fixture.componentInstance;
    component.items = [{
      id: 1,
      name: "name",
      date: new Date(),
      length: 0,
      description: "description",
      isTopRated: true
    },
    {
      id: 2,
      name: "name",
      date: new Date(new Date().getTime() + 1 * 24 * 3600 * 1000),
      length: 0,
      description: "description",
      isTopRated: true
    },
    {
      id: 3,
      name: "name",
      date: new Date(new Date().getTime() - 15 * 24 * 3600 * 1000),
      length: 0,
      description: "description",
      isTopRated: true
    }];
    fixture.detectChanges();
  
    directives = fixture.debugElement.queryAll(By.directive(CheckDateDirective));
  });
  
  it('should create an instance', () => {
    let element: ElementRef;
    const directive = new CheckDateDirective(element);
    expect(directive).toBeTruthy();
  });

  it('should have three elements with CheckDateDirective', () => {
    expect(directives.length).toBe(3);
  });

  it('should color border to green for 1st element', () => {
    const borderColor = directives[0].nativeElement.style.borderColor; 
    expect(borderColor).toBe('green');
  });

  it('should color border to blue for 2nd element', () => {
    const borderColor = directives[1].nativeElement.style.borderColor; 
    expect(borderColor).toBe('blue');
  });

  it('should not color border for 3rd element', () => {
    const borderColor = directives[2].nativeElement.style.borderColor; 
    expect(borderColor).toBe(directives[2].nativeElement.style.color);
  });
});
