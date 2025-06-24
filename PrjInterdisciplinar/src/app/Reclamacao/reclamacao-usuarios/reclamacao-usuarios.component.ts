import { IUser } from './../../models/interface/IUser.model';
import { Component, inject, OnInit } from '@angular/core';
import { ReclamacaoCardComponent } from '../reclamacao-card/reclamacao-card.component';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ReclamacaoService } from '../../Services/reclamacao.service';
import { IReclamacao } from '../../models/interface/IReclamacao.interface';
import { TagSelectComponent } from '../../Common/tag-select/tag-select.component';

@Component({
  selector: 'app-reclamacao-usuarios',
  standalone: true,
  imports: [
    ReclamacaoCardComponent,
    NotFoundComponent,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    TagSelectComponent,
  ],
  templateUrl: './reclamacao-usuarios.component.html',
  styleUrl: './reclamacao-usuarios.component.css',
})
export class ReclamacaoUsuariosComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private reclamacaoService = inject(ReclamacaoService);

  protected reclamacoes$!: Observable<IReclamacao[]>;
  protected user!: IUser;
  protected vazio: boolean = false;
  protected erro: string = '';
  TagSelect: FormGroup;

  constructor(private fb: FormBuilder) {
    this.TagSelect = this.fb.group({
      tagForm: ['Nenhum'],
    });
  }

  ngOnInit(): void {
    this.user = this.thisIsUser();

    this.getUserReclamacoes();
  }

  protected getUserReclamacoes() {
    this.reclamacoes$ = this.reclamacaoService.getByUser();

    this.reclamacoes$.subscribe({
      next: (reclamacoes) => {
        console.log(reclamacoes);
        if (reclamacoes.length === 0) {
          this.vazio = true;
          this.erro = 'Você não possuí Reclamações';
        }
      },
      error: (err) => {
        this.vazio = true;
        this.erro = 'Você não possuí Reclamações';
        console.error(err);
      },
    });

    this.TagSelect.valueChanges.subscribe(() => {
      console.log('Esta funcionando');
    });
  }

  private thisIsUser(): IUser {
    let user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['']);
    }
    return user as IUser;
  }
}
