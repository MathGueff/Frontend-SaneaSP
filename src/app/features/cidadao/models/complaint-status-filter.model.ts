import { ComplaintStatus } from "@features/denuncia/models/complaint.model";
import { ILabel } from "@shared/models/label.model";

export interface IComplaintStatusFilter extends ILabel {
  status: ComplaintStatus;
}
