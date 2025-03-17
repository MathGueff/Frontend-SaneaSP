import { OpcoesMenuAdmin } from "../Admin/OpcoesMenuAdmin.enum";

export class MenuAdminOpcoesLink {
  path : string = '';
  nome : string = '';
  img : string = '';
}

export class MenuAdminSidebarLink extends MenuAdminOpcoesLink{
  opcao : OpcoesMenuAdmin = OpcoesMenuAdmin.Doenca;
}