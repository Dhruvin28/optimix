import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class MetalMasterService {
    constructor(
        private readonly http: HttpClient
    ) {}

    async getMetalType<T extends object>() {
        return await this.http.get<T>(environment.api + 'getMetalType').toPromise();
    }
    async getMetalsInfo<T extends object>() {
        return await this.http.get<T>(environment.api + 'getMetalsInfo').toPromise();
    }
    async validateMetalName<T extends object>(metalName: string): Promise<any> {
        const params = new HttpParams().append('metalName', metalName);
        return await this.http.get<T>(environment.api + 'validateMetalName', {params: params}).toPromise();
    }
}

export interface FinalChem {
    id: number;
    element: string;
    min?: string;
    max?: string;
    target?: string;
}