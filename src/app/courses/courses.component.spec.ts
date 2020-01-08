import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { CourseItemComponent, ICourse } from './course-item/course-item.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { NoItemsComponent } from './no-items/no-items.component';
import { CheckDateDirective } from '../directives/check-date.directive';
import { DurationPipe } from '../pipes/duration.pipe';
import { FindPipe } from '../pipes/find.pipe';
import { CourseService } from '../services/course.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../core/core.module';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let courseService: CourseService;
  let breadcrumbService: BreadcrumbService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent, LoadMoreComponent, CourseItemComponent, NoItemsComponent, AddCourseComponent, CheckDateDirective, DurationPipe, OrderByPipe, FindPipe ],
      imports: [
        FormsModule,
        CommonModule,
        CoreModule,
        RouterTestingModule
      ],
      providers: [FindPipe, CourseService, BreadcrumbService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    courseService = TestBed.get(CourseService);
    breadcrumbService = TestBed.get(BreadcrumbService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addCourse', () => {
    let spy = spyOn(component, 'addCourse');

    let button = fixture.debugElement.query(By.css('button.add-button')).nativeElement;
    button.click();

    expect(spy).toHaveBeenCalled();
  });
/*
  it('should moe to AddingCourse on addCourse', () => {
    let button = fixture.debugElement.query(By.css('button.add-button')).nativeElement;
    button.click();

    expect(component.isAddingCourse).toEqual(true);
  });
*/
  it('should call service on deleteCourse', () => {
    const spy = spyOn(courseService, 'deleteCourse');
    
    component.onDeleteCourse(1);

    expect(spy).toHaveBeenCalled();
  });

  it('should call onSearchClick', () => {
    let spy = spyOn(component, 'onSearchClick');

    let button = fixture.debugElement.query(By.css('button.search-button')).nativeElement;
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should perform search', () => {
    let oldVisibleItems: ICourse[] = JSON.parse(JSON.stringify(component.visibleItems));
    let button = fixture.debugElement.query(By.css('button.search-button')).nativeElement;
    component.searchStr = '2';
    button.click();
    expect(component.visibleItems.map(i => i.id)).toEqual(oldVisibleItems.filter(i => i.title.includes(component.searchStr)).map(i => i.id));
  });
  
  it('should call service on init', () => {
    const spy = spyOn(courseService, 'findAll');
    component.ngOnInit();
    
    expect(spy).toHaveBeenCalled();
  });
});
