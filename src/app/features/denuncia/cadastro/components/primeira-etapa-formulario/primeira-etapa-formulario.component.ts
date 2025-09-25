import { Component, Input } from '@angular/core';
import { IStepForm } from '../../models/step-form.model';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-primeira-etapa-formulario',
  standalone: true,
  imports: [],
  templateUrl: './primeira-etapa-formulario.component.html',
  styleUrls: [
    './primeira-etapa-formulario.component.css',
    '../../../cadastro/pages/denuncia-cadastro/denuncia-cadastro.component.css'
  ]
})
export class PrimeiraEtapaFormularioComponent implements IStepForm {
  @Input() formGroup !: FormGroup;

  protected images: string[] = ["user1","user2","user3","user4","user5"];

  isValid(): boolean {
    return this.formGroup.valid;
  }

  getData() {
    return this.formGroup.value;
  }

  addImage(imageName: string) {
    //TODO: Código para adicionar imagem
  }
}
