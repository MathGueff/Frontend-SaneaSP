import { CategoryGroup, ICategory } from '@features/categoria/models/category.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "@core/services/auth.service";
import { environment } from 'environments/environment';
import { ICreateDenuncia, IComplaint, ComplaintStatus } from '../models/complaint.model';

@Injectable ({providedIn:'root'})
export class ComplaintService{
  //
  private urlApi:string = environment.domain +"denuncia";

  private authService = inject(AuthService);
  
  constructor(private httpClient:HttpClient){}

  //MÉTODO PARA TESTE
  public getTestComplaints(){
    const denuncias: IComplaint[] = [
      { 
      id: 1,
      title: "Vazamento de esgoto",
      description: "Há um vazamento de esgoto em frente à minha casa, causando mau cheiro e risco à saúde dos moradores da região. O problema persiste há mais de uma semana e já foi reportado anteriormente, mas ainda não foi solucionado.",
      date: new Date("2025-09-15"),
      status: ComplaintStatus.Aberto,
      score: 10,
      images: [
        { id: 1, name: "user1.jpg" },
        { id: 1, name: "user2.jpg" },
        { id: 1, name: "user3.jpg" },
        { id: 1, name: "user4.jpg" },
        { id: 1, name: "user4.jpg" },
        { id: 1, name: "user5.jpg" },
      ],
      address: {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202"
      },
      user: {
        id: 1,
        name: "João da Silva",
        email: "joao@email.com",
        password: "123"
      },
      categories: [
        { id: 1, name: "Consumo de Água", group: CategoryGroup.WATER },
        { id: 2, name: "Tratamento de Esgoto", group: CategoryGroup.SEWAGE },
        { id: 3, name: "Drenagem Urbana", group: CategoryGroup.DRAINAGE },
        { id: 4, name: "Limpeza Pública", group: CategoryGroup.CLEANING }
      ]
      },
      {
      id: 2,
      title: "Iluminação pública quebrada",
      description: "O poste da rua está sem luz há dias, deixando o local escuro e perigoso durante a noite. Moradores estão preocupados com a segurança, pois a falta de iluminação facilita furtos e dificulta o trânsito de pedestres.",
      date: new Date("2025-09-10"),
      status: ComplaintStatus.Aberto,
      score: 5,
      address : {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202",
      },
      user: {
        id: 2,
        name: "Maria Oliveira",
        email: "maria@email.com",
        password: "456"
      },
      images: [],
      categories: []
      },
      {
      id: 3,
      title: "Lixo acumulado",
      description: "A coleta de lixo não passou essa semana, resultando em acúmulo de resíduos nas calçadas e ruas. O mau cheiro está incomodando os moradores e há risco de proliferação de insetos e doenças.",
      date: new Date("2025-09-12"),
      status: ComplaintStatus.Aberto,
      score: 8,
      address : {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202",
      },
      user: {
        id: 3,
        name: "Carlos Souza",
        email: "carlos@email.com",
        password: "789"
      },
      images: [],
      categories: []
      },
      {
      id: 4,
      title: "Árvore caída na via",
      description: "Uma árvore caiu bloqueando a rua após a tempestade, impedindo o tráfego de veículos e pedestres. O incidente ocorreu há dois dias e ainda não houve remoção por parte da prefeitura. Moradores estão preocupados com possíveis acidentes.",
      date: new Date("2025-09-14"),
      status: ComplaintStatus.Aberto,
      score: 12,
      address : {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202",
      },
      user: {
        id: 1,
        name: "João da Silva",
        email: "joao@email.com",
        password: "123"
      },
      images: [
        { id: 1, name: "https://exemplo.com/imagem1.jpg" },
        { id: 2, name: "https://exemplo.com/imagem2.jpg" }
      ],
      categories: [
        { id: 1, name: "Galerias Pluviais", group : CategoryGroup.DRAINAGE},
        { id: 2, name: "Preservação Ambiental", group : CategoryGroup.SEWAGE }
      ]
      }
    ]
    return denuncias;
  }

  public getObservableReclamacao() : Observable<IComplaint[]> {
    return this.httpClient.get<IComplaint[]>(`${this.urlApi}/`)
  }

  public getByIdReclamacao(id:number):Observable<IComplaint>{
    return  this.httpClient.get<IComplaint>(`${this.urlApi}/${id}`);
  }

  public getByTag(tags:ICategory[],idUsuario?:number):Observable<IComplaint[]>{
    let query:string = ""
    tags.forEach((tag,i)=>{
      query += `tags=${tag.id}`;
      if(i+1 !== tags.length) query += '&'
    })
    if(idUsuario){
      query += `&idUsuario=${idUsuario}`
    }
    return this.httpClient.get<IComplaint[]>(`${this.urlApi}/tags/?${query}`)
  }

  public postReclamacao(reclamacao: ICreateDenuncia):Observable<IComplaint>{
    const headers = this.setHeader();
    const user = this.authService.getCurrentUser();
    if(user){
      reclamacao.idUsuario = user.id as number;
    }
    return this.httpClient.post<IComplaint>(`${this.urlApi}`, reclamacao,{headers})
  }
  public putReclamacao(reclamacao:ICreateDenuncia, idReclamacao: number){
    const headers = this.setHeader();
    return this.httpClient.put<IComplaint>(`${this.urlApi}/${idReclamacao}`,reclamacao, {headers})
  }
  public deleteReclamacao(idReclamacao:number){
    const headers = this.setHeader();
    return this.httpClient.delete<IComplaint>(`${this.urlApi}/${idReclamacao}`,{headers})
  }

  public getByUser():Observable<IComplaint[]>{
    const headers = this.setHeader();
    return this.httpClient.get<IComplaint[]>(`${this.urlApi}/usuario`,{headers})
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