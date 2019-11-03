import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { SimpleChange } from '@angular/core';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent ]
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
      description: "description"
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
/*
  it('should log on ngOnChanges', () => {
    const spy = spyOn(console, 'log');
    let changes = SimpleChange

    component.ngOnChanges(changes);

    expect(spy).toHaveBeenCalledWith('OnChanges ', changes);
  });*/
});
