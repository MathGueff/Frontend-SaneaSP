import { Component, Input, OnInit } from "@angular/core";
import { IStepForm } from "../../models/step-form.model";
import { FormGroup } from "@angular/forms";
import {
  ICategoryGroup,
  ICategorySelect,
} from "@features/categoria/models/category.model";

@Component({
  selector: "app-third-step",
  standalone: true,
  imports: [],
  templateUrl: "./third-step.component.html",
  styleUrl: "./third-step.component.css",
})
export class ThirdStepComponent implements IStepForm, OnInit {
  @Input() formGroup!: FormGroup;

  ngOnInit(): void {
    this.loadSelectedCategories();
  }

  private loadSelectedCategories(): void {
    const selectedCategories = this.formGroup.get("categorias")?.value || [];

    if (selectedCategories.length > 0) {
      this.categoryGroups.forEach((group) => {
        group.group.forEach((category) => {
          category.selected = selectedCategories.includes(category.name);
        });
      });
    }
  }

  isValid(): boolean {
    const categorias = this.formGroup.get("categorias")?.value;
    return Array.isArray(categorias) && categorias.length > 0;
  }

  getData() {
    return {
      categorias: this.formGroup.get("categorias")?.value || [],
    };
  }

  waterCategoryNames = [
    "Falta de abastecimento",
    "Água imprópria",
    "Vazamento de água",
  ];

  sewageCategoryNames = [
    "Esgoto a céu aberto",
    "Vazamento de rede de esgoto",
    "Ligação irregular de esgoto",
  ];

  drainageCategoryNames = [
    "Boca de lobo entupida",
    "Alagamento",
    "Valas abertas",
  ];

  cleaningCategoriesNames = [
    "Coleta de lixo doméstico",
    "Limpeza de vias e espaços públicos",
    "Remoção de entulho ou grandes objetos",
  ];

  private createCategoryList(names: string[]): ICategorySelect[] {
    return names.map((name) => ({ name, selected: false }));
  }

  protected readonly waterCategories = this.createCategoryList(
    this.waterCategoryNames
  );
  protected readonly sewageCategories = this.createCategoryList(
    this.sewageCategoryNames
  );
  protected readonly drainageCategories = this.createCategoryList(
    this.drainageCategoryNames
  );
  protected readonly cleaningCategories = this.createCategoryList(
    this.cleaningCategoriesNames
  );

  protected categoryGroups: ICategoryGroup<ICategorySelect>[] = [
    {
      title: "Água",
      icon: { folder: "entities", name: "water", alt: "Categoria Água" },
      group: this.waterCategories,
    },
    {
      title: "Esgoto",
      icon: { folder: "entities", name: "sewage", alt: "Categoria Esgoto" },
      group: this.sewageCategories,
    },
    {
      title: "Drenagem",
      icon: { folder: "entities", name: "drainage", alt: "Categoria Drenagem" },
      group: this.drainageCategories,
    },
    {
      title: "Limpeza",
      icon: { folder: "entities", name: "cleaning", alt: "Categoria Limpeza" },
      group: this.cleaningCategories,
    },
  ];

  onCategorieClick(categorie: ICategorySelect) {
    categorie.selected = !categorie.selected;
    const selected: string[] = [];
    this.categoryGroups.forEach((group) => {
      group.group.forEach((c) => {
        if (c.selected) selected.push(c.name);
      });
    });
    this.formGroup.get("categorias")?.setValue(selected);
  }
}
