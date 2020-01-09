import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthorizationService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let token: String = this.authService.getToken();
        if (token != null) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                },
                body: {...request.body, 'token': token }
            });
        }
        return next.handle(request);
    }

}