import { HomePageComponent } from '@features/home/pages/home-page/home-page.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/auth-admin.guard';
import { MenuCidadaoComponent } from '@features/cidadao/pages/menu-cidadao/menu-cidadao.component';
import { LoginComponent as CidadaoLoginComponent} from '@features/cidadao/pages/login/login.component';
import { RegisterComponent as CidadaoRegisterComponent } from '@features/cidadao/pages/register/register.component';
import { ProfileComponent as CidadaoProfileComponent } from '@features/cidadao/pages/profile/profile.component';
import { LayoutCidadaoComponent } from '@features/layout/layout-cidadao/layout-cidadao.component';
import { PersonalDataComponent } from '@features/cidadao/components/dados-pessoais/dados-pessoais.component';

export const routes: Routes = [
  //Página inicial
  {path: '', component:HomePageComponent},

  //Área do cidadão
  {
    path: 'cidadao', component:LayoutCidadaoComponent,
    children: [
      {path: '', redirectTo: 'menu', pathMatch: 'full' },
      {path: 'menu', component: MenuCidadaoComponent},
      {path: 'login', component: CidadaoLoginComponent},
      {path: 'register', component: CidadaoRegisterComponent},
      {
        path: 'profile', component: CidadaoProfileComponent, 
        children : [
          {path: 'me', component: PersonalDataComponent}, 
          {path: 'complaints', component: CidadaoProfileComponent}, 
          {path: 'saved-addresses', component: CidadaoProfileComponent}, 
          {path: 'menu', component: CidadaoProfileComponent}, 
          {path: 'notifications', component: CidadaoProfileComponent}, 
        ]
      }
    ]
  }
];
