import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IComment } from "@features/denuncia/models/comment.model";
import { CommentService } from "@features/denuncia/services/comment.service";
import { CommentCardComponent } from "@features/denuncia/components/comment-card/comment-card.component";
import { CommonModule } from "@angular/common";
import { SocketService } from "@core/services/socket.service";

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
  protected MAX_COMMENTS = 3;

  private commentService = inject(CommentService);
  //private socketService = inject(SocketService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  //Será substituido pelo feedback real
  descricao: string | null = null;
  //"Fiquei impressionado com a rapidez e a eficiência na solução do problema que relatei. O esgoto irregular que denunciei foi removido, e agora a região está limpa e segura. Acompanhar o processo pelo sistema foi simples e transparente. Agradeço à equipe responsável e espero que continuem mantendo esse nível de atenção às denúncias da comunidade.";

  protected comments: IComment[] = [];
  protected commentForm: FormGroup = this.fb.group({
   newComment : ["", [Validators.max(500), Validators.required]]
  });

  ngOnInit(): void {
    const complaintId = this.route.snapshot.paramMap.get("id");
    if (!complaintId) return;
    this.commentService.getCommentsByComplaint(complaintId).subscribe({
      next: (comments) => {
        this.comments = comments ?? [];
      },
    });
  }

  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  sendComment() {
    const newComment = this.commentForm.get("newComment")?.value?.trim();
    if (!newComment) return;
    //this.socketService.emit('newComment', newComment);
    this.commentForm.reset();
  }
}
