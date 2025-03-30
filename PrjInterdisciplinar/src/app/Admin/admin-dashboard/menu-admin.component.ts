import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {
  MenuAdminDashOpcoesLink,
  MenuAdminSidebarLink,
} from '../../models/class/menu-admin';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { OpcoesSidebarMenuAdmin } from '../../models/enums/OpcoesSidebarMenuAdmin.enum';
import { ModalSimplesComponent } from "../../Common/modal-simples/modal-simples.component";
import { ModalType } from '../../models/enums/ModalType.enum';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, ModalSimplesComponent],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css',
})
export class MenuAdminComponent {
  constructor(private router: Router) {}

  modalTypes = ModalType;

  @ViewChild('botaoModal') botaoModal !: ElementRef;

  //Para utilizar os atalhos do teclado
  @HostListener('document:keydown', ['$event'])

  onKeyDown(event: KeyboardEvent) {
    if (event.key >= '1' && event.key <= '9') {
      //Convertendo o número para indíce do array (subtraindo -1 para que a tecla 1 seja a pos 0)
      const index = parseInt(event.key) - 1;
      if (index <= 9 && index < this.opcoesMenuAtuais.length) {
        //Acessando a opcaoSelecionada por meio do index referente a sua posição no array
        const opcaoSelecionada = this.opcoesMenuAtuais[index];
        if(opcaoSelecionada.type == 'link')
          this.router.navigate([opcaoSelecionada.path]);
        else{
          this.alternarModal(opcaoSelecionada.nomeModal || '', opcaoSelecionada.tipoModal || ModalType.None)
        }
      }
    }
  }

  nomeModalAtual : string = '';
  tipoModalAtual : ModalType = ModalType.None;

  alternarModal(nomeModal : string, tipoModal : ModalType){
    this.nomeModalAtual = nomeModal;
    this.tipoModalAtual = tipoModal;
    // Esperar que a variável seja atualizada antes de clicar no botão
    setTimeout(() => {
      this.botaoModal.nativeElement.click();
    });
  }

  //Array de Objetos de links da sidebar do Menu de Admin
  linksSidebar: MenuAdminSidebarLink[] = [
    {
      nome: 'Gerenciar Reclamações',
      img: 'assets/icones/icon_white_reclamacao.svg',
      opcao: OpcoesSidebarMenuAdmin.Reclamacao,
    },
    {
      nome: 'Gerenciar notícias do site',
      img: 'assets/icones/icon_white_noticia.svg',
      opcao: OpcoesSidebarMenuAdmin.Noticia,
    },
    {
      nome: 'Gerenciar doenças do site',
      img: 'assets/icones/icon_white_doenca.svg',
      opcao: OpcoesSidebarMenuAdmin.Doenca,
    },
    {
      nome: 'Responsável pelo saneamento',
      img: 'assets/icones/icon_white_responsavel.svg',
      opcao: OpcoesSidebarMenuAdmin.Responsaveis,
    },
    {
      nome: 'Log',
      img: 'assets/icones/icon_relatorio_white.svg',
      opcao: OpcoesSidebarMenuAdmin.Log,
    },
  ];

