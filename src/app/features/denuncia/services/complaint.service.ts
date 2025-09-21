import { ICategoria } from '@features/categoria/models/categoria.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "@core/services/auth.service";
import { environment } from 'environments/environment';
import { ICreateDenuncia, IDenuncia, StatusDenuncia } from '../models/denuncia.model';

@Injectable ({providedIn:'root'})
export class ComplaintService{
  //
  private urlApi:string = environment.domain +"denuncia";

  private authService = inject(AuthService);
  
  constructor(private httpClient:HttpClient){}

  //MÉTODO PARA TESTE
  public getTestComplaints(){
    const denuncias: IDenuncia[] = [
      {
        id: 1,
        titulo: "Vazamento de esgoto",
        descricao: "Há um vazamento de esgoto em frente à minha casa.",
        data: new Date("2025-09-15"),
        status: StatusDenuncia.Aberto,
        pontuacao: 10,
        Imagens: [],
        Categorias: []
      },
      {
        id: 2,
        titulo: "Iluminação pública quebrada",
        descricao: "O poste da rua está sem luz há dias.",
        data: new Date("2025-09-10"),
        status: StatusDenuncia.Aberto,
        pontuacao: 5,
        Imagens: [],
        Categorias: []
      },
      {
        id: 3,
        titulo: "Lixo acumulado",
        descricao: "A coleta de lixo não passou essa semana.",
        data: new Date("2025-09-12"),
        status: StatusDenuncia.Aberto,
        pontuacao: 8,
        Imagens: [],
        Categorias: []
      },
      {
        id: 4,
        titulo: "Árvore caída na via",
        descricao: "Uma árvore caiu bloqueando a rua após a tempestade.",
        data: new Date("2025-09-14"),
        status: StatusDenuncia.Aberto,
        pontuacao: 12,
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        rua: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202",
        Usuario: {
          id: 1,
          nome: "João da Silva",
          email: "joao@email.com",
          senha: "123"
        },
        Imagens: [
          { id: 1, nome: "https://exemplo.com/imagem1.jpg" },
          { id: 2, nome: "https://exemplo.com/imagem2.jpg" }
        ],
        Categorias: [
          { id: 1, nome: "Infraestrutura" },
          { id: 2, nome: "Meio Ambiente" }
        ]
      }
    ]
    return denuncias;
  }

  public getObservableReclamacao() : Observable<IDenuncia[]> {
    return this.httpClient.get<IDenuncia[]>(`${this.urlApi}/`)
  }

  public getByIdReclamacao(id:number):Observable<IDenuncia>{
    return  this.httpClient.get<IDenuncia>(`${this.urlApi}/${id}`);
  }

  public getByTag(tags:ICategoria[],idUsuario?:number):Observable<IDenuncia[]>{
    let query:string = ""
    tags.forEach((tag,i)=>{
      query += `tags=${tag.id}`;
      if(i+1 !== tags.length) query += '&'
    })
    if(idUsuario){
      query += `&idUsuario=${idUsuario}`
    }
    return this.httpClient.get<IDenuncia[]>(`${this.urlApi}/tags/?${query}`)
  }

  public postReclamacao(reclamacao: ICreateDenuncia):Observable<IDenuncia>{
    const headers = this.setHeader();
    const user = this.authService.getCurrentUser();
    if(user){
      reclamacao.idUsuario = user.id as number;
    }
    return this.httpClient.post<IDenuncia>(`${this.urlApi}`, reclamacao,{headers})
  }
  public putReclamacao(reclamacao:ICreateDenuncia, idReclamacao: number){
    const headers = this.setHeader();
    return this.httpClient.put<IDenuncia>(`${this.urlApi}/${idReclamacao}`,reclamacao, {headers})
  }
  public deleteReclamacao(idReclamacao:number){
    const headers = this.setHeader();
    return this.httpClient.delete<IDenuncia>(`${this.urlApi}/${idReclamacao}`,{headers})
  }

  public getByUser():Observable<IDenuncia[]>{
    const headers = this.setHeader();
    return this.httpClient.get<IDenuncia[]>(`${this.urlApi}/usuario`,{headers})
  }

  private setHeader():HttpHeaders{
    const token = this.authService.getAuthToken();
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set('Authorization',token)
    }
    return headers
  }
}