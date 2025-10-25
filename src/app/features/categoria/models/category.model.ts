import { IIcon } from "@shared/models/icon.model"

//Dados - usados para transitar objetos contendo informações

export interface IBaseCategory{
  nome : string,
  id_grupo : number
}
export interface ICategory extends IBaseCategory{
  id: number
}

export interface ICategoryCreate extends IBaseCategory{}

export interface ICategoryListFilter{
  nome : string
}

export interface ICategoryGroup{
  id: number,
  nome : string,
  icone : string,
  categorias : Omit<ICategory, 'id_grupo'>[]
}

//Visual - usados para representar a categoria como elementos visuais (contém estados )
export interface ICategorySelect extends ICategoryLabel{
  id : number,
  name : string,
  id_grupo : number,
  selected ?: boolean
}

export interface ICategoryLabel{
  name : string,
  icon ?: IIcon
}

export interface IViewCategoryGroup<T>{
  title : string,
  icon : IIcon,
  group : T[]
}