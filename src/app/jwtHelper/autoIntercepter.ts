import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../share/authentication.service';
import { Injectable } from '@angular/core';

const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AutoInterceptor implements HttpInterceptor{
    
    
    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        let authReq = req;
        const token = this.authService.jwt;
        if(token != null){
            req = req.clone({headers: req.headers.set(TOKEN_HEADER, 'Bearer '+token)})
            console.log(req)
        }

        return next.handle(authReq);
    }
}

export const autoInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AutoInterceptor, multi: true}
];