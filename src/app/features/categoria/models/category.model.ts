import { IIcon } from "@shared/models/icon.model"

//Dados
export interface ICategory{
  id: number,
  name : string,
  group : CategoryGroup
}

export interface ICategoryListFilter{
  name : string
}

export interface ICategoryCreate{
  name : string,
  group : CategoryGroup
}

//Tipos
export enum CategoryGroup{
  WATER,
  SEWAGE,
  DRAINAGE,
  CLEANING
}

//Visual
export interface ICategorySelect extends ICategoryLabel{
  name : string,
  selected ?: boolean
}

export interface ICategoryLabel{
  name : string,
  icon ?: IIcon
}

export interface ICategoryGroup<T>{
  title : string,
  icon : IIcon,
  group : T[]
}