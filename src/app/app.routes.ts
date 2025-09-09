import { HomePageComponent } from '@features/home/pages/home-page/home-page.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/auth-admin.guard';
import { CidadaoLayoutComponent } from '@features/cidadao/pages/layout/layout.component';
import { MenuCidadaoComponent } from '@features/cidadao/pages/menu-cidadao/menu-cidadao.component';
import { LoginComponent as CidadaoLoginComponent} from '@features/cidadao/pages/login/login.component';

export const routes: Routes = [
  //Página inicial
  {path: '', component:HomePageComponent},

  //Área do cidadão
  {
    path: 'cidadao', component:MenuCidadaoComponent,
    children: [
      
    ]
  },

  //Login
  {path: 'login', component:CidadaoLoginComponent},

  //Cadastro
  {path: 'register', component:CidadaoLoginComponent}
];
