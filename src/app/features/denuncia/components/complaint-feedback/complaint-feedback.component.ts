import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  IComment,
  ICommentCreate,
} from "@features/denuncia/models/comment.model";
import { CommentCardComponent } from "@features/denuncia/components/comment-card/comment-card.component";
import { CommonModule } from "@angular/common";
import { AuthService } from "@core/services/auth.service";
import { ToastService } from "@shared/services/toast.service";
import { Subject, takeUntil } from "rxjs";
import { CommentService } from "@features/denuncia/services/comment.service";
import { FeedbackService } from "@shared/services/feedback.service";

@Component({
  selector: "app-complaint-feedback",
  imports: [CommentCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: "./complaint-feedback.component.html",
  styleUrls: [
    "./complaint-feedback.component.css",
    "../../../../shared/styles/form.style.css",
  ],
})
export class ComplaintFeedbackComponent implements OnInit, OnDestroy {
  protected MAX_COMMENTS = 6;

  private authService = inject(AuthService);
  private commentService = inject(CommentService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private feedbackService = inject(FeedbackService);

  descricao: string | null = null;

  protected comments: IComment[] = [];
  protected commentForm: FormGroup = this.fb.group({
    newComment: ["", [Validators.max(500), Validators.required]],
  });
  protected complaintId = this.route.snapshot.paramMap.get("id");
  protected user = this.authService.currentUser();

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    if (!this.complaintId) return;

    this.commentService.getComments(this.complaintId);

    this.commentService.onComments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (itens) => {
          this.comments = itens;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    const user = this.authService.currentUser();
    if (!user || !this.complaintId) {
      this.toastService.show({
        message: "Você precisa estar autenticado para realizar essa ação",
        error: true,
      });
      return;
    }
    const newComment: ICommentCreate = {
      descricao: this.commentForm.get("newComment")?.value?.trim(),
      idUsuario: String(user.id),
      idDenuncia: this.complaintId,
    };
    if (!newComment) return;
    this.commentService.sendComment(newComment)
    this.commentForm.reset();
  }

  onTextareaKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.sendComment();
    }
  }
}
