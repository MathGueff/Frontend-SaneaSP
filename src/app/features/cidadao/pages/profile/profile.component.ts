import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ILink } from '@shared/models/link.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  navbarLinks : ILink[] = [
    {name : "Início", path: "menu"},
    {name : "Meus dados", path: "me"},
    {name : "Minhas denuncias", path: "complaints"},
    {name : "Notificações", path: "notifications"},
    {name : "Endereços salvos", path: "saved-addresses"}
  ]
}
