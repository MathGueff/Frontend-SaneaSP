import { Component, inject, OnInit } from '@angular/core';
import { Reclamacao } from '../../models/class/reclamacao';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { IReclamacao } from '../../models/interface/IReclamacao.interface';
import { ReclamacaoService } from '../../Services/reclamacao.service';

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
  erro: string = ""
  caminhoVoltar : string = "../../"; //caminho para voltar para reclamação inicial

  constructor(private activedrouter : ActivatedRoute){}
  ngOnInit(): void {
    this.activedrouter.params.subscribe( (parametros) =>{
      // pega o valor do parametro da URL
      const idParametro = Number(parametros['id']);
      // procura a reclamação que tenha o ID da URL
      this.reclamacao$ = this.reclamacaoService.getByIdReclamacao(idParametro);

      if(!this.reclamacao$){
        this.existReclamcao = false;
        this.erro = "Denúncia Inexistente"
      }
    }
    )
  }
}
