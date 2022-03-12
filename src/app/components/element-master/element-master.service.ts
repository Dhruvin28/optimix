import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ElementMasterService {
    constructor(
        private readonly http: HttpClient
    ) {}

    async getAllElements<T extends object>() {
        return await this.http.get<T>(environment.api + 'getAllElements').toPromise();
    }
}

export interface Element {
    rowNo: number;
    elementId: number;
    elementName: string;
    isChecked?: boolean;
    min?: string;
    max?: string;
    bathMin?: string;
    bathMax?: string;
    targetReading?: string;
}