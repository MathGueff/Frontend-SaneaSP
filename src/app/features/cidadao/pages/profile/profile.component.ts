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
    {name : "Início", path: "menu", icon:{folder : "navigation", name: "home"}},
    {name : "Meus dados", path: "me", icon: {folder : "entities", name: "user"}},
    {name : "Minhas denuncias", path: "complaints",  icon: {folder : "entities", name:"complaint"}},
    {name : "Notificações", path: "notifications", icon: {folder : "navigation", name:"notification"}},
    {name : "Endereços salvos", path: "saved-addresses",  icon: {folder : "entities", name: "address"}}
  ]
}
