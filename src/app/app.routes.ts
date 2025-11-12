
import { Routes } from "@angular/router";
import { AuthGuard } from "@core/guards/auth.guard";
import { AdminGuard } from "@core/guards/auth-admin.guard";
import { CitizenHomeComponent } from "@features/cidadao/pages/citizen-home/citizen-home.component";
import { LoginComponent as CitizenLoginComponent } from "@features/cidadao/pages/login/login.component";
import { RegisterComponent as CitizenRegisterComponent } from "@features/cidadao/pages/register/register.component";
import { ProfileComponent as CitizenProfileComponent } from "@features/cidadao/pages/profile/profile.component";
import { CitizenLayoutComponent } from "@features/layout/citizen-layout/citizen-layout.component";
import { PersonalInfoComponent } from "@features/cidadao/components/personal-info/personal-info.component";
import { MyComplaintsComponent } from "@features/cidadao/components/my-complaints/my-complaints.component";
import { ComplaintRegisterComponent } from "@features/denuncia/cadastro/pages/complaint-register/complaint-register.component";
import { ComplaintViewComponent } from "./features/denuncia/pages/complaint-view/complaint-view.component";
import { ConfirmationPageComponent } from "@core/auth/pages/confirmation-page/confirmation-page.component";
import { LostPasswordFormComponent } from "@core/auth/pages/lost-password-form/lost-password-form.component";
import { ResetPasswordFormComponent } from "@core/auth/pages/reset-password-form/reset-password-form.component";
import { DashboardComponent } from '@features/prefeitura/pages/dashboard/dashboard.component';
import { ConfigsComponent } from '@features/prefeitura/components/configs/configs.component';
import { NotificationComponent } from '@features/prefeitura/components/notification/notification.component';
import { AllComplaintComponent } from '@features/prefeitura/components/all-complaint/all-complaint.component';
import { SchedulingComponent } from '@features/prefeitura/components/scheduling/scheduling.component';
import { FeedbacksComponent } from '@features/prefeitura/components/feedbacks/feedbacks.component';
import { KpiComponent } from '@features/prefeitura/components/kpi/kpi.component';
import { AnalysisComponent } from '@features/prefeitura/components/analysis/analysis.component';
import { ExportComponent } from '@features/prefeitura/components/export/export.component';
import { EmployeesComponent } from '@features/prefeitura/components/employees/employees.component';
import { MeComponent } from '@features/prefeitura/components/me/me.component';

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
          {path: 'configs', component: ConfigsComponent},
          {path: 'notifications', component: NotificationComponent},
          {path: 'all-complaint', component: AllComplaintComponent},
          {path: 'scheduling', component: SchedulingComponent},
          {path: 'feedbacks', component: FeedbacksComponent},
          {path: 'kpi', component: KpiComponent},
          {path: 'analysis', component: AnalysisComponent},
          {path: 'export', component: ExportComponent},
          {path: 'employees', component: EmployeesComponent},
          {path: 'me', component: MeComponent},
        ]
      }
    ]
  },

  { path: "register-confirmation", component: ConfirmationPageComponent },
  { path: "lost-my-password", component: LostPasswordFormComponent },
  { path: "reset-password", component: ResetPasswordFormComponent}
];
