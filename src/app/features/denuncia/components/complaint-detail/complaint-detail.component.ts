import { Component } from '@angular/core';
import { ICategoryLabel } from '@features/categoria/models/categoria.model';
import { IIcon } from '@shared/models/icon.model';

@Component({
  selector: 'app-complaint-detail',
  standalone: true,
  imports: [],
  templateUrl: './complaint-detail.component.html',
  styleUrl: './complaint-detail.component.css'
})
export class ComplaintDetailComponent {

  protected MAX_CATEGORIES = 5;

  waterIcon : IIcon = {folder :"entities", name: "water.png", alt: ""};
  drainageIcon = "icons/entities/color/drainage.png";
  cleaningIcon = "icons/entities/color/cleaning.png";
  sewageIcon = "icons/entities/color/sewage.png";

  protected categories : ICategoryLabel[] = [
    {nome : "Água imprópria", icon: {folder: 'entities', name: 'water', alt: 'Categoria'}},
    {nome : "Água imprópria", icon: {folder: 'entities', name: 'sewage', alt: 'Categoria'}},
    {nome : "Água imprópria", icon: {folder: 'entities', name: 'drainage', alt: 'Categoria'}}
  ]
}
