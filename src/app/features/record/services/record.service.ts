import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BaseApiService } from "@core/services/base-api.service";
import { environment } from "environments/environment";
import { ICreateRecord, IRecordy } from "../models/registrer.models";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class RecordService extends BaseApiService {
    private httpClient = inject(HttpClient);

    private urlApi: string = environment.domain + "registro";
    public getByRecordId(idRecord : number):Observable<IRecordy>{
        return this.httpClient.get<IRecordy>(`${this.urlApi}/${idRecord}`);
    }
    public createRecordId(newRecord:ICreateRecord):Observable<IRecordy>{
        return this.httpClient.post<IRecordy>(`${this.urlApi}`, newRecord);
    }
}