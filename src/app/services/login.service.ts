import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private readonly http: HttpClient) {
    }

    checkLogin(loginModule: LoginModule): Observable<Object> {
        const endPoint = 'checkLogin';
        return this.http.post<LoginModule>(environment.api + endPoint, loginModule)
            .pipe(
            );

    }
}

export interface LoginModule {
    userName: string;
    password: string;
}