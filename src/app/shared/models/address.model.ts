/*
    Usado para agrupar todos os campos de endereço
        (rua, cep, cidade, número e bairro) em um único campo na interface de user (IUser)
*/
export interface IAddress{
    cep : string,
    logradouro : string,
    bairro : string,
    cidade : string,
    numero ?: string,
    complemento ?: string,
}
