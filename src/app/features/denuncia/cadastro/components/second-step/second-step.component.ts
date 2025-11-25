import {
  Component,
  inject,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

import { MapComponent } from '@core/components/map/map.component';
import { GeocodingService } from '@core/services/geocoding.service';
import { ViacepService } from '@shared/services/viacep.service';
import { ToastService } from '@shared/services/toast.service';
import { FormFieldComponent } from '@core/components/forms/form-field/form-field.component';
import { IFormFieldConfig } from '@core/models/form.model';

@Component({
  selector: 'app-second-step',
  imports: [ReactiveFormsModule, MapComponent, FormFieldComponent],
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.css', '../../../../../shared/styles/form.style.css']
})
export class SecondStepComponent implements OnInit, OnDestroy {
  
  @Input() formGroup!: FormGroup;
  @ViewChild(MapComponent) map!: MapComponent;

  private destroy$ = new Subject<void>();

  private viacepService = inject(ViacepService);
  private toastService = inject(ToastService);
  private geocoding = inject(GeocodingService);

  protected formFields : IFormFieldConfig[] = [
    {
      formControlName: 'cep',
      label: { for: 'cep', text: 'CEP'},
      input: {
        id: 'cep',
        type: 'text',
        placeholder: '00000-000',
        class: ['field--zip-code'],
        minlength: 8,
        maxlength: 8
      }
    },
    {
      formControlName: 'cidade',
      label: { for: 'cidade', text: 'Cidade'},
      input: {
        id: 'cidade',
        type: 'text',
        placeholder: 'Ex: Sorocaba',
        class: ['field--city']
      }
    },
    {
      formControlName: 'rua',
      label: { for: 'rua', text: 'Rua'},
      input: {
        id: 'rua',
        type: 'text',
        placeholder: 'Ex: Rua Jardim Brasilândia',
        class: ['field--street']
      }
    },
    {
      formControlName: 'numero',
      label: { for: 'numero', text: 'Número'},
      input: {
        id: 'numero',
        type: 'number',
        placeholder: 'Ex: 123',
        class: ['field--number']
      }
    },
    {
      formControlName: 'bairro',
      label: { for: 'bairro', text: 'Bairro'},
      input: {
        id: 'bairro',
        type: 'text',
        placeholder: 'Ex: Jardim Brasilândia',
        class: ['field__input']
      }
    },
    {
      formControlName: 'complemento',
      label: { for: 'complemento', text: 'Complemento'},
      input: {
        id: 'complemento',
        type: 'text',
        placeholder: 'Ex: fundos',
        class: ['field__input']
      }
    }
  ];

  ngOnInit(): void {
    this.listenCepChanges();
    this.listenAddressChanges();
    console.log(this.formFields)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private listenCepChanges() {
    this.formGroup.controls['cep'].valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter(cep => cep?.length === 8),
        debounceTime(300)
      )
      .subscribe(() => this.searchByCep());
  }

  private listenAddressChanges() {
    const fields = ['rua', 'numero', 'bairro', 'cidade'];

    combineLatest(fields.map(f => this.formGroup.controls[f].valueChanges))
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(400)
      )
      .subscribe(() => {
        this.updateMapFromForm();
        this.searchCepByAddress();
      });
  }

  private searchCepByAddress() {
    const rua = this.formGroup.value['rua'];
    const cidade = this.formGroup.value['cidade'];
    if (rua && cidade) {
      this.viacepService.getCepByAddress(rua, cidade).subscribe({
        next: (result: any) => {
          if (Array.isArray(result) && result.length > 0 && result[0].cep) {
            this.formGroup.controls['cep'].setValue(
              result[0].cep.replace(/\D/g, ''),
              { emitEvent: false }
            );
          }
        },
        error: err => {
          // Não mostra erro para o usuário, apenas ignora
        }
      });
    }
  }

  private searchByCep() {
    const cep = this.formGroup.controls['cep']?.value;

    this.viacepService.getAddress(cep).subscribe({
      next: res => {
        if(res.erro){
          this.toastService.show({message: 'Digite um CEP existente', error: true})
          return
        }
        this.applyCepResponse(res)
      },
      error: err => this.toastService.show({ message: err.message, error: true })
    });
  }

  private applyCepResponse(response: any) {
    const assignments: Record<string, string> = {
      rua: response.logradouro,
      bairro: response.bairro,
      cidade: response.localidade,
    };

    Object.entries(assignments).forEach(([key, value]) => {
      if (value) this.formGroup.controls[key].setValue(value, { emitEvent: false });
    });

    this.updateMapFromForm();
  }

  private updateMapFromForm() {
    const rua = this.formGroup.value['rua'];
    const numero = this.formGroup.value['numero'];
    const cidade = this.formGroup.value['cidade'];

    const address = `${rua || ''}, ${numero || ''}, ${cidade || ''}`;

    if (!rua && !cidade) return;

    this.geocoding.geolocation(address).subscribe({
      next: coords => this.updateMap(coords.lat, coords.lon),
      error: err => this.toastService.show({ message: err.message, error: true }),
    });
  }

  private updateMap(lat: number, lon: number) {
    this.map.setMap(lat, lon, 13);

    this.map.removeLayers();

    this.map.addMarker(lat, lon);
  }
}
