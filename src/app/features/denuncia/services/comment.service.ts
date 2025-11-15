import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IComment, ICommentCreate } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private base_URL:string = environment.domain + 'comentario/';
  constructor(private httpClient:HttpClient){}

  public getCommentsByComplaint(complaintId:string):Observable<IComment[] | undefined>{
    const url = this.base_URL + complaintId
    return this.httpClient.get<IComment[] | undefined>(url)
  }
}