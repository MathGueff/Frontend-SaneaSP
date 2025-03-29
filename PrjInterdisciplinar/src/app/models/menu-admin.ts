import { OpcoesSidebarMenuAdmin } from "../Admin/OpcoesSidebarMenuAdmin.enum";

export class MenuAdminLink{
  nome : string = '';
  img : string = '';
}
export class MenuAdminDashOpcoesLink extends MenuAdminLink{
  type : string = 'link'; //Link (routerLink) ou modal(data-bs-target)
  path ?: string = ''; //routerLink
  nomeModal ?: string = ''; //data-bs-target
}

export class MenuAdminSidebarLink extends MenuAdminLink{
  opcao : OpcoesSidebarMenuAdmin = OpcoesSidebarMenuAdmin.Doenca;
}