import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private nameSource = new BehaviorSubject<string>("");
  name = this.nameSource.asObservable();
  
  constructor() { }

  changeMessage(name: string) {
    this.nameSource.next(name);
  }
}
