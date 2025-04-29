export interface IResponse<T = any>{
    message : string,
    error : boolean,
    data ?: T
}