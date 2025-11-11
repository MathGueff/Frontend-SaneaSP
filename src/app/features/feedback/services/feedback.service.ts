import { IFeedbackDenuncia, ICreateFeedbackDenuncia, IWebFeedback, ICreateWebFeedback } from "../models/feedback.model";
import { catchError, firstValueFrom, Observable, switchMap, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { SweetAlertService } from "@shared/services/sweet-alert.service";
import { ErrorHandlerService } from "@core/services/error-handler.service";

@Injectable({ providedIn: 'root' })
export class FeedbackService {
    private API_URL = environment.domain + 'feedback'
    constructor(
        private httpClient: HttpClient,
        private sweetAlertService: SweetAlertService,
        private errorService: ErrorHandlerService
    ) { }

    // GETs
    public getCurrentFeedbackDenuncia(idDenuncia: number) {
        return this.httpClient.get<IFeedbackDenuncia[]>(`${this.API_URL}/denuncia/${idDenuncia}`);
    }

    public getDenunciaFeedbacks() {
        return this.httpClient.get<IFeedbackDenuncia[]>(`${this.API_URL}/denuncia`);
    }

    public getWebFeedbacks() {
        return this.httpClient.get<IWebFeedback[]>(`${this.API_URL}/web`);
    }

    //POSTs
    public postFeedbackDenuncia(feedbackDenuncia: ICreateFeedbackDenuncia) {
        return this.httpClient.post<IFeedbackDenuncia>(`${this.API_URL}/denuncia`, feedbackDenuncia).pipe(
            tap(() => this.sweetAlertService.feedbackSuccess('Feedback enviado com sucesso! Agradecemos por sua contribuição')),
            catchError(err => {
                this.errorService.handleError(err);
                throw err
            }),
        );
    }

    public postWebFeedback(webFeedback: ICreateWebFeedback) {
        return this.httpClient.post<IWebFeedback>(`${this.API_URL}/web`, webFeedback).pipe(
            tap(() => this.sweetAlertService.feedbackSuccess('Feedback enviado com sucesso! Agradecemos por sua contribuição')),
            catchError(err => {
                this.errorService.handleError(err);
                throw err
            }),
        );
    }
}