  /* Objeto com todas opções do menu, organizados por tipo de menu e os links dele
   *  OpcoesSidebarMenuAdmin se refere a Opção disponível no sidebar
   *  MeuAdminDashOpcoesLink é um array de links que estão ligadas a um OpcaoMenuAdmin
   */
  menuLink: Record<OpcoesSidebarMenuAdmin, MenuAdminDashOpcoesLink[]> = {
    [OpcoesSidebarMenuAdmin.Reclamacao]: [
      {
        type : 'link',
        path: '/reclamacao',
        nome: 'Visualizar todas reclamações',
        img: 'assets/icones/icon_view_white.svg',
      },
      {
        type : 'link',
        path: '/reclamacao',
        nome: 'Seus comentários',
        img: 'assets/icones/icon_view_white.svg',
      },
      {
        type : 'link',
        path: '/reclamacao',
        nome: 'Excluir uma reclamação',
        img: 'assets/icones/icon_delete_white.svg',
      },
      {
        type : 'link',
        path : '/',
        nome : 'Visualizar todas as tags',
        img : 'assets/icones/icon_view_white.svg'
      },
      {
        type : 'modal',
        nomeModal : 'criarTagReclamacaoModal',
        tipoModal : ModalType.Adicao,
        nome: 'Criar nova tag para os usuários',
        img: 'assets/icones/icon_plus_white.svg',
      },
      {
        type : 'modal',
        nomeModal : 'editarTagReclamacaoModal',
        tipoModal : ModalType.PesquisaEdicao,
        nome: 'Editar uma tag para os usuários',
        img: 'assets/icones/icon_edit_white.svg',
      },
      {
        type : 'modal',
        nomeModal : 'excluirTagReclamacaoModal',
        tipoModal : ModalType.PesquisaExclusao,
        nome: 'Excluir uma tag para os usuários',
        img: 'assets/icones/icon_delete_white.svg',
      },
      {
        type : 'link',
        path: '/',
        nome: 'Gerar relatório de reclamação',
        img: 'assets/icones/icon_relatorio_white.svg',
      },
      {
        type : 'link',
        path: '/',
        nome: 'Visualizar filtragem geográfica',
        img: 'assets/icones/icon_map_white.svg',
      },
    ],
    [OpcoesSidebarMenuAdmin.Noticia]: [
      {
        type : 'link',
        path: '/noticia-form',
        nome: 'Cadastrar uma nova notícia',
        img: 'assets/icones/icon_plus_white.svg',
      },
      {
        type : 'link',
        path: '/noticia-form',
        nome: 'Editar uma notícia',
        img: 'assets/icones/icon_edit_white.svg',
      },
      {
        type : 'link',
        path: '/noticia-form',
        nome: 'Excluir uma notícia',
        img: 'assets/icones/icon_delete_white.svg',
      },
      {
        type : 'link',
        path: '/noticia-inicial',
        nome: 'Visualizar suas notícias criadas',
        img: 'assets/icones/icon_view_white.svg',
      },
      {
        type : 'link',
        path: '/noticia-inicial',
        nome: 'Visualizar todas notícias',
        img: 'assets/icones/icon_view_white.svg',
      },
    ],
    [OpcoesSidebarMenuAdmin.Doenca]: [
      {
        type : 'link',
        path: '/doenca-form',
        nome: 'Cadastrar uma nova doença',
        img: 'assets/icones/icon_plus_white.svg',
      },
      {
        type : 'link',
        path: '/doenca-form',
        nome: 'Editar uma doença',
        img: 'assets/icones/icon_edit_white.svg',
      },
      {
        type : 'link',
        path: '/doenca-form',
        nome: 'Excluir uma doença',
        img: 'assets/icones/icon_delete_white.svg',
      },
      {
        type : 'link',
        path: '/doenca-inicial',
        nome: 'Visualizar suas doenças cadastradas',
        img: 'assets/icones/icon_view_white.svg',
      },
      {
        type : 'link',
        path: '/doenca-inicial',
        nome: 'Visualizar todas doenças',
        img: 'assets/icones/icon_view_white.svg',
      },
    ],
    [OpcoesSidebarMenuAdmin.Responsaveis]: [
      {
        type : 'link',
        path: '/responsaveis',
        nome: 'Visualizar página dos responsáveis pelo saneamento básico',
        img: 'assets/icones/icon_white_responsavel.svg',
      },
    ],
    [OpcoesSidebarMenuAdmin.Log]: [
      {
        type : 'link',
        path: '/',
        nome: 'Visualizar log de comentários',
        img: 'assets/icones/icon_relatorio_white.svg',
      },
    ],
    [OpcoesSidebarMenuAdmin.Login]: [],
  };
  
  //Variável para guardar a opção atual selecionada no sidebar (inicia com o primeiro elemento de linksSidebar)
  sidebarAtual: OpcoesSidebarMenuAdmin = this.linksSidebar[0].opcao

  //Variável para guardar o array de links referentes a opcao atual do sidebar selecionada
  opcoesMenuAtuais: MenuAdminDashOpcoesLink[] =
    this.menuLink[this.sidebarAtual] || [];

  mudarOpcaoAtual(opcao: OpcoesSidebarMenuAdmin) {
    this.sidebarAtual = opcao;
    this.opcoesMenuAtuais = this.menuLink[opcao] || [];
  }
}
