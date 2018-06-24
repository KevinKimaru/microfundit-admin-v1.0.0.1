import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import  "rxjs/add/operator/do";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === "True")
            return next.handle(req.clone());
        const token = localStorage.getItem("token");
        if (token) {
            const clonedReq = req.clone({
                headers: req.headers.set("Authorization", `Bearer ${token}`)
            });
            return next.handle(clonedReq).do
                (succ => { },
                    (err: HttpErrorResponse) => {
                        if (err.status === 401) {
                            this.authService.sessionExpiredError = true;
                            this.router.navigate(['login']);
                        }
                    })
               
        }
        else {
            return next.handle(req).do(succ => {
                this.authService.authError = true;
                this.router.navigateByUrl('/login');
            },
                err => {
                    this.authService.authError = true;
                    this.router.navigateByUrl('/login');
                });
        }
    }
}
