import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private readonly router: Router,
        private readonly http: HttpClient
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.getValidateToken().pipe(map((response: boolean) => {
            if (response) {
                return response;
            }
            else {
                this.router.navigate(['login']);
                return response;
            }

        }));
    }
    getValidateToken(): any {
        return this.http.post(environment.api + 'validateToken', '', this.getHeaders());
    }
    getHeaders(): any {
        return {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
            })
        };
    }
}
