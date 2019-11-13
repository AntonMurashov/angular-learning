import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { CourseItemComponent, ICourse } from './course-item/course-item.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { NoItemsComponent } from './no-items/no-items.component';
import { CheckDateDirective } from '../directives/check-date.directive';
import { DurationPipe } from '../pipes/duration.pipe';
import { FindPipe } from '../pipes/find.pipe';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent, LoadMoreComponent, CourseItemComponent, NoItemsComponent, CheckDateDirective, DurationPipe, OrderByPipe, FindPipe ],
      imports: [
        FormsModule,
        CommonModule
      ],
      providers: [FindPipe]
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
    console.log(component.visibleItems);
    let oldVisibleItems: ICourse[] = JSON.parse(JSON.stringify(component.visibleItems));
    let button = fixture.debugElement.nativeElement.querySelector('button.search-button');
    component.searchStr = '2';
    button.click();

    expect(component.visibleItems.map(i => i.id)).toEqual(oldVisibleItems.filter(i => i.title.includes(component.searchStr)).map(i => i.id));
  });
});
