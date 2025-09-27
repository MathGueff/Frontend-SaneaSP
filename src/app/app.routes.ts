import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/auth-admin.guard';
import { CitizenHomeComponent } from '@features/cidadao/pages/citizen-home/citizen-home.component';
import { LoginComponent as CitizenLoginComponent} from '@features/cidadao/pages/login/login.component';
import { RegisterComponent as CitizenRegisterComponent } from '@features/cidadao/pages/register/register.component';
import { ProfileComponent as CitizenProfileComponent } from '@features/cidadao/pages/profile/profile.component';
import { CitizenLayoutComponent } from '@features/layout/citizen-layout/citizen-layout.component';
import { PersonalInfoComponent } from '@features/cidadao/components/personal-info/personal-info.component';
import { MyComplaintsComponent } from '@features/cidadao/components/my-complaints/my-complaints.component';
import { ComplaintRegisterComponent } from '@features/denuncia/cadastro/pages/complaint-register/complaint-register.component';

export const routes: Routes = [
  //Página inicial
  {path: '', redirectTo: 'cidadao', pathMatch: 'full' },

  //Área do cidadão
  {
    path: 'cidadao', component:CitizenLayoutComponent,
    children: [
      {path: '', redirectTo: 'menu', pathMatch: 'full' },
      {path: 'menu', component: CitizenHomeComponent},
      {path: 'login', component: CitizenLoginComponent},
      {path: 'register', component: CitizenRegisterComponent},
      {path: 'complaints', component: MyComplaintsComponent}, 
      {path: 'new-complaint', component: ComplaintRegisterComponent},
      {
        path: 'profile', component: CitizenProfileComponent, 
        children : [
          {path: '', redirectTo: 'me', pathMatch: 'full' },
          {path: 'me', component: PersonalInfoComponent}, 
          {path: 'saved-addresses', component: CitizenProfileComponent}, 
          {path: 'menu', component: CitizenProfileComponent}, 
          {path: 'notifications', component: CitizenProfileComponent}, 
        ]
      }
    ]
  }
];
