import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreComponent } from './load-more.component';

describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent;
  let fixture: ComponentFixture<LoadMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call loadMore', () => {
    let spy = spyOn(component, 'loadMore');

    let button = fixture.debugElement.nativeElement.querySelector('div.text');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should log on loadMore', () => {
    const spy = spyOn(console, 'log');

    let button = fixture.debugElement.nativeElement.querySelector('div.text');
    button.click();

    expect(spy).toHaveBeenCalledWith('LoadMore clicked');
  });
});
