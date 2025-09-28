import { IUser } from "@features/usuario/models/user.model";
import { IComplaint } from "./complaint.model";

export interface IComment {
  id: number;
  description :string;
  date: string;
  complaint : IComplaint
  user : IUser;
}
