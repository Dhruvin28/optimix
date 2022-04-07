import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

export interface SignUpModel {
    companyName: string;
    userName: string;
    password: string;
    email: string;
    mobileNumber: string;
}

@Injectable({
    providedIn: 'root'
})
export class SignUpService {
    constructor(private readonly http: HttpClient) {}

    emailOTP = 0;
    mobileOTP = 0;
    checkUniqueCompanyName<T extends object>(companyName: string) {
        const params = new HttpParams().append('companyName', companyName);
        return this.http.get<T>(environment.api + 'checkUniqueCompanyName', {params: params} ).toPromise();
    }
    checkUniqueUserName<T extends object>(userName: string) {
        const params = new HttpParams().append('userName', userName);
        return this.http.get<T>(environment.api + 'checkUniqueUserName', {params: params} ).toPromise();
    }
    checkUniqueEmail<T extends object>(email: string) {
        const params = new HttpParams().append('email', email);
        return this.http.get<T>(environment.api + 'checkUniqueEmail', {params: params} ).toPromise();
    }
    checkUniqueMobile<T extends object>(mobile: string) {
        const params = new HttpParams().append('mobile', mobile);
        return this.http.get<T>(environment.api + 'checkUniqueMobile', {params: params} ).toPromise();
    }
    sendEmailOTP<T extends object>(email: string, otp: number) {
        const params = new HttpParams().append('email', email).append("otp", otp.toString());
        return this.http.get<T>(environment.api + 'sendEmailOTP', {params: params} ).toPromise();
    }
    async signUp<T extends object>(signUpModel: SignUpModel) {
        return await this.http.post<T>(environment.api + 'signUp', signUpModel).toPromise();
    }
}