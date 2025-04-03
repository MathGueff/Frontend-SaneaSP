export interface IOperationResult<T = void>{
    message : string,
    error : boolean,
    data ?: T
}