import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../store';
import { getToken } from '../store/auth.reducer';
import { flatMap, first } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private store: Store<State>) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.store.pipe(
            select(getToken),
            first(),
            flatMap(token => {
                if (token != null) {
                    request = request.clone({
                        setHeaders: {
                            'Content-Type': 'application/json'
                        },
                        body: { ...request.body, 'token': token }
                    });
                }
                return next.handle(request);
            }));
    }
}