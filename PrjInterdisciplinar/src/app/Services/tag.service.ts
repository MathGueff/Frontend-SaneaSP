import { Injectable } from '@angular/core';
import { ITag } from '../models/interface/ITag.model';
import { ITagNoticia } from '../models/interface/ITagNoticia.model';
import { ITagReclamacao } from '../models/interface/ITagReclamacao.model';
import { IResponse } from '../models/interface/IResponse.model';
import { HttpClient } from '@angular/common/http';
import { ITagCadastro } from '../models/interface/ITagCadastro.model';

@Injectable({ providedIn: 'root' })
export class TagService {

  constructor(private httpClient : HttpClient) {}

  private tags: ITag[] = [
    { id: 1, nome: 'Esgoto' },
    { id: 2, nome: 'Poluição' },
  ];

  private tagsNoticias: ITagNoticia[] = [
    { id: 1, idNoticia: 1, idTag: 1 }, //Esgoto
    { id: 2, idNoticia: 2, idTag: 2 }, //Poluição
  ];

  private tagsReclamacao: ITagReclamacao[] = [
    { id: 1, idReclamacao: 1, idTag: 1 }, //Esgoto
    { id: 2, idReclamacao: 2, idTag: 2 }, //Poluição
  ];

  /**
   * 
   * @param nomeFilter 
   * @returns tag com o nome exato
   */
  getTagByName(nameFilter: string){
    return this.httpClient.get<IResponse<ITag>>(`http://localhost:3000/tag/nome/${nameFilter}`)
  }

  //GET/:id
  getTagById(id: number){
    return this.httpClient.get<ITag>(`http://localhost:3000/tag${id}`)
  }

  //GET
  getTagsList(queryName ?: string) {
    const url =`http://localhost:3000/tag${queryName!=null ? '?nome='+queryName : ''}`
    return this.httpClient.get<ITag[]>(url)
  }

  //POST
  createNewTag(newTag: ITagCadastro) {
    return this.httpClient.post<IResponse<ITag[]>>(`http://localhost:3000/tag`, newTag)
  }

  //DELETE
  deleteTag(idTag: number){
    return this.httpClient.delete<IResponse<ITag[]>>(`http://localhost:3000/tag/${idTag}`)
  }

  //PUT
  editTag(idTag: number, updatedTag: ITag) {
    return this.httpClient.put<IResponse<ITag[]>>(`http://localhost:3000/tag/${idTag}`, updatedTag)
  }

  //Verificação para evitar duplicidade de nomes e existencia de tag
  tagWithNameExists(nomeFilter: string): boolean {
    nomeFilter = nomeFilter.toLowerCase().trim();
    return this.tags.some((tag) => tag.nome.toLowerCase().trim() == nomeFilter);
  }
}
