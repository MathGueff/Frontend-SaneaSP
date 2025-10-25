import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IStepForm } from "../../models/step-form.model";
import { 
  IViewCategoryGroup, 
  ICategorySelect,
  ICategoryGroup,
  ICategory 
} from "@features/categoria/models/category.model";
import { CategoryService } from "@features/categoria/services/category.service";

@Component({
    selector: "app-third-step",
    imports: [],
    templateUrl: "./third-step.component.html",
    styleUrl: "./third-step.component.css"
})
export class ThirdStepComponent implements IStepForm, OnInit {
  @Input() formGroup!: FormGroup;
  
  protected categoryGroups: IViewCategoryGroup<ICategorySelect>[] = [];
  protected isLoading = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategoriesFromAPI();
  }

  private loadCategoriesFromAPI(): void {
    this.categoryService.getGroups().subscribe({
      next: (grupos: ICategoryGroup[]) => {
        this.categoryGroups = grupos.map(grupo => this.mapGroupToView(grupo));
        this.isLoading = false;
        this.loadSelectedCategories();
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
        this.isLoading = false;
      }
    });
  }

  private mapGroupToView(grupo: ICategoryGroup): IViewCategoryGroup<ICategorySelect> {
    return {
      title: grupo.nome,
      icon: this.getIconForGroup(grupo.nome, grupo.icone),
      group: grupo.categorias.map((categoria) => ({
        id: categoria.id,
        name: categoria.nome,
        id_grupo: grupo.id, 
        selected: false
      }))
    };
  }

  private getIconForGroup(nomeGrupo: string, icone: string): any {
    const iconMap: { [key: string]: any } = {
      'Água': { folder: "entities", name: "water", alt: "Categoria Água" },
      'Esgoto': { folder: "entities", name: "sewage", alt: "Categoria Esgoto" },
      'Drenagem': { folder: "entities", name: "drainage", alt: "Categoria Drenagem" },
      'Limpeza': { folder: "entities", name: "cleaning", alt: "Categoria Limpeza" }
    };

    return iconMap[nomeGrupo] || { folder: "entities", name: "default", alt: "Categoria" };
  }

  private loadSelectedCategories(): void {
    const selectedCategories: ICategory[] = this.formGroup.get("categorias")?.value || [];

    if (selectedCategories.length > 0) {
      this.categoryGroups.forEach(group => {
        group.group.forEach(category => {
          category.selected = selectedCategories.some(
            selected => selected.id === category.id
          );
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

  onCategorieClick(categorie: ICategorySelect) {
    categorie.selected = !categorie.selected;
    
    const selectedCategories: ICategory[] = [];
    this.categoryGroups.forEach(group => {
      group.group.forEach(c => {
        if (c.selected) {
          selectedCategories.push({
            id: c.id,
            nome: c.name,
            id_grupo: c.id_grupo
          });
        }
      });
    });
    
    this.formGroup.get("categorias")?.setValue(selectedCategories);
    this.formGroup.get("categoriasIds")?.setValue(selectedCategories.map(selected => selected.id));
  }
}