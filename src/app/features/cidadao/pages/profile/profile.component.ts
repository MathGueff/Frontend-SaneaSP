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
    {text : "Início", path: "menu", icon:{folder : "navigation", name: "home", alt: "Ir para início"}},
    {text : "Meus dados", path: "me", icon: {folder : "entities", name: "user", alt: "Ir para meus dados"}},
    {text : "Notificações", path: "notifications", icon: {folder : "navigation", name:"notification", alt: "Ir para notificações"}},
    {text : "Endereços salvos", path: "saved-addresses",  icon: {folder : "entities", name: "address", alt: "Ir para endereços salvos"}}
  ]
}
