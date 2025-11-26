import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Component, inject, OnDestroy, OnInit, Input } from "@angular/core";
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
import { IComplaint } from "@features/denuncia/models/complaint.model";
import { IFormFieldTextareaConfig } from "@core/models/form.model";
import { FormFieldTextareaComponent } from "@core/components/forms/form-field-textarea/form-field-textarea.component";

@Component({
  selector: "app-complaint-feedback",
  imports: [CommentCardComponent, CommonModule, ReactiveFormsModule, FormFieldTextareaComponent],
  templateUrl: "./complaint-feedback.component.html",
  styleUrls: [
    "./complaint-feedback.component.css",
    "../../../../shared/styles/form.style.css",
  ],
})
export class ComplaintFeedbackComponent implements OnInit, OnDestroy {
  @Input() complaint?: IComplaint;
  protected MAX_COMMENTS = 6;

  private authService = inject(AuthService);
  private commentService = inject(CommentService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private feedbackService = inject(FeedbackService);

  protected descricao: string | null = null;
  protected canSendFeedback = false;
  protected feedbackForm: FormGroup = this.fb.group({
    descricao: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  });

  protected feedbackTextAreaConfig : IFormFieldTextareaConfig = {
    formControlName: 'descricao',
    textarea: {
      id: 'descricao',
      placeholder: 'Insira aqui o seu feedback'
    }
  }

  protected commentTextAreaConfig : IFormFieldTextareaConfig = {
    formControlName: 'newComment',
    textarea: {
      id: 'newComment',
      placeholder: 'Faça o seu comentário'
    }
  }

  protected comments: IComment[] = [];
  protected commentForm: FormGroup = this.fb.group({
    newComment: ["", [Validators.max(500), Validators.required]],
  });
  protected complaintId = this.route.snapshot.paramMap.get("id");
  protected user = this.authService.currentUser();

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    if (!this.complaintId) return;

    this.feedbackService.getDenunciaFeedback(Number(this.complaintId)).subscribe({
      next : (feedback) =>{
        this.descricao = feedback?.descricao || null;
      },
      error: () => {
        this.descricao = null
      }
    })
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

  sendFeedback() {
    if (this.feedbackForm.invalid || !this.complaintId) return;
    const descricao = this.feedbackForm.get('descricao')?.value?.trim();
    this.feedbackService.postDenunciaFeedback({
      descricao,
      fk_denuncia: Number(this.complaintId),
      data_publicacao: new Date()
    }).subscribe({
      next: () => {
        this.descricao = descricao;
        this.canSendFeedback = false;
        this.feedbackForm.reset();
        this.toastService.show({ message: 'Feedback enviado com sucesso!', error: false });
      },
      error: () => {
        this.toastService.show({ message: 'Erro ao enviar feedback', error: true });
      }
    });
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

  isAuthor(){
    return this.authService.currentUser()?.id == this.complaint?.idUsuario
  }
}
