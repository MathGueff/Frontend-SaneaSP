import { ComplaintStatus } from "@features/denuncia/models/complaint.model";
import { ILabel } from "@shared/models/label.model";

export type TComplaintStatusFilter = ComplaintStatus | 'Todas'

export interface IComplaintStatusFilterLabel extends ILabel{
    status : TComplaintStatusFilter;
}