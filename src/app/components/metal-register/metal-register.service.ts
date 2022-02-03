import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class MetalRegisterService {
    constructor(private readonly http: HttpClient) { }

    getAllMetals<T extends object>(selectActive: string) {
        const params = new HttpParams().append('isDeleted', selectActive);
        return this.http.get<T>(environment.api + 'getAllMetals', {params: params} ).toPromise();
    }
    getMetalProperty<T extends object>(metalId: number) {
        const params = new HttpParams().append('metalId', metalId.toLocaleString());
        return this.http.get<T>(environment.api + 'getMetalProperty', {params: params} ).toPromise();
    }
    async deleteMetal<T extends object>(metalId: number) {
        const params = new HttpParams().append('metalId', metalId.toLocaleString());
        return await this.http.post<T>(environment.api + 'deleteMetal', {}, {params: params}).toPromise();
    }
}

export interface AllMetals {
    GradeStandard: string;
    IsDeleted: number
    MetalDensity: string;
    MetalId: number;
    MetalName: string;
    MetalType: string;
    ProductionGrade: string;
    ProductionGradeId: string;
    Remarks: string;
    isBath: number
    isError: string;
}
export interface MetalProperty {
    id: number;
    metalId: string;
    elementId: string;
    minValue: string;
    maxValue: string;
    bathMinimum: string;
    bathMaximum: string;
    targetReading: string;
}