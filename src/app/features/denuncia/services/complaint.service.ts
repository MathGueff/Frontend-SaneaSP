import { CategoryGroup, ICategoria } from '@features/categoria/models/categoria.model';
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
      descricao: "Há um vazamento de esgoto em frente à minha casa, causando mau cheiro e risco à saúde dos moradores da região. O problema persiste há mais de uma semana e já foi reportado anteriormente, mas ainda não foi solucionado.",
      data: new Date("2025-09-15"),
      status: StatusDenuncia.Aberto,
      pontuacao: 10,
      Imagens: [
        { id: 1, nome: "user1.jpg" },
        { id: 1, nome: "user2.jpg" },
        { id: 1, nome: "user3.jpg" },
        { id: 1, nome: "user4.jpg" },
        { id: 1, nome: "user4.jpg" },
        { id: 1, nome: "user5.jpg" },
      ],
      Address: {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202"
      },
      Categorias: [
        { id: 1, nome: "Consumo de Água", group: CategoryGroup.WATER },
        { id: 2, nome: "Tratamento de Esgoto", group: CategoryGroup.SEWAGE },
        { id: 3, nome: "Drenagem Urbana", group: CategoryGroup.DRAINAGE },
        { id: 4, nome: "Limpeza Pública", group: CategoryGroup.CLEANING }
      ]
      },
      {
      id: 2,
      titulo: "Iluminação pública quebrada",
      descricao: "O poste da rua está sem luz há dias, deixando o local escuro e perigoso durante a noite. Moradores estão preocupados com a segurança, pois a falta de iluminação facilita furtos e dificulta o trânsito de pedestres.",
      data: new Date("2025-09-10"),
      status: StatusDenuncia.Aberto,
      pontuacao: 5,
      Address : {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202",
      },
      Imagens: [],
      Categorias: []
      },
      {
      id: 3,
      titulo: "Lixo acumulado",
      descricao: "A coleta de lixo não passou essa semana, resultando em acúmulo de resíduos nas calçadas e ruas. O mau cheiro está incomodando os moradores e há risco de proliferação de insetos e doenças.",
      data: new Date("2025-09-12"),
      status: StatusDenuncia.Aberto,
      pontuacao: 8,
      Address : {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202",
      },
      Imagens: [],
      Categorias: []
      },
      {
      id: 4,
      titulo: "Árvore caída na via",
      descricao: "Uma árvore caiu bloqueando a rua após a tempestade, impedindo o tráfego de veículos e pedestres. O incidente ocorreu há dois dias e ainda não houve remoção por parte da prefeitura. Moradores estão preocupados com possíveis acidentes.",
      data: new Date("2025-09-14"),
      status: StatusDenuncia.Aberto,
      pontuacao: 12,
      Address : {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202",
      },
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
        { id: 1, nome: "Galerias Pluviais", group : CategoryGroup.DRAINAGE},
        { id: 2, nome: "Preservação Ambiental", group : CategoryGroup.SEWAGE }
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