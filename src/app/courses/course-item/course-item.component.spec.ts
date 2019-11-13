import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { SimpleChange } from '@angular/core';
import { DurationPipe } from '../../pipes/duration.pipe';
import { CheckDateDirective } from '../../directives/check-date.directive';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, DurationPipe, CheckDateDirective ]
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

    let button = fixture.debugElement.nativeElement.querySelector('button.button-edit');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should log on edit', () => {
    const spy = spyOn(console, 'log');

    let button = fixture.debugElement.nativeElement.querySelector('button.button-edit');
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
    expect(fixture.nativeElement.querySelector('div.title').innerText).toEqual(component.item.title.toUpperCase());
    expect(fixture.nativeElement.querySelector('div.time').innerText).toEqual(component.item.durationMin + " min");
  });

  it('should listen for form changes', () => {
    spyOn(component.onDelete, 'emit');
    let button = fixture.debugElement.nativeElement.querySelector('button.button-delete');
    button.click();
    fixture.detectChanges();
 
    expect(component.onDelete.emit).toHaveBeenCalled();
 });
});
