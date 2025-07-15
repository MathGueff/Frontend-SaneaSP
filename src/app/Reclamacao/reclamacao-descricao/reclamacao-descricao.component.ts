import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { Reclamacao } from '../../models/class/reclamacao';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule, NgIfContext } from '@angular/common';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { IReclamacao } from '../../models/interface/IReclamacao.interface';
import { ReclamacaoService } from '../../Services/reclamacao.service';
import { StatusReclamacao } from '../../models/enums/StatusReclamacao.enum';

@Component({
  selector: 'app-reclamacao-descricao',
  standalone: true,
  imports: [CommonModule,RouterLink,NotFoundComponent],
  templateUrl: './reclamacao-descricao.component.html',
  styleUrl: './reclamacao-descricao.component.css'
})
export class ReclamacaoDescricaoComponent implements OnInit {
  //Observable de reclamacao
  private reclamacaoService = inject(ReclamacaoService);
  reclamacao$ !: Observable<IReclamacao | undefined>

  //variaveis para poder controlar o componente NotFound
  protected existReclamcao: boolean = true;
  erro: string = "";
  protected situation:string = "";
  caminhoVoltar : string = "../../"; //caminho para voltar para reclamação inicial
  constructor(private activedrouter : ActivatedRoute){}
  ngOnInit(): void {
    this.activedrouter.params.subscribe( (parametros) =>{
      // pega o valor do parametro da URL
      const idParametro = Number(parametros['id']);
      // procura a reclamação que tenha o ID da URL
      this.reclamacao$ = this.reclamacaoService.getByIdReclamacao(idParametro);
      this.reclamacao$.subscribe({
        next:(reclamacao)=> {
          if(reclamacao){
            this.situationDenuncia(reclamacao.status)
          }
          else{
            this.existReclamcao = false;
            this.erro = "Denúncia Inexistente"}
        },
      })
    }
    )
  }
  protected situationDenuncia(situacao: StatusReclamacao){
    switch (situacao) {
      case 0:
        this.situation = 'Aberto';
        break;
      case 1:
        this.situation = 'Visualizada';
        break;
      case 2:
        this.situation = 'Análise';
        break;
      default:
        this.situation = 'Resolvida';
        break;
    }
  }
}
