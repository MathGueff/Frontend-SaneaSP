import { Component, inject, Input } from '@angular/core';
import { IComment } from '@features/denuncia/models/comment.model';
import { ComplaintService } from '@features/denuncia/services/complaint.service';
import { AuthService } from '@core/services/auth.service';
import { UserType } from '@features/usuario/enums/user-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-card',
  imports: [CommonModule],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent {
  protected complaintService = inject(ComplaintService)
  protected authService = inject(AuthService)
  protected loggedUser = this.authService.currentUser()

  @Input() comment!: IComment

  get isMyComment() : boolean{
    if(!this.loggedUser) return false
    return this.loggedUser.id === this.comment.usuario.id
  }

  get isEmployee() : boolean{
    if(!this.comment.usuario.tipo) return false
    return this.comment.usuario.tipo === UserType.Funcionario
  }

  get cssClassByUserType(): string {
    if (!this.comment || !this.comment.usuario) return '';
    
    switch (this.isMyComment){
      case true:
        return 'my'
      case false:
        return 'other'
    }
  }
}
