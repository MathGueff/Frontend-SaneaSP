import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "@core/components/header/header.component";

@Component({
  selector: 'app-cidadao-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class CidadaoLayoutComponent {

}
