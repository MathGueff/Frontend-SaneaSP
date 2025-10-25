import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { IStepForm } from '../../models/step-form.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ViacepService } from '@shared/services/viacep.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'app-second-step',
    imports: [ReactiveFormsModule],
    templateUrl: './second-step.component.html',
    styleUrls: ['./second-step.component.css', '../../../../../shared/styles/form.style.css']
})
export class SecondStepComponent implements IStepForm, OnInit {
  @Input() formGroup !: FormGroup;
  protected viacepService = inject(ViacepService);
  
  isValid(): boolean {
    return true;
  }
  getData() {
    return true;
  }

  ngOnInit(): void {
    this.formGroup.controls['cep'].valueChanges.subscribe((cep) => {
      if (cep.length == 8) {
        this.searchAddress();
      } else {
        this.resetAddressControls();
      }
    })
  }
  searchAddress() {
    this.viacepService.getAddress(this.formGroup.controls['cep'].value).subscribe({
      next: (response: any) => {
        if (response.logradouro) {
          this.setAddressControl("rua", response.logradouro);
        } else {
          console.log("A rua não foi encontrada para o CEP informado.");
        }

        if (response.bairro) {
          this.setAddressControl("bairro", response.bairro);
        } else {
          console.log("O logradouro não foi encontrado para o CEP informado.");
        }

        if (response.localidade) {
          this.setAddressControl("cidade", response.localidade);
        } else {
          console.log("A cidade não foi encontrada para o CEP informado.");
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  resetAddressControls() {
    let addressControls = ["rua", "bairro", "cidade"];
    addressControls.forEach((field) => {
      this.formGroup.get(field)!.reset();
    });
  }

  private setAddressControl(control: string, value: string) {
    this.formGroup.get(control)?.setValue(value);
  }
}
