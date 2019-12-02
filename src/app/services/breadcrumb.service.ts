import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private titleSource = new BehaviorSubject<string>("");
  title = this.titleSource.asObservable();
  
  constructor() { }

  changeMessage(title: string) {
    this.titleSource.next(title);
  }
}
