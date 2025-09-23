import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/auth-admin.guard';
import { MenuCidadaoComponent } from '@features/cidadao/pages/menu-cidadao/menu-cidadao.component';
import { LoginComponent as CidadaoLoginComponent} from '@features/cidadao/pages/login/login.component';
import { RegisterComponent as CidadaoRegisterComponent } from '@features/cidadao/pages/register/register.component';
import { ProfileComponent as CidadaoProfileComponent } from '@features/cidadao/pages/profile/profile.component';
import { LayoutCidadaoComponent } from '@features/layout/layout-cidadao/layout-cidadao.component';
import { DadosPessoaisComponent } from '@features/cidadao/components/dados-pessoais/dados-pessoais.component';
import { MinhasDenunciasComponent } from '@features/cidadao/components/minhas-denuncias/minhas-denuncias.component';
import { DenunciaCadastroComponent } from '@features/denuncia/components/denuncia-cadastro/denuncia-cadastro.component';

export const routes: Routes = [
  //Página inicial
  {path: '', redirectTo: 'cidadao', pathMatch: 'full' },

  //Área do cidadão
  {
    path: 'cidadao', component:LayoutCidadaoComponent,
    children: [
      {path: '', redirectTo: 'menu', pathMatch: 'full' },
      {path: 'menu', component: MenuCidadaoComponent},
      {path: 'login', component: CidadaoLoginComponent},
      {path: 'register', component: CidadaoRegisterComponent},
      {path: 'complaints', component: MinhasDenunciasComponent}, 
      {path: 'new-complaint', component: DenunciaCadastroComponent},
      {
        path: 'profile', component: CidadaoProfileComponent, 
        children : [
          {path: '', redirectTo: 'me', pathMatch: 'full' },
          {path: 'me', component: DadosPessoaisComponent}, 
          {path: 'saved-addresses', component: CidadaoProfileComponent}, 
          {path: 'menu', component: CidadaoProfileComponent}, 
          {path: 'notifications', component: CidadaoProfileComponent}, 
        ]
      }
    ]
  }
];
