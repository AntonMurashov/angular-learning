import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'angular-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {

  @Output() onLoadMore = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  public loadMore() {
    this.onLoadMore.emit();
  }
}
