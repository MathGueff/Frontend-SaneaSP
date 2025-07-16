import { ModalType } from "@features/categoria/models/ModalType.enum";
import { ILink } from "@shared/models/link.model";
import { AdminSidebarOptions } from "./AdminSidebarOptions";

export interface ILinkPanelAdmin extends ILink{
    type : 'link' | 'modal'; //Link (routerLink) ou modal(data-bs-target)
    tipoModal ?: ModalType;
}

export interface ILinkSidebarAdmin extends ILink{
  opcao : AdminSidebarOptions;
}