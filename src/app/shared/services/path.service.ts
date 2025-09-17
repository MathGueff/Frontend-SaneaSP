import { Injectable } from '@angular/core';
import { HeaderType } from '@core/models/header.model';

@Injectable({ providedIn: 'root' })
export class PathService {
    public getActualParent(url: string): HeaderType {
        if (url.startsWith("/cidadao")) {
            return HeaderType.CIDADAO;
        } else if (url.startsWith("/organizacao")) {
            return HeaderType.ORGANIZACAO;
        } else {
            return HeaderType.PRINCIPAL;
        }
    }
}