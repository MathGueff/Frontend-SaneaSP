import { Component, OnInit } from '@angular/core';
import { Reclamacao } from '../../models/class/reclamacao';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';

@Component({
  selector: 'app-reclamacao-descricao',
  standalone: true,
  imports: [CommonModule,RouterLink,NotFoundComponent],
  templateUrl: './reclamacao-descricao.component.html',
  styleUrl: './reclamacao-descricao.component.css'
})
export class ReclamacaoDescricaoComponent implements OnInit {
  //Observable de reclamacao
  private reclacaoSubject = new BehaviorSubject<Reclamacao | undefined>(undefined);
  dado$: Observable<Reclamacao | undefined> = this.reclacaoSubject.asObservable();

  //variaveis para poder controlar o componente NotFound
  protected vazio: boolean = true;
  erro: string = ""
  caminhoVoltar : string = "../../"; //caminho para voltar para reclamação inicial

  constructor(private activedrouter : ActivatedRoute){}
  ngOnInit(): void {
    this.activedrouter.params.subscribe( (parametros) =>{
      // pega o valor do parametro da URL
      const idParametro = Number(parametros['id']);
      // procura a reclamação que tenha o ID da URL
      const reclamacao = this.reclamacoes.find((reclamacao) => reclamacao.id  === idParametro );

      if(reclamacao !== undefined){
        this.reclacaoSubject.next(reclamacao);
        this.vazio = false;
      }else{
        this.erro = "reclamação";
        this.vazio = true;
      }

    }

    )
  }
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
      pontuacao: 200,
      status:2
    }
  ];
}
