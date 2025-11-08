import { IIcon } from "./icon.model";

export interface IField {
  label: string;
  placeholder?: string;
  value?: string;
  icon?: IIcon;
}
