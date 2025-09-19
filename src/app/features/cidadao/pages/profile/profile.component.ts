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
    {name : "Início", path: "menu", icon: "home"},
    {name : "Meus dados", path: "me", icon: "user"},
    {name : "Minhas denuncias", path: "complaints",  icon: "complaint"},
    {name : "Notificações", path: "notifications", icon: "notification"},
    {name : "Endereços salvos", path: "saved-addresses",  icon: "address"}
  ]
}
