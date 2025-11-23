import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface IViacepAddress{
    logradouro : string, //rua
    bairro : string,
    localidade : string //No viacep cidade é localidade
    erro?: boolean
}

@Injectable({providedIn: 'root'})

export class ViacepService{
    constructor(private http : HttpClient){}
    public getAddress(cep : string) : Observable<IViacepAddress>{
        let apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
        return this.http.get<IViacepAddress>(apiUrl);
    }

    public getCepByAddress(rua: string, cidade: string, uf: string = 'SP'): Observable<any> {
        // ViaCEP exige todos os campos, mas bairro é opcional
        // Exemplo: https://viacep.com.br/ws/SP/Sorocaba/rua%20da%20penha/json/
        const url = `https://viacep.com.br/ws/${uf}/${encodeURIComponent(cidade)}/${encodeURIComponent(rua)}/json/`;
        return this.http.get<any>(url);
    }
}
