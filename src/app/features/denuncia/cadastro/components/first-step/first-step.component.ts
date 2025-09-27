import { Component, Input } from '@angular/core';
import { IStepForm } from '../../models/step-form.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [],
  templateUrl: './first-step.component.html',
  styleUrls: [
    './first-step.component.css'
  ]
})
export class FirstStepComponent implements IStepForm {
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
