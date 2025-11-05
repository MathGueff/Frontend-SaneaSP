import { Component, inject, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ICategoryGroup } from "@features/categoria/models/category-group.model";
import { ICategory } from "@features/categoria/models/category.model";
import { CategoryService } from "@features/categoria/services/category.service";

@Component({
  selector: "app-third-step",
  imports: [],
  templateUrl: "./third-step.component.html",
  styleUrl: "./third-step.component.css",
})
export class ThirdStepComponent implements OnInit {
  @Input() formGroup!: FormGroup;

  private categoryService = inject(CategoryService);
  protected categoryGroups: ICategoryGroup[] = [];
  protected selectedCategories: ICategory[] = [];

  ngOnInit(): void {
    this.loadCategoriesFromAPI();

    const preSelected = this.formGroup.get("categorias")?.value;
    if (Array.isArray(preSelected)) {
      this.selectedCategories = preSelected;
    }
  }

  private loadCategoriesFromAPI(): void {
    this.categoryService.getGroups().subscribe({
      next: (groups: ICategoryGroup[]) => {
        this.categoryGroups = groups;
      },
      error: (error: any) => {
        console.error("Erro ao carregar categorias:", error);
      },
    });
  }

  isCategorySelected(category: ICategory) {
    return this.selectedCategories.some(
      (selected) => selected.id === category.id,
    );
  }
  onCategoryClick(group: ICategoryGroup, category: ICategory) {
    if (this.isCategorySelected(category)) {
      this.selectedCategories = this.selectedCategories.filter(
        (compare) => compare.id !== category.id,
      );
    } else {
      this.selectedCategories.push({
        ...category,
        grupo: group,
      });
    }

    this.formGroup.get("categorias")?.setValue(this.selectedCategories);
    this.formGroup
      .get("categoriasIds")
      ?.setValue(this.selectedCategories.map((selected) => selected.id));
  }
}
