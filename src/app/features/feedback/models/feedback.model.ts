export interface IFeedback {
    id: number,
    data_publicacao: Date,
    descricao: string
}

export interface IFeedbackDenuncia extends IFeedback{
    fk_funcionario: number,
    fk_denuncia: number,
    fk_cidadao: number
}

export interface ICreateFeedbackDenuncia {
    data_publicacao: Date,
    descricao: string,
    fk_funcionario: number,
    fk_denuncia: number,
    fk_cidadao: number
}

export interface IWebFeedback extends IFeedback {
    fk_cidadao: number
}

export interface ICreateWebFeedback {
    data_publicacao: Date,
    descricao: string,
    fk_cidadao: number
}