import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'angular-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public exit() {
    console.log('Exit clicked');
  }
}
