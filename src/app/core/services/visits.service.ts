import { inject, Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { IVisitCreate, IVisits } from "@features/prefeitura/components/scheduling/models/visits.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class VisitsService extends BaseApiService {
    private httpClient = inject(HttpClient);
    private url = environment.domain + 'visitas/';

    getAllVisits():Observable<IVisits[]> {
       return this.httpClient.get<IVisits[]>(this.url);
    }

    createVisit(newVisit : IVisitCreate):Observable<IVisits>{
        return this.httpClient.post<IVisits>(this.url, newVisit)
    }
}