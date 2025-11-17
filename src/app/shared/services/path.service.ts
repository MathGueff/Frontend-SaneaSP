import { Injectable } from '@angular/core';
import { HeaderType } from '@core/models/header.model';

@Injectable({ providedIn: 'root' })
export class PathService {
    public getActualParent(url: string): HeaderType {
        return url.startsWith("/cidadao") ? HeaderType.Cidadao : HeaderType.ORGANIZACAO;
    }
}