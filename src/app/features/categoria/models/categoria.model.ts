import { IIcon } from "@shared/models/icon.model"

export interface ICategoria extends ICategoryLabel{
  id: number
}

export interface ICategoryGroup<T>{
  title : string,
  icon : IIcon,
  group : T[]
}

export interface ICategorySelect extends ICategoryLabel{
  selected ?: boolean
}

export interface ICategoryLabel{
  nome : string
}