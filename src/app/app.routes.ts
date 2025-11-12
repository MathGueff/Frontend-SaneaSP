import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { CitizenHomeComponent } from '@features/cidadao/pages/citizen-home/citizen-home.component';
import { LoginComponent as CitizenLoginComponent} from '@features/cidadao/pages/login/login.component';
import { RegisterComponent as CitizenRegisterComponent } from '@features/cidadao/pages/register/register.component';
import { ProfileComponent as CitizenProfileComponent } from '@features/cidadao/pages/profile/profile.component';
import { PersonalInfoComponent } from '@features/cidadao/components/personal-info/personal-info.component';
import { MyComplaintsComponent } from '@features/cidadao/components/my-complaints/my-complaints.component';
import { ComplaintRegisterComponent } from '@features/denuncia/cadastro/pages/complaint-register/complaint-register.component';
import { ComplaintViewComponent } from './features/denuncia/pages/complaint-view/complaint-view.component';
import { ConfirmationPageComponent } from '@core/auth/pages/confirmation-page/confirmation-page.component';
import { DashboardComponent } from '@features/prefeitura/pages/dashboard/dashboard.component';

export const routes: Routes = [
  //Página inicial
  {path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {path: 'inicio', component: CitizenHomeComponent},

  {path: 'login', component: CitizenLoginComponent},

  //Área do cidadão
  {
    path: 'cidadao',
    children: [
      {path: 'register', component: CitizenRegisterComponent},
      {path: 'complaints', component: MyComplaintsComponent, canActivate: [AuthGuard]}, 
      {path: 'new-complaint', component: ComplaintRegisterComponent, canActivate: [AuthGuard]},
      {path: 'complaint/:id', component: ComplaintViewComponent},
      {
        path: 'profile', component: CitizenProfileComponent, canActivate: [AuthGuard],
        children : [
          {path: '', redirectTo: 'me', pathMatch: 'full' },
          {path: 'me', component: PersonalInfoComponent}, 
          {path: 'saved-addresses', component: CitizenProfileComponent}, 
          {path: 'menu', component: CitizenProfileComponent}, 
          {path: 'notifications', component: CitizenProfileComponent}, 
        ]
      }
    ],
  },

  {
    path: 'prefeitura',
    children: [
      {
        path: 'dashboard', component: DashboardComponent,
        children: [
          {path: 'configs', component: DashboardComponent},
          {path: 'notifications', component: DashboardComponent},
          {path: 'all-complaint', component: DashboardComponent},
          {path: 'scheduling', component: DashboardComponent},
          {path: 'feedbacks', component: DashboardComponent},
          {path: 'kpi', component: DashboardComponent},
          {path: 'analysis', component: DashboardComponent},
          {path: 'export', component: DashboardComponent},
          {path: 'employees', component: DashboardComponent},
          {path: 'me', component: DashboardComponent},
        ]
      }
    ]
  },

  {path: 'register-confirmation', component: ConfirmationPageComponent},
];
