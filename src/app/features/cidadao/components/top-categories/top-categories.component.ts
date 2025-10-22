import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ICategory } from '@features/categoria/models/category.model';
import { CategoryService } from '@features/categoria/services/category.service';
import { ComplaintService } from '@features/denuncia/services/complaint.service';
import { IResponseList } from '@shared/models/response.model';

@Component({
  selector: 'app-top-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-categories.component.html',
  styleUrls: ['./top-categories.component.css', '../../pages/citizen-home/citizen-home.component.css']
})
export class TopCategoriesComponent {
  private categoryService = inject(CategoryService);
  categories : ICategory[] = []

  constructor() { }

  ngOnInit(): void {
    this.categoryService.getTagsList().subscribe({
      next: (categoriesList) => {
        this.categories = categoriesList.slice(0, 5);;
      },
      error: (err) => {
        console.error('Erro ao buscar categorias:', err);
      }
    });
  }
}
