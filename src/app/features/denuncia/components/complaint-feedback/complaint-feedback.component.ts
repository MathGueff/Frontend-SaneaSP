import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IComment, ICommentCreate } from "@features/denuncia/models/comment.model";
import { CommentService } from "@features/denuncia/services/comment.service";
import { CommentCardComponent } from "@features/denuncia/components/comment-card/comment-card.component";
import { CommonModule } from "@angular/common";
import { SocketService } from "@core/services/socket.service";
import { AuthService } from "@core/services/auth.service";
import { ToastService } from "@shared/services/toast.service";

@Component({
  selector: "app-complaint-feedback",
  imports: [CommentCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: "./complaint-feedback.component.html",
  styleUrls: [
    "./complaint-feedback.component.css",
    "../../../../shared/styles/form.style.css",
  ],
})
export class ComplaintFeedbackComponent implements OnInit {
  protected MAX_COMMENTS = 6;

  private authService = inject(AuthService);
  private socketService = inject(SocketService);
  private toastService = inject(ToastService)
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  //Será substituido pelo feedback real
  descricao: string | null = null;
  //"Fiquei impressionado com a rapidez e a eficiência na solução do problema que relatei. O esgoto irregular que denunciei foi removido, e agora a região está limpa e segura. Acompanhar o processo pelo sistema foi simples e transparente. Agradeço à equipe responsável e espero que continuem mantendo esse nível de atenção às denúncias da comunidade.";

  protected comments: IComment[] = [];
  protected commentForm: FormGroup = this.fb.group({
   newComment : ["", [Validators.max(500), Validators.required]]
  });
  protected complaintId = this.route.snapshot.paramMap.get("id");
  protected user = this.authService.currentUser()

  ngOnInit(): void {
    if (!this.complaintId) return;
    this.socketService.emit('allComments', this.complaintId);
    this.socketService.on<IComment[]>('allComments').subscribe({
      next: (itens) => {
        console.log(itens)
        this.comments = itens;
      }
    });
   }
  openChat(item: any): void {
    console.log(`Abrindo chat com: ${item.name}`);
  }

  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  sendComment() {
    const user = this.authService.currentUser()
    if(!user || !this.complaintId) {
      this.toastService.show({message: 'Você precisa estar autenticado para realizar essa ação', error: true})
      return
    }
    const newComment : ICommentCreate = {
      descricao : this.commentForm.get("newComment")?.value?.trim(),
      idUsuario: String(user.id),
      idDenuncia : this.complaintId
    }
    if (!newComment) return;
    this.socketService.emit('newComment', newComment);
    this.commentForm.reset();
  }

  onTextareaKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.sendComment();
    }
  }
}
