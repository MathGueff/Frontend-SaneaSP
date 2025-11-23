import { IImage } from "@features/denuncia/models/image.model";
import { ICategory } from "@features/categoria/models/category.model";
import { IBaseApiFilters } from "@core/models/base-api.model";
export enum ComplaintStatus {
  Enviada = 'enviada',                       // Denúncia foi publicada pelo cidadão
  EmAnalise = 'em_analise',                 // Um funcionário visualizou e entrou em contato com o cidadão
  AguardandoInformacoes = 'aguardando_informacoes', // Aguardando mais informações do cidadão
  EmResolucao = 'em_resolucao',             // A prefeitura já está trabalhando para resolver o problema
  VisitaAgendada = 'visita_agendada',       // Uma visita ao local foi agendada
  NaoProcede = 'nao_procede',               // A denúncia não pôde ser confirmada ou não se aplica
  Cancelada = 'cancelada',                  // A denúncia foi cancelada
  Resolvida = 'resolvida',                  // O problema foi resolvido pela equipe técnica
  Finalizada = 'finalizada'                 // A denúncia foi oficialmente encerrada no sistema
}

// Crie uma interface base comum
export interface IComplaintBase {
    titulo: string;
    descricao: string;
    cep: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero?: string;
    complemento?: string;
    idUsuario: number;
}

export interface IComplaint extends IComplaintBase {
    id: number;
    dataPublicacao: string;
    status: ComplaintStatus;
    pontuacao: number;
    imagens?: IImage[];
    categorias?: ICategory[];
}

export interface ICreateComplaint extends IComplaintBase {
    idUsuario: number;
    imagens?: string[];
    categorias?: number[];
}
export interface IComplaintPreview extends IComplaintBase {
    titulo: string;
    descricao: string;
    cep: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero?: string;
    complemento?: string;
    imagens?: File[];
    categorias?: ICategory[];
}

export interface IComplaintFilter extends IBaseApiFilters{
    status : ComplaintStatus
}