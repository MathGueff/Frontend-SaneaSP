import { ReclamacaoService } from './../../Services/reclamacao.service';
import { Reclamacao } from '../../models/class/reclamacao';
import { Component, inject, OnInit } from '@angular/core';
import { ReclamacaoCardComponent } from '../reclamacao-card/reclamacao-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { AuthService } from '../../Services/auth.service';
import { IReclamacao } from '../../models/interface/IReclamacao.interface';
import { TagSelectComponent } from '../../Common/tag-select/tag-select.component';
import { ITag } from '../../models/interface/ITag.model';

@Component({
  selector: 'app-reclamacao-inicial',
  standalone: true,
  imports: [
    CommonModule,
    ReclamacaoCardComponent,
    RouterLink,
    NotFoundComponent,
    TagSelectComponent,
  ],
  templateUrl: './reclamacao-inicial.component.html',
  styleUrl: '../reclamacao-usuarios/reclamacao-usuarios.component.css',
})
export class ReclamacaoInicialComponent implements OnInit {
  protected authService = inject(AuthService);
  protected reclamacaoService = inject(ReclamacaoService);
  usuarioAtivo$ = this.authService.currentUser$; // Observable com as informações do admin
  reclamacoes$ !: Observable<IReclamacao[]>
  private reclamacaoSubject =new BehaviorSubject<Reclamacao[]>([] as any);
  data$:Observable<Reclamacao[]> = this.reclamacaoSubject.asObservable();
  protected vazio: boolean = false;
  private tags: ITag[] = [];
  erro: string = 'Não foi possível encontrar nenhuma Reclamação';

  ngOnInit(): void {
    this.reclamacoes$ = this.reclamacaoService.getObservableReclamacao();
    this.getReclamacao()
  }
  protected ChangeTagsSelect($event: ITag[]) {
    this.tags = $event;
  }
  protected PesquisarPorTag() {
    if (this.tags.length === 0) {
      this.reclamacoes$ = this.reclamacaoService.getObservableReclamacao();
    } else {
      this.reclamacoes$ = this.reclamacaoService.getByTag(this.tags);
    }
    this.getReclamacao()
  }
  private getReclamacao(){
    this.reclamacoes$.subscribe({
      next: (reclamacoes) => {
        console.log(reclamacoes);
        if (reclamacoes.length === 0) {
          this.vazio = true;
        }
        else{
          this.vazio = false;
        }
      },
      error: (err) => {
        this.vazio = true;
        console.error(err);
      },
    });
  }
}
