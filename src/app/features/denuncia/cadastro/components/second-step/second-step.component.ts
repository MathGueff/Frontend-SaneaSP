import {
  Component,
  inject,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

import { MapComponent } from '@core/components/map/map.component';
import { GeocodingService } from '@core/services/geocoding.service';
import { ViacepService } from '@shared/services/viacep.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-second-step',
  imports: [ReactiveFormsModule, MapComponent],
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

  ngOnInit(): void {
    this.listenCepChanges();
    this.listenAddressChanges();
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
