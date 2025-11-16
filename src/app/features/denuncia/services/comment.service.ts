import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment, ICommentCreate } from '../models/comment.model';
import { SocketService } from '@core/services/socket.service';
import { SocketEvent } from '../models/socket.model';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private socketService : SocketService){}

  getComments(complaintId: string): void {
    this.socketService.emit<string>(SocketEvent.ComplaintComments, complaintId);
  }

  onComments(): Observable<IComment[]> {
    return this.socketService.on<IComment[]>(SocketEvent.ComplaintComments);
  }

  sendComment(comment: ICommentCreate): void {
    this.socketService.emit<ICommentCreate>(SocketEvent.NewComment, comment);
  }
}