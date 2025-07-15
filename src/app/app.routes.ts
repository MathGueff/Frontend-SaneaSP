import { MenuUsuarioComponent } from './Usuario/menu-usuario/menu-usuario.component';
import { Routes } from '@angular/router';
import { ReclamacaoDescricaoComponent } from './Reclamacao/reclamacao-descricao/reclamacao-descricao.component';
import { ReclamacaoInicialComponent } from './Reclamacao/reclamacao-inicial/reclamacao-inicial.component';
import { SobrenosComponent } from './Layout/sobrenos/sobrenos.component';
import { MenuAdminComponent } from './Admin/admin-dashboard/menu-admin.component';
import { FormLoginComponent } from './Login/form-login/form-login.component';
import { FormCadastroComponent } from './Login/form-cadastro/form-cadastro.component';
import { ComentarioCentralComponent } from './Comentario/comentario-central/comentario-central.component';
import { ReclamacaoFormComponent } from './Reclamacao/reclamacao-form/reclamacao-form.component';
import { EdicaoPerfilComponent } from './Usuario/edicao-perfil/edicao-perfil.component';
import { ResponsaveisComponent } from './responsaveis/responsaveis/responsaveis.component';
import { ReclamacaoUsuariosComponent } from './Reclamacao/reclamacao-usuarios/reclamacao-usuarios.component';
import { ReclamacaoEdicaoComponent } from './Reclamacao/reclamacao-edicao/reclamacao-edicao.component';
import { TagTabelaComponent } from './Tag/tag-tabela/tag-tabela.component';
import { AuthGuard } from './Guards/AuthGuard';
import { AdminGuard } from './Guards/AdminGuard';


export const routes: Routes = [
  //Home
  {path: '', component:MenuUsuarioComponent},
  {path: 'pagina-admin', component:MenuAdminComponent, canActivate: [AdminGuard]},

  //Reclamações
  {path: 'reclamacao', component: ReclamacaoInicialComponent},
  {path: 'reclamacao/reclamacao-form', component: ReclamacaoFormComponent, canActivate: [AuthGuard]},
  {path: 'suas-reclamacoes/:id',component:ReclamacaoEdicaoComponent, canActivate: [AuthGuard]},
  {path: 'reclamacao/reclamacao-descricao/:id',component:ReclamacaoDescricaoComponent},
  {path: 'suas-reclamacoes', component: ReclamacaoUsuariosComponent, canActivate: [AuthGuard]},
  {path: 'suas-reclamacoes/reclamacao-descricao/:id',component:ReclamacaoDescricaoComponent, canActivate: [AuthGuard]},

  //Tags
  {path: 'tag-tabela', component: TagTabelaComponent, canActivate: [AdminGuard]},

  //Outros
  {path: 'sobre-nos', component:SobrenosComponent},
  {path: 'login', component:FormLoginComponent},
  {path: 'cadastro', component:FormCadastroComponent},
  {path: 'comentario/:idReclamamacao',component:ComentarioCentralComponent},
  {path: 'editar-perfil', component: EdicaoPerfilComponent, canActivate: [AuthGuard]},
  {path: 'responsaveis', component: ResponsaveisComponent},
];
