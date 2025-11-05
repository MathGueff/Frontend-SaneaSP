import { IAddress } from "@shared/models/address.model";

export interface IUser {
  id?: number;
  nome: string;
  senha: string;
  email: string;
  telefone?: string;
  cpf?: string;
  endereco?: IAddress;
  nivel?: number;
}

export interface ICreateUser {
  nome: string;
  senha: string;
  email: string;
}

export interface IUserCredentials {
  email: string;
  senha: string;
}
