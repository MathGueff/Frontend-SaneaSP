import { Reclamacao } from '../../models/class/reclamacao';
import { Component, inject, OnInit } from '@angular/core';
import { ReclamacaoCardComponent } from '../reclamacao-card/reclamacao-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, toArray } from 'rxjs';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { UserService } from '../../Services/user.service';
import { ReclamacaoService } from '../../Services/reclamacao.service';
import { IReclamacao } from '../../models/interface/IReclamacao.interface';



@Component({
  selector: 'app-reclamacao-inicial',
  standalone: true,
  imports: [CommonModule, ReclamacaoCardComponent, RouterLink, ReactiveFormsModule,NotFoundComponent],
  templateUrl: './reclamacao-inicial.component.html',
  styleUrl: '../reclamacao-usuarios/reclamacao-usuarios.component.css'
})
export class ReclamacaoInicialComponent implements OnInit {
  protected userService = inject(UserService);
  usuarioAtivo$ = this.userService.getObservableCurrentUser(); // Observable com as informações do admin
  protected reclamacaoService = inject(ReclamacaoService);
  protected reclamacoes$ !: Observable<IReclamacao[]>
  protected vazio: boolean = false; //significa q
  erro : string = "";
  TagSelect: FormGroup;

  constructor(private fb:FormBuilder){
    this.reclamacoes$ = this.reclamacaoService.getObservableReclamacao();
    this.TagSelect = this.fb.group({
        tagForm: ['Todos']
      }
    );
  }

  ngOnInit():void{
    this.TagSelect.valueChanges.subscribe(() => {
      //Verifica se nenhuma Tag foi selecionada
      if(this.TagSelect.value.tagForm === "Todos" || this.TagSelect.value.tagForm == ""){
        this.reclamacoes$ = this.reclamacaoService.getObservableReclamacao();
      }
      // Filtra o array de Reclamações pela tag selecionada
      else{
        this.reclamacoes$ = this.reclamacaoService.getObservableReclamacao()
      }
    });
    this.reclamacoes$.subscribe((reclamacoes)=>{
      if(reclamacoes.length === 0){
        this.vazio = true;
        this.erro = "Reclamações"
      }
    });

  }

}
