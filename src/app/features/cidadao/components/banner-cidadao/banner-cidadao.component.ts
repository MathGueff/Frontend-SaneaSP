import { Component } from '@angular/core';

@Component({
  selector: 'app-cidadao-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner-cidadao.component.html',
  styleUrl: './banner-cidadao.component.css'
})
export class BannerCidadaoComponent {
  citizenButtonHovered : boolean = false;
  organizationButtonHovered : boolean = false;

  getButtonIcon(entity : 'citizen' | 'organization'){
    const hovered = entity == 'citizen' ? this.citizenButtonHovered : this.organizationButtonHovered; 
    return `icons/entities/${hovered ? "black": "white"}/${entity}.svg`
  }
}
