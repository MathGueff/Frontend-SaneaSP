import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { IDataGraph } from '@shared/models/graph.model';
import { EnviromentService } from '@core/services/enviroment.service';
export interface BigPoints{
    cidade: string,
    bairro ?: string,
    pontuacao : number
}

@Injectable({providedIn: 'root'})

export class DataGraph{
    private envService = inject(EnviromentService);
    private URL = this.envService.getUrl() +'graph/';
    
    constructor(private http : HttpClient){}
    public getBigPoints(cidade ?:string) : Observable<BigPoints[]>{
        let apiURL = `${this.URL}maioresPontuacoes`;
        if(cidade){
            apiURL += `?cidade=${cidade}`
        }
        return this.http.get<BigPoints[]>(apiURL);
    }
    public convertBigPointInChar(bigPoint:BigPoints[]):IDataGraph{
        let graph:IDataGraph = {
            labels:[],
            datasets:[
                {
                    label:'Pontuação',
                    data:[],
                    backgroundColor:[],
                    borderColor:[],
                    borderWidth:1
                }
            ]
        };
        bigPoint.forEach((data)=>{
            if(data.bairro){
                graph.labels.push(data.bairro);
            }
            else{
                graph.labels.push(data.cidade);
            }
            graph.datasets[0].data.push(Number(data.pontuacao));
            graph.datasets[0].backgroundColor!.push('#295a80');
            graph.datasets[0].borderColor?.push('#295a80');
        })
        return graph;
    }

    public getCities() : Observable<string[]>{
        return this.http.get<string[]>(`${this.URL}cidades`)
    }
}