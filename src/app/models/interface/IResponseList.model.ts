export interface IResponseList<T = any>{
    data : T,
    pagination : {
        limit : number,
        total : number
    }
}