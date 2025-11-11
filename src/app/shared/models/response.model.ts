export interface IResponse<T = any>{
    message : string,
    error : boolean,
    data ?: T
}

export interface IResponseList<T = any>{
    data : T,
    pagination : {
        limit : number,
        total : number
    }
}