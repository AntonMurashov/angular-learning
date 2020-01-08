import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  title$ = new BehaviorSubject<string>("");
  
  constructor() { }

  changeMessage(title: string) {
    this.title$.next(title);
  }
}
