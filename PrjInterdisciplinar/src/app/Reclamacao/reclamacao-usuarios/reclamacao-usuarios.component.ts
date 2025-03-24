import { Component, OnInit } from '@angular/core';
import { ReclamacaoCardComponent } from '../reclamacao-card/reclamacao-card.component';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { Reclamacao } from '../../models/reclamacao';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-reclamacao-usuarios',
  standalone: true,
  imports: [ReclamacaoCardComponent,NotFoundComponent],
  templateUrl: './reclamacao-usuarios.component.html',
  styleUrl: './reclamacao-usuarios.component.css'
})
export class ReclamacaoUsuariosComponent implements OnInit {
  private reclamacaoSubject =new BehaviorSubject<Reclamacao[]>([] as any);
  data$:Observable<Reclamacao[]> = this.reclamacaoSubject.asObservable();

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
    // let lista : Reclamacao [];
    // lista = this.reclamacoes.find((reclamacao) =>{
    //   if()
    // })
  }
}
