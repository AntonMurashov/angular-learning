import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'angular-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public loadMore() {
    console.log('LoadMore clicked');
  }
}
