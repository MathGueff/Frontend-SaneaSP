import { ModalType } from "../enums/ModalType.enum";
import { OpcoesSidebarMenuAdmin } from "../enums/OpcoesSidebarMenuAdmin.enum";

export class MenuAdminLink{
  nome : string = '';
  img : string = '';
}
export class MenuAdminDashOpcoesLink extends MenuAdminLink{
  type : string = 'link'; //Link (routerLink) ou modal(data-bs-target)
  path ?: string = ''; //routerLink
  nomeModal ?: string = ''; //data-bs-target
  tipoModal ?: ModalType = ModalType.None;
}

export class MenuAdminSidebarLink extends MenuAdminLink{
  opcao : OpcoesSidebarMenuAdmin = OpcoesSidebarMenuAdmin.Doenca;
}