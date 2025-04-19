import { ModalType } from "../enums/ModalType.enum";
import { AdminSidebarOptions } from "../enums/AdminSidebarOptions";

export interface ILink{
    name ?: string,
    path ?: string
    img ?: string
}

export interface ILinkPanelAdmin extends ILink{
    type : 'link' | 'modal'; //Link (routerLink) ou modal(data-bs-target)
    tipoModal ?: ModalType;
}

export interface ILinkSidebarAdmin extends ILink{
  opcao : AdminSidebarOptions;
}