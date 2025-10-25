import { ComplaintStatus } from "@features/denuncia/models/complaint.model";

export interface IComplaintStatusInfo {
  status: ComplaintStatus;
  class: string;
  title: string;
  description: string;
}