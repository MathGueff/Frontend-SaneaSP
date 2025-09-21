import { StatusDenuncia } from "@features/denuncia/models/denuncia.model";
import { ILabel } from "@shared/models/label.model";

export interface IComplaintStatusFilter extends ILabel{
    status : StatusDenuncia;
}