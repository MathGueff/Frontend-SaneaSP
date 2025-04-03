import { Injectable } from "@angular/core";
import { ITag } from "../models/interface/ITag.model";
import { ITagNoticia } from "../models/interface/ITagNoticia.model";
import { ITagReclamacao } from "../models/interface/ITagReclamacao.model";

@Injectable({ providedIn: 'root' })

export class TagService {
    private tags: ITag[] = [
        { id: 1, nomeTag: 'Esgoto' },
        { id: 2, nomeTag: 'Poluição' }
    ]

    private tagsNoticias: ITagNoticia[] = [
        { id: 1, idNoticia: 1, idTag: 1 }, //Esgoto
        { id: 2, idNoticia: 2, idTag: 2 } //Poluição
    ]

    private tagsReclamacao: ITagReclamacao[] = [
        { id: 1, idReclamacao: 1, idTag: 1 }, //Esgoto
        { id: 2, idReclamacao: 2, idTag: 2 } //Poluição
    ]

    validateTag(name: string) : boolean {
        name = name.toLowerCase().trim();
        return this.tags.some((tag) => tag.nomeTag.toLowerCase().trim() == name)
    }

    createNewTag(tag : ITag) {
        if(this.validateTag(tag.nomeTag)){
            this.tags.push(tag);
        }
    }

    deleteTag(tag : ITag) {
        if(this.validateTag(tag.nomeTag)){
            const index = this.tags.indexOf(tag)
            this.tags.splice(index,1);
        }
    }

    editTag(tag : ITag) {
        if(this.validateTag(tag.nomeTag)){
            const index = this.tags.indexOf(tag)
            this.tags.splice(index,1);
        }
    }

    getTag(nameTag : string) {
       
    }

    getTagsList() : ITag[] {
        return this.tags;
    }
}