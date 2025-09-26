import { Component, Input } from "@angular/core";
import { IStepForm } from "../../models/step-form.model";
import { FormGroup } from "@angular/forms";
import {
  ICategoria,
  ICategoryGroup,
  ICategorySelect,
} from "@features/categoria/models/categoria.model";

@Component({
  selector: "app-third-step",
  standalone: true,
  imports: [],
  templateUrl: "./third-step.component.html",
  styleUrl: "./third-step.component.css",
})
export class ThirdStepComponent implements IStepForm {
  @Input() formGroup!: FormGroup<any>;
  isValid(): boolean {
    return true;
  }
  getData() {
    return true;
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
    return names.map((nome) => ({ nome, selected: false }));
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

  protected categoryGroups: ICategoryGroup[] = [
    {title : 'Água', group: this.waterCategories},
    {title : 'Esgoto', group: this.sewageCategories},
    {title : 'Drenagem', group: this.drainageCategories},
    {title : 'Limpeza', group: this.cleaningCategories},
  ]
}
