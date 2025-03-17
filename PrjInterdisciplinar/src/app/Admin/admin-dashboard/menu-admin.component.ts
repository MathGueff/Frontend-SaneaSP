import { Component } from '@angular/core';
import { MenuAdminOpcoesLink, MenuAdminSidebarLink } from '../../models/menu-admin';
import { CommonModule } from '@angular/common';
import { OpcoesMenuAdmin } from '../OpcoesMenuAdmin.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css',
})
export class MenuAdminComponent {
  links: MenuAdminSidebarLink[] = [
    {
      path: '/opcoes',
      nome: 'Gerenciar Reclamações',
      img: 'assets/icones/icon_white_reclamacao.svg',
      opcao: OpcoesMenuAdmin.Reclamacao,
    },
    
    {
      path: 'opcoes',
      nome: 'Gerenciar notícias do site',
      img: 'assets/icones/icon_white_noticia.svg',
      opcao: OpcoesMenuAdmin.Noticia,
    },
    
    {
      path: '/opcoes',
      nome: 'Gerenciar doenças do site',
      img: 'assets/icones/icon_white_doenca.svg',
      opcao: OpcoesMenuAdmin.Doenca,
    },
    //{path: '/doenca-form', nome : 'Cadastre uma nova doença', img : 'assets/icones/icon_white_doenca.svg'},
    {
      path: '/opcoes',
      nome: 'Visualizar página sobre o responsável pelo saneamento',
      img: 'assets/icones/icon_white_responsavel.svg',
      opcao: OpcoesMenuAdmin.Responsaveis,
    },
  ];
 
  noticia : MenuAdminOpcoesLink[] = [
    {
      path: '/noticia-form',
      nome: 'Cadastrar uma nova notícia',
      img: 'assets/icones/icon_white_noticia.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Editar uma notícia',
      img: 'assets/icones/icon_white_noticia.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Excluir uma notícia',
      img: 'assets/icones/icon_white_noticia.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Visualizar suas notícias criadas',
      img: 'assets/icones/icon_white_noticia.svg',
    },
    {
      path: '/noticia-inicial',
      nome: 'Visualizar todas notícias',
      img: 'assets/icones/icon_white_noticia.svg',
    },
  ]

  doenca : MenuAdminOpcoesLink[] = [
    {
      path: '/noticia-form',
      nome: 'Cadastrar uma nova doença',
      img: 'assets/icones/icon_white_noticia.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Editar uma doença',
      img: 'assets/icones/icon_white_doenca.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Excluir uma doença',
      img: 'assets/icones/icon_white_doenca.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Visualizar suas doenças cadastradas',
      img: 'assets/icones/icon_white_doenca.svg',
    },
    {
      path: '/noticia-inicial',
      nome: 'Visualizar todas doenças',
      img: 'assets/icones/icon_white_doenca.svg',
    },
  ]

  reclamacao : MenuAdminOpcoesLink[] = [
    {
      path: '/noticia-form',
      nome: 'Visualizar todas reclamações',
      img: 'assets/icones/icon_white_reclamacao.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Seus comentários',
      img: 'assets/icones/icon_white_reclamacao.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Excluir uma reclamação',
      img: 'assets/icones/icon_white_reclamacao.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Gerar relatório de reclamação',
      img: 'assets/icones/icon_white_reclamacao.svg',
    },
    {
      path: '/noticia-inicial',
      nome: 'Visualizar filtragem geográfica',
      img: 'assets/icones/icon_white_reclamacao.svg',
    },
  ]

  opcoes: MenuAdminOpcoesLink[] = this.reclamacao;

  changeOptions(opcao: OpcoesMenuAdmin) {
    switch (opcao) {
      case OpcoesMenuAdmin.Doenca:
        this.opcoes = this.doenca;
        break;
      case OpcoesMenuAdmin.Noticia:
        this.opcoes = this.noticia
        break;
      case OpcoesMenuAdmin.Reclamacao:
        this.opcoes = this.reclamacao;
        break;
    }
  }
}