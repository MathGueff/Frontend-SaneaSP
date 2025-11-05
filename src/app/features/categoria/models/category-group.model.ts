import { ICategory } from "./category.model";

export interface ICategoryGroup {
  id: number;
  nome: string;
  icone: string;
  url: string;
  categorias: ICategory[];
}
