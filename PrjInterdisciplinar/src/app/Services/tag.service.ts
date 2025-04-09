import { Injectable } from '@angular/core';
import { ITag } from '../models/interface/ITag.model';
import { ITagNoticia } from '../models/interface/ITagNoticia.model';
import { ITagReclamacao } from '../models/interface/ITagReclamacao.model';
import { IResponse } from '../models/interface/IResponse.model';

@Injectable({ providedIn: 'root' })
export class TagService {
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

  // GET?name=
  getTagsByName(nomeFilter: string): ITag[] {
    nomeFilter = nomeFilter.toLowerCase().trim();
    const t = this.tags.filter((tag) =>
      tag.nome.toLowerCase().trim().includes(nomeFilter)
    );
    console.log(t);
    return t
  }
  /**
   * 
   * @param nomeFilter 
   * @returns tag com o nome exato
   */
  getTagByName(nomeFilter: string): ITag | undefined {
    return this.tags.find((tag) => tag.nome.trim().toLowerCase() === nomeFilter.trim().toLowerCase());
  }

  //GET/:id
  getTagById(id: number): ITag | undefined {
    return this.tags.find((tag) => tag.id === id);
  }

  //Retorna o último ID cadastrado, caso não haja, retorna 1
  getNextId() {
    return this.tags.length > 0 ? Math.max(...this.tags.map(tag => tag.id)) + 1 : 1
  }

  //GET
  getTagsList(): ITag[] {
    return this.tags;
  }

  //POST
  createNewTag(tag: ITag) : IResponse {
    tag.nome = tag.nome.trim().toLowerCase()
    if(this.tagWithNameExists(tag.nome)){
      return {error : true, message : 'Já existe uma tag com esse nome'}
    }
    tag.id = this.getNextId();
    this.tags.push(tag);
    return {error : false, message : 'Tag cadastrada com sucesso'}
  }

  //DELETE
  deleteTag(idFilter: number): IResponse {
    const index = this.tags.findIndex((tag) => tag.id === idFilter);
    if (index == -1) 
        return {error : true, message : 'Nenhuma tag encontrada'};
    this.tags.splice(index, 1);
    return {error : false, message : 'Tag removida'};
  }

  //PUT
  editTag(idFilter: number, updatedTag: ITag): IResponse {
    //Verificação de existência
    const index = this.tags.findIndex((tag) => tag.id === idFilter);
    if (index == -1) 
        return {error:true, message:'Nenhuma tag encontrada'};

    //Nomes duplicados
    if(this.tagWithNameExists(updatedTag.nome))
        return {error:true, message:'Já existe uma tag com o nome'}

    this.tags[index] = { id: idFilter, nome: updatedTag.nome };
    return {error:false, message:'Tag atualizada com sucesso'};
  }

  //Verificação para evitar duplicidade de nomes e existencia de tag
  tagWithNameExists(nomeFilter: string): boolean {
    nomeFilter = nomeFilter.toLowerCase().trim();
    return this.tags.some((tag) => tag.nome.toLowerCase().trim() == nomeFilter);
  }
}
