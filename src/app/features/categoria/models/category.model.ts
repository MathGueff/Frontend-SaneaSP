import { ICategoryGroup } from "./category-group.model";

export interface ICategory {
  id: string;
  nome: string;
  grupo?: ICategoryGroup;
}

export type TCreateCategory = Omit<ICategory, "id">;

export type ICategoryListFilter = {
  nome: ICategory["nome"];
  id_grupo: ICategoryGroup["id"];
  skip?: string;
  page?: string;
};
