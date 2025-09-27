import { Component } from '@angular/core';

@Component({
  selector: 'app-citizen-banner',
  standalone: true,
  imports: [],
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
