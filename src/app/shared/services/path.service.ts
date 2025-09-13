import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PathService {
    public getActualParent(url: string): 'principal' | 'cidadao' | 'organizacao' {
        if (url.startsWith("/cidadao")) {
            return "cidadao";
        } else if (url.startsWith("/organizacao")) {
            return "organizacao";
        } else {
            return "principal";
        }
    }
}