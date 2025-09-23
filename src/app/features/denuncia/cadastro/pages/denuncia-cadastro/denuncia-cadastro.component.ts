import { Component } from '@angular/core';
import { FormStepsComponent } from '@features/denuncia/cadastro/components/form-steps/form-steps.component';
import { PrimeiraEtapaFormularioComponent } from '../../components/primeira-etapa-formulario/primeira-etapa-formulario.component';
import { ComplaintRegisterStepsTypes } from '../../models/complaint-register-steps.model';

@Component({
  selector: 'app-denuncia-cadastro',
  standalone: true,
  imports: [FormStepsComponent, PrimeiraEtapaFormularioComponent],
  templateUrl: './denuncia-cadastro.component.html',
  styleUrls: ['./denuncia-cadastro.component.css','../../../../../shared/styles/form.style.css']
})
export class DenunciaCadastroComponent {
  protected activeStep : ComplaintRegisterStepsTypes = ComplaintRegisterStepsTypes.WHAT;

  changeStep(){
    this.activeStep++;
  }
}
