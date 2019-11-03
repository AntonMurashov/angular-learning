import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent, LoadMoreComponent, CourseItemComponent ],
      imports: [
        FormsModule,
        CommonModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addCourse', () => {
    let spy = spyOn(component, 'addCourse');

    let button = fixture.debugElement.nativeElement.querySelector('button.add-button');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should log on addCourse', () => {
    const spy = spyOn(console, 'log');

    let button = fixture.debugElement.nativeElement.querySelector('button.add-button');
    button.click();

    expect(spy).toHaveBeenCalledWith('AddCourse clicked');
  });

  it('should call onSearchClick', () => {
    let spy = spyOn(component, 'onSearchClick');

    let button = fixture.debugElement.nativeElement.querySelector('button.search-button');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should log on onSearchClick', () => {
    const spy = spyOn(console, 'log');

    let button = fixture.debugElement.nativeElement.querySelector('button.search-button');
    component.searchStr = 'test';
    button.click();

    expect(spy).toHaveBeenCalledWith(component.searchStr);
  });
});
