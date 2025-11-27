import { IDenunciaFeedback, TDenunciaFeedbackCreate, IInterfaceFeedback, TInterfaceFeedbackCreate  } from "@shared/models/feedback.model";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from '../../../environments/environment'

import { BaseApiService } from "@core/services/base-api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class FeedbackService extends BaseApiService {
    private API_URL =  environment.domain + "feedback"
    private httpClient = inject(HttpClient)

    public getDenunciaFeedback(idDenuncia : number) : Observable<IDenunciaFeedback> {
        return this.httpClient.get<IDenunciaFeedback>(this.API_URL + `/denuncia-feedback/denuncia/${idDenuncia}`);
    }

    public getAllDenunciaFeedbacks() : Observable<IDenunciaFeedback[]> {
        return this.httpClient.get<IDenunciaFeedback[]>(this.API_URL + `/denuncia-feedbacks`);
    }

    public getAllInterfaceFeedbacks() : Observable<IInterfaceFeedback[]> {
        return this.httpClient.get<IInterfaceFeedback[]>(this.API_URL + `/interface-feedbacks`);
    }

    public getInterfaceFeedbacksByTela(tela : string) : Observable<IInterfaceFeedback[]> {
        return this.httpClient.get<IInterfaceFeedback[]>(this.API_URL + `/interface-feedbacks/tela/${tela}`);
    }

    public postDenunciaFeedback(feedback : TDenunciaFeedbackCreate) : Observable<IDenunciaFeedback> {
        return this.httpClient.post<IDenunciaFeedback>(this.API_URL + `/denuncia-feedback`, feedback);
    }

    public postInterfaceFeedback(feedback : TInterfaceFeedbackCreate) : Observable<IInterfaceFeedback> {
        return this.httpClient.post<IInterfaceFeedback>(this.API_URL + `/interface-feedback`, feedback);
    }

    public deleteInterfaceFeedback(id : number) : Observable<void> {
        return this.httpClient.delete<void>(this.API_URL + `/interface-feedback/${id}`);
    }
}