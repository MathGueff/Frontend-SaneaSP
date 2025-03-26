import { Component, inject, OnInit } from '@angular/core';
import { ReclamacaoCardComponent } from '../reclamacao-card/reclamacao-card.component';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { Reclamacao } from '../../models/reclamacao';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../../Services/user.service';
import { IUser } from '../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reclamacao-usuarios',
  standalone: true,
  imports: [ReclamacaoCardComponent,NotFoundComponent],
  templateUrl: './reclamacao-usuarios.component.html',
  styleUrl: './reclamacao-usuarios.component.css'
})
export class ReclamacaoUsuariosComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private reclamacaoSubject =new BehaviorSubject<Reclamacao[]>([] as any);
  data$:Observable<Reclamacao[]> = this.reclamacaoSubject.asObservable();
  protected usuario : IUser | null = this.userService.getCurrentUser();
  erro : string = "";
  reclamacoes: Reclamacao[] = [
      {
    idReclamacao: 1,
    tituloReclamao: "Falta de abastecimento de água",
    descricaoReclamacao: "Há três dias o bairro está sem água, afetando diversas famílias. A situação está insustentável, pois as pessoas não conseguem realizar atividades básicas como cozinhar, tomar banho ou lavar roupas. Entramos em contato com a companhia de saneamento, mas até agora não houve retorno sobre o motivo da interrupção ou previsão de normalização.",
    dataReclamacao: "2024-11-28",
    objTag: "Abastecimento",
    objImagem : "img/paginas/reclamacoes/user1.jpg"
    }
  ]




  ngOnInit(): void {
    this.usuario = {
      id: 2,
      nome: 'Davy',
      email: 'davy@gmail.com',
      senha: 'davy',
      endereco:{
        cep: '17571802',
        bairro : 'Jardim Europa',
        logradouro : 'Rua Rock',
        cidade : 'Votorantim'
      }}

    if(!this.usuario){
      this.router.navigate(['']);
    }

    // let lista : Reclamacao [];
    // lista = this.reclamacoes.find((reclamacao) =>{
    //   if(reclamacao.)
    // })
  }
}
