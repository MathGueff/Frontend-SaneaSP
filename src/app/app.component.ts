import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '@core/components/footer/footer.component';

import { ToastComponent } from "./shared/components/toast/toast.component";
import { HeaderComponent } from '@core/components/header/header.component';
import { AuthService } from '@core/services/auth.service';
import { IUser } from '@features/usuario/models/user.model';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  
}
