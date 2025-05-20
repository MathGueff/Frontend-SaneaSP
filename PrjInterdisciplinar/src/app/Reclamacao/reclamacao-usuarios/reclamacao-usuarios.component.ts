import { IUser } from './../../models/interface/IUser.model';
import { Component, inject, OnInit } from '@angular/core';
import { ReclamacaoCardComponent } from '../reclamacao-card/reclamacao-card.component';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../../Services/user.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Reclamacao } from '../../models/class/reclamacao';
import { type } from 'os';
import { IReclamacao } from '../../models/interface/IReclamacao.interface';


@Component({
  selector: 'app-reclamacao-usuarios',
  standalone: true,
  imports: [ReclamacaoCardComponent,NotFoundComponent,CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './reclamacao-usuarios.component.html',
  styleUrl: './reclamacao-usuarios.component.css'
})
export class ReclamacaoUsuariosComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private reclamacaoSubject =new BehaviorSubject<Reclamacao[]>([] as any);
  protected data$:Observable<Reclamacao[]> = this.reclamacaoSubject.asObservable();
  protected user !: IUser;
  protected vazio: boolean = true;
  protected erro : string = "";
  TagSelect : FormGroup;
  reclamacoes: Reclamacao [] = [
    {
      id: 1,
      titulo: "Falta de abastecimento de água",
      descricao: "Há três dias o bairro está sem água, afetando diversas famílias. A situação está insustentável, pois as pessoas não conseguem realizar atividades básicas como cozinhar, tomar banho ou lavar roupas. Entramos em contato com a companhia de saneamento, mas até agora não houve retorno sobre o motivo da interrupção ou previsão de normalização.",
      data: new Date("2024-11-28"),
      Tag: ["Abastecimento"],
      Imagem : ["img/paginas/reclamacoes/user1.jpg"],
      Usuario :{
        id: 1,
        nome: 'Matheus',
        email: 'gueff@gmail.com',
        senha: 'math',
        endereco:{
          cep: '18075718',
          bairro : 'Jardim Brasilândia',
          logradouro : 'Rua Alonco Muchon',
          cidade : 'Sorocaba'
        }
      },
      pontuacao:200,
      status:2
    },
  ];

  constructor(private fb:FormBuilder){
    this.TagSelect = this.fb.group({
      tagForm: ['Todos']
    })
  }

  ngOnInit(): void {

    // this.user =
    // {
    //   id: 2,
    //   nome: 'Davy',
    //   email: 'davy@gmail.com',
    //   senha: 'davy',
    //   endereco:{
    //     cep: '17571802',
    //     bairro : 'Jardim Europa',
    //     logradouro : 'Rua Rock',
    //     cidade : 'Votorantim'
    //   }
    // }

    this.user = this.thisIsUser();

    this.TagSelect.valueChanges.subscribe(()=>{
      console.log("Esta funcionando");
    })
    let lista : IReclamacao [];
    lista = this.reclamacoes.filter((reclamacao) =>{
      return (reclamacao.Usuario?.id === this.user?.id)
    })
    if(lista.length > 0 ){
      this.vazio = false;
      this.reclamacaoSubject.next(lista);
    }
    else{
      this.vazio = true;
      this.erro = "Nenhuma Reclamação encontrada";
    }
  }
 private thisIsUser() : IUser{
    let user = this.userService.getCurrentUser();
    if(!user){
      this.router.navigate(['']);
    }
    return user as IUser;
  }
}
