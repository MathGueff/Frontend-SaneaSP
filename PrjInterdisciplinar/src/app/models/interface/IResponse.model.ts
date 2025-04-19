export interface IResponse<T = void>{
    message : string,
    error : boolean,
    data ?: T
}