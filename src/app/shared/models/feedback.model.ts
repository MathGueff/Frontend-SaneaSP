import { FeedbackInterface } from "@shared/enums/interface-feedback"

export interface IDenunciaFeedback {
    id: number,
    data_publicacao: Date,
    descricao: string,
    fk_denuncia: number
}

export type TDenunciaFeedbackCreate = Omit<IDenunciaFeedback, 'id'>

export interface IInterfaceFeedback {
    id: number,
    data_publicacao: Date,
    descricao: string,
    tela: FeedbackInterface,
}

export type TInterfaceFeedbackCreate = Omit<IInterfaceFeedback, 'id'>