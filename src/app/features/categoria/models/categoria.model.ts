export interface ICategoria extends ICategoryLabel{
  id: number
}

export interface ICategoryGroup{
  title : string,
  group : ICategoryLabel[]
}

export interface ICategorySelect extends ICategoryLabel{
  selected ?: boolean
}

export interface ICategoryLabel{
  nome : string
}