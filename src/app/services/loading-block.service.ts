import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingBlockService {

  constructor() { }

  public isLoading$ = new Subject<boolean>();

  private startLoad() {
    this.isLoading$.next(true);
  }

  private endLoad() {
    this.isLoading$.next(false);
  }

  public callWithLoadBlock<T>(f): Observable<T> {
    this.startLoad();
    return f().pipe(tap(() => this.endLoad()));
  }
}
