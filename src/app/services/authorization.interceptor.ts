import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../store';
import { getIsAuthentificated, getToken } from '../store/auth.reducer';
import { map, flatMap } from 'rxjs/operators';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { isAuthentificated, getTokenAction } from '../store/auth.actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private store: Store<State>) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let token: String;
        this.store.dispatch(getTokenAction());
        return this.store.pipe(
            select(getToken),
            flatMap(v => {
                token = v;
                console.log(token);
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