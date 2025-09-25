import { Component, Input } from '@angular/core';
import { IStepForm } from '../../models/step-form.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-segunda-etapa-formulario',
  standalone: true,
  imports: [],
  templateUrl: './segunda-etapa-formulario.component.html',
  styleUrls: ['./segunda-etapa-formulario.component.css', '../../../../../shared/styles/form.style.css']
})
export class SegundaEtapaFormularioComponent implements IStepForm{
  @Input() formGroup !: FormGroup;
  
  isValid(): boolean {
    return true;
  }
  getData() {
    return true;
  }

}
