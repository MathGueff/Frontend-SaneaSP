import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-citizen-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './citizen-banner.component.html',
  styleUrl: './citizen-banner.component.css'
})
export class CitizenBannerComponent {
  citizenButtonHovered : boolean = false;
  organizationButtonHovered : boolean = false;

  getButtonIcon(entity : 'citizen' | 'organization'){
    const hovered = entity == 'citizen' ? this.citizenButtonHovered : this.organizationButtonHovered; 
    return `icons/entities/${hovered ? "black": "white"}/${entity}.svg`
  }
}
