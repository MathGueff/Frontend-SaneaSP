import { Injectable } from '@angular/core';
import { ITag } from '../models/interface/ITag.model';
import { IResponse } from '../models/interface/IResponse.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ITagCadastro } from '../models/interface/ITagCadastro.model';
import { ITagListFilter } from '../models/interface/ITagListFilter.interface';
import { IResponseList } from '../models/interface/IResponseList.model';

@Injectable({ providedIn: 'root' })
export class TagService {

  private apiUrl = 'http://localhost:3000/tag'
  constructor(private httpClient : HttpClient) {}
  
  //GET
  getTagsList(filters ?: ITagListFilter) {
    let params = new HttpParams();
    if(filters){
      Object.entries(filters).forEach(([key, value]) => {
        if(value != undefined && value != null){
          params = params.set(key,value)
        }
      });
    }
    return this.httpClient.get<IResponseList<ITag[]>>(this.apiUrl,{params})
  }

  getTagByExactName(nameFilter: string){
    return this.httpClient.get<IResponse<ITag>>(`${this.apiUrl}/nome/${nameFilter}`)
  }

  //GET/:id
  getTagById(id: number){
    return this.httpClient.get<ITag>(`${this.apiUrl}/${id}`)
  }

  getTagCount(){
    return this.httpClient.get<number>(`${this.apiUrl}/total`)
  }

  //POST
  createNewTag(newTag: ITagCadastro) {
    return this.httpClient.post<IResponse<ITag>>(`${this.apiUrl}`, newTag)
  }

  //DELETE
  deleteTag(idTag: number){
    return this.httpClient.delete<IResponse<ITag>>(`${this.apiUrl}/${idTag}`)
  }

  //PUT
  editTag(idTag: number, updatedTag: ITag) {
    return this.httpClient.put<IResponse<ITag>>(`${this.apiUrl}/${idTag}`, updatedTag)
  }
}
