import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Layout/header/header.component";
import { FooterComponent } from './Layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "./Common/toast/toast.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PrjInterdisciplinar';
}
