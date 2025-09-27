import { IIcon } from "@shared/models/icon.model"

export interface ICategoria{
  id: number,
  nome : string,
  group : CategoryGroup
}

export enum CategoryGroup{
  WATER,
  SEWAGE,
  DRAINAGE,
  CLEANING
}

export interface ICategorySelect extends ICategoryLabel{
  nome : string,
  selected ?: boolean
}

export interface ICategoryLabel{
  nome : string,
  icon ?: IIcon
}

export interface ICategoryGroup<T>{
  title : string,
  icon : IIcon,
  group : T[]
}