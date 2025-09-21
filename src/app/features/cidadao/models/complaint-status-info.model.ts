import { StatusDenuncia } from "@features/denuncia/models/denuncia.model";

export interface IComplaintStatusInfo {
  status: StatusDenuncia;
  class: string;
  title: string;
  description: string;
}