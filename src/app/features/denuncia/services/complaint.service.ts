import { CategoryGroup, ICategory } from '@features/categoria/models/category.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "@core/services/auth.service";
import { environment } from 'environments/environment';
import { ICreateComplaint, IComplaint, ComplaintStatus } from '../models/complaint.model';

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
      titulo: "Vazamento de esgoto",
      descricao: "Há um vazamento de esgoto em frente à minha casa, causando mau cheiro e risco à saúde dos moradores da região. O problema persiste há mais de uma semana e já foi reportado anteriormente, mas ainda não foi solucionado.",
      dataPublicacao: new Date("2025-09-15"),
      status: ComplaintStatus.Aberto,
      pontuacao: 10,
      imagens: [
        { id: 1, nome: "user1.jpg" },
        { id: 1, nome: "user2.jpg" },
        { id: 1, nome: "user3.jpg" },
        { id: 1, nome: "user4.jpg" },
        { id: 1, nome: "user4.jpg" },
        { id: 1, nome: "user5.jpg" },
      ],
      endereco: {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202"
      },
      usuario: {
        id: 1,
        nome: "João da Silva",
        email: "joao@email.com",
        senha: "123"
      },
      categorias: [
        { id: 1, nome: "Consumo de Água", grupo: CategoryGroup.WATER },
        { id: 2, nome: "Tratamento de Esgoto", grupo: CategoryGroup.SEWAGE },
        { id: 3, nome: "Drenagem Urbana", grupo: CategoryGroup.DRAINAGE },
        { id: 4, nome: "Limpeza Pública", grupo: CategoryGroup.CLEANING }
      ]
      },
      {
      id: 2,
      titulo: "Iluminação pública quebrada",
      descricao: "O poste da rua está sem luz há dias, deixando o local escuro e perigoso durante a noite. Moradores estão preocupados com a segurança, pois a falta de iluminação facilita furtos e dificulta o trânsito de pedestres.",
      dataPublicacao: new Date("2025-09-10"),
      status: ComplaintStatus.Aberto,
      pontuacao: 5,
      endereco : {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202",
      },
      usuario: {
        id: 2,
        nome: "Maria Oliveira",
        email: "maria@email.com",
        senha: "456"
      },
      imagens: [],
      categorias: []
      },
      {
      id: 3,
      titulo: "Lixo acumulado",
      descricao: "A coleta de lixo não passou essa semana, resultando em acúmulo de resíduos nas calçadas e ruas. O mau cheiro está incomodando os moradores e há risco de proliferação de insetos e doenças.",
      dataPublicacao: new Date("2025-09-12"),
      status: ComplaintStatus.Aberto,
      pontuacao: 8,
      endereco : {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202",
      },
      usuario: {
        id: 3,
        nome: "Carlos Souza",
        email: "carlos@email.com",
        senha: "789"
      },
      imagens: [],
      categorias: []
      },
      {
      id: 4,
      titulo: "Árvore caída na via",
      descricao: "Uma árvore caiu bloqueando a rua após a tempestade, impedindo o tráfego de veículos e pedestres. O incidente ocorreu há dois dias e ainda não houve remoção por parte da prefeitura. Moradores estão preocupados com possíveis acidentes.",
      dataPublicacao: new Date("2025-09-14"),
      status: ComplaintStatus.Aberto,
      pontuacao: 12,
      endereco : {
        cep: "12345-678",
        cidade: "São Paulo",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        numero: "100",
        complemento: "Apto 202",
      },
      usuario: {
        id: 1,
        nome: "João da Silva",
        email: "joao@email.com",
        senha: "123"
      },
      imagens: [
        { id: 1, nome: "https://exemplo.com/imagem1.jpg" },
        { id: 2, nome: "https://exemplo.com/imagem2.jpg" }
      ],
      categorias: [
        { id: 1, nome: "Galerias Pluviais", grupo : CategoryGroup.DRAINAGE},
        { id: 2, nome: "Preservação Ambiental", grupo : CategoryGroup.SEWAGE }
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

  public postReclamacao(reclamacao: ICreateComplaint):Observable<IComplaint>{
    const headers = this.setHeader();
    const user = this.authService.getCurrentUser();
    if(user){
      reclamacao.idUsuario = user.id as number;
    }
    return this.httpClient.post<IComplaint>(`${this.urlApi}`, reclamacao,{headers})
  }
  public putReclamacao(reclamacao:ICreateComplaint, idReclamacao: number){
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