import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViacepService } from '../../Services/viacep.service';
import { UserService } from '../../Services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotFoundComponent } from '../../Common/not-found/not-found.component';
import { IReclamacao } from '../../models/interface/IReclamacao.interface';

@Component({
  selector: 'app-reclamacao-edicao',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NotFoundComponent],
  templateUrl: './reclamacao-edicao.component.html',
  styleUrl: './reclamacao-edicao.component.css'
})
export class ReclamacaoEdicaoComponent implements OnInit {
    private formBuider = inject(NonNullableFormBuilder);
    private router = inject(Router);
    private viacepService = inject(ViacepService);
    private userService = inject(UserService);
    private activeRouter = inject(ActivatedRoute);
    protected erro : string = "";
    protected vazio : boolean = false;
    protected path :string = "../";

    private reclamacao ?: IReclamacao

    rows: number = 2;
    src: any = null;


    form = this.formBuider.group({
      titulo: [this.reclamacao?.titulo, [Validators.required]],
      descricao: [this.reclamacao?.descricao, [Validators.required]],
      cep: [
        this.reclamacao?.cep,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      numero: [this.reclamacao?.numero, [Validators.required]],
      cidade: [this.reclamacao?.cidade, [Validators.required]],
      bairro: [this.reclamacao?.bairro, [Validators.required]],
      rua: [this.reclamacao?.rua, [Validators.required]],
      complemento: [this.reclamacao?.complemento],
      Tag: [this.reclamacao?.Tags],
      Imagem: [this.reclamacao?.Imagens],
    });

    onSubmit() {
      if (this.form.valid) {
        console.log(this.form.value);
        this.router.navigate(['reclamacao-inicial']);
      }
    }
    ngOnInit(): void {
      this.activeRouter.params.subscribe((params)=>{
        // this.reclamacao = this.reclamacoes.find((objReclamacao)=>{
        //   return objReclamacao.id ===  Number(params['id']);
        // })
        if(!this.reclamacao){
          this.vazio = true;
          this.erro = "Reclamação Inexistente";
          return;
        }
        this.form.patchValue({
          titulo: this.reclamacao.titulo,
          descricao: this.reclamacao?.descricao,
          cep: this.reclamacao.cep,
          cidade: this.reclamacao.cidade,
          rua: this.reclamacao.rua,
          bairro: this.reclamacao.bairro,
          complemento: this.reclamacao.complemento,
        });
        console.log(this.reclamacao);
      })
      this.form.controls.cep.valueChanges.subscribe(() => {
        if (
          this.form.controls.cep.valid &&
          this.form.controls.cep?.value?.length == 8) {
          this.searchAddress(this.form.controls.cep.value);
        } else {
          console.log('CEP INVÁLIDO');
          this.resetAddressControls();
        }
      });
    }
    searchAddress(cep:string) {
      this.viacepService.getAddress(cep).subscribe({
        next: (response) => {
          if (response.logradouro) {
            this.setAddressControl('rua', response.logradouro);
          } else {
            console.log('A rua não foi encontrada para o CEP informado.');
          }

          if (response.bairro) {
            this.setAddressControl('bairro', response.bairro);
          } else {
            console.log('O rua não foi encontrado para o CEP informado.');
          }

          if (response.localidade) {
            this.setAddressControl('cidade', response.localidade);
          } else {
            console.log('A cidade não foi encontrada para o CEP informado.');
          }
        },
        error: (e) => {
          console.log(e);
        },
      });
    }

    resetAddressControls() {
      let addressControls = ['rua', 'bairro', 'cidade'];
      addressControls.forEach((field) => {
        this.form.get(field)!.reset();
      });
    }

    private setAddressControl(control: string, value: string) {
      this.form.get(control)?.setValue(value);
    }
    protected autoResize():void {
      let objTextArea = document.querySelector('textarea');
      if (objTextArea?.value) {
        if (objTextArea.scrollHeight >= objTextArea.offsetHeight) {
          this.rows += 1;
          console.log("Scroll Height: "+ objTextArea.scrollHeight);
          console.log("offsetHeight: "+ objTextArea.offsetHeight);
        }
      } else {
        this.rows = 2;
      }
    }
    protected setPreview(event: any){
      const file:File = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.src = e.target.result;

        };
        reader.readAsDataURL(file);
      }
    }
}
