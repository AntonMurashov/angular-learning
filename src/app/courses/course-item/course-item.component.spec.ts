import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent, ICourse } from './course-item.component';
import { SimpleChange, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DurationPipe } from '../../pipes/duration.pipe';
import { CheckDateDirective } from '../../directives/check-date.directive';

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
      declarations: [CourseItemComponent, TestHostComponent, DurationPipe, CheckDateDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit delete item', () => {
    const itemToDelete = {
      id: 1,
      title: "title",
      creationDate: new Date(),
      durationMin: 0,
      description: "description"
    };
    const deleteButton = fixture.debugElement.query(By.css('button.button-delete'));
    deleteButton.triggerEventHandler('click', null);

    expect(testHost.itemToDelete).toEqual(itemToDelete.id);
  });
})

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemComponent, DurationPipe, CheckDateDirective]
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

  it('should log on edit', () => {
    const spy = spyOn(console, 'log');

    let button = fixture.debugElement.query(By.css('button.button-edit')).nativeElement;
    button.click();

    expect(spy).toHaveBeenCalledWith('Edit on course ' + component.item.id + ' clicked');
  });

  it('should log on ngOnChanges', () => {
    const spy = spyOn(console, 'log');
    let changes = {
      item: new SimpleChange(component.item, null, true)
    }

    component.ngOnChanges(changes);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('OnChanges ', changes);
  });

  it('should show title and time', () => {
    expect(fixture.debugElement.query(By.css('div.title')).nativeElement.innerText).toEqual(component.item.title.toUpperCase());
    expect(fixture.debugElement.query(By.css('div.time')).nativeElement.innerText).toEqual(component.item.durationMin + " min");
  });

  it('should listen for form changes', () => {
    spyOn(component.onDelete, 'emit');
    let button = fixture.debugElement.query(By.css('button.button-delete')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(component.onDelete.emit).toHaveBeenCalled();
  });
});
