import { Component, OnInit, Input } from '@angular/core';

export class User implements IUser{
  id: string;
  firstName: string;
  lastName: string
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string
}

@Component({
  selector: 'angular-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  public user: IUser;

  constructor() { }

  ngOnInit() {
  }

}
