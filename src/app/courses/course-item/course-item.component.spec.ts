import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent, ICourse } from './course-item.component';
import { SimpleChange, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DurationPipe } from '../../pipes/duration.pipe';
import { CheckDateDirective } from '../../directives/check-date.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { Router } from '@angular/router';
import { CoursesModule } from '../courses.module';
import { CoreModule } from 'src/app/core/core.module';

@Component({
  template: `<angular-course-item (onDeleteCourse)="onDeleteCourse($event)" [item]="item">
  </angular-course-item>`
})
class TestHostComponent {
  public item = {
    id: 1,
    title: "title",
    creationDate: new Date(),
    durationMin: 0,
    description: "description"
  };
  public itemToDelete: number;
  public onDeleteCourse(currentItem: number) {
    this.itemToDelete = currentItem;
  }
}

  describe('TestHostComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let item: ICourse;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [CourseItemComponent, TestHostComponent, DurationPipe, CheckDateDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });
})


describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        CoursesModule,
        CoreModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.item = {
      id: 1,
      title: "title",
      creationDate: new Date(),
      durationMin: 0,
      description: "description",
      topRated: true
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log on ngOnInit', () => {
    const spy = spyOn(console, 'log');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('ngOnInit called');
  });

  it('should call edit', () => {
    let spy = spyOn(component, 'edit');

    let button = fixture.debugElement.query(By.css('button.button-edit')).nativeElement;
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should show title and time', () => {
    expect(fixture.debugElement.query(By.css('div.title')).nativeElement.innerText).toEqual(component.item.title.toUpperCase());
    expect(fixture.debugElement.query(By.css('div.time')).nativeElement.innerText).toEqual(component.item.durationMin + " min");
  });

// TODO: dealing with confirmation windows  
/*  
  it('should listen for form changes', () => {
    spyOn(component.onDelete, 'emit');
    let button = fixture.debugElement.query(By.css('button.button-delete')).nativeElement;
    button.click();
    fixture.detectChanges(); 

    expect(component.onDelete.emit).toHaveBeenCalled();
  });*/
});
