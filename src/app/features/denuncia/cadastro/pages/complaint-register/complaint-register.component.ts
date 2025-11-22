import { UploadService } from './../../../../../shared/services/upload.service';
import { Component, inject, OnInit } from "@angular/core";
import { FormStepsComponent } from "@features/denuncia/cadastro/components/form-steps/form-steps.component";
import { FormNavigationComponent } from "../../components/form-navigation/form-navigation.component";
import { FirstStepComponent } from "../../components/first-step/first-step.component";
import { SecondStepComponent } from "../../components/second-step/second-step.component";
import { ISteps, StepsTypes } from "../../models/steps";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ThirdStepComponent } from "../../components/third-step/third-step.component";
import { ReviewComponent } from "@features/denuncia/cadastro/components/review/review.component";
import { ViewportScroller } from "@angular/common";
import {
  ComplaintStatus,
  IComplaint,
  IComplaintPreview,
  ICreateComplaint,
} from "@features/denuncia/models/complaint.model";
import { ComplaintService } from "@features/denuncia/services/complaint.service";
import { AuthService } from "@core/services/auth.service";
import { ToastService } from "@shared/services/toast.service";
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: "app-complaint-register",
    imports: [
        FormStepsComponent,
        FormNavigationComponent,
        FirstStepComponent,
        SecondStepComponent,
        ThirdStepComponent,
        ReviewComponent,
        ReactiveFormsModule,
    ],
    templateUrl: "./complaint-register.component.html",
    styleUrls: ["./complaint-register.component.css"]
})
export class ComplaintRegisterComponent {
  private fb = inject(FormBuilder);
  protected StepsType = StepsTypes;

  protected scroller = inject(ViewportScroller);
  protected router = inject(Router);
  protected activeStep: StepsTypes = StepsTypes.WHAT;
  protected complaintService = inject(ComplaintService);
  protected authService = inject(AuthService);
  protected uploadService = inject(UploadService);
  protected toastService = inject(ToastService);

  protected steps: ISteps[] = [
    {
      formTitle: "O que aconteceu?",
      name: "O que",
      type: StepsTypes.WHAT,
      completed: false,
    },
    {
      formTitle: "Onde foi o ocorrido?",
      name: "Onde",
      type: StepsTypes.WHERE,
      completed: false,
    },
    {
      formTitle: "Qual o tipo do problema?",
      name: "Tipo",
      type: StepsTypes.HOW,
      completed: false,
    },
    {
      formTitle: "Como ficou sua denúncia",
      name: "Confirmação",
      type: StepsTypes.REVIEW,
      completed: false,
    },
  ];

  protected formGroup: FormGroup = this.fb.group({
    what: this.fb.group({
      descricao: [
        "",
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(1000),
        ],
      ],
      imagens: [[]],
      imageNames: [""],
    }),
    where: this.fb.group({
      rua: ["", [Validators.required]],
      bairro: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      cep: ["", [Validators.required]],
      numero: [""],
      complemento: [""],
    }),
    how: this.fb.group({
      categorias: ["", [Validators.required]],
      categoriasIds: ["", [Validators.required]],
    }),
    review: this.fb.group({
      titulo: ["", Validators.required],
      privacidade: [""],
    }),
  });

  get stepTitle(): string {
    return (
      this.steps.find((step) => this.activeStep === step.type)?.formTitle || ""
    );
  }

  getStepFormGroup(activeStep: number): FormGroup {
    const formGroups = [
      this.formGroup.controls["what"] as FormGroup,
      this.formGroup.controls["where"] as FormGroup,
      this.formGroup.controls["how"] as FormGroup,
    ];

    return formGroups[activeStep]; // fallback
  }

  nextStep(): void {
    const activeFormGroup = this.getStepFormGroup(this.activeStep);
    // if(activeFormGroup.invalid){
    //   this.toastService.show({message : 'Preencha todos os campos corretamente', error : true})
    //   return
    // }

    const nextStepIndex = this.activeStep + 1;
    if (
      nextStepIndex >= StepsTypes.WHAT &&
      nextStepIndex <= StepsTypes.REVIEW
    ) {
      this.steps[this.activeStep].completed = true;
      this.goToStep(nextStepIndex as StepsTypes);
    }
  }

  previousStep(): void {
    if (this.activeStep > 0) {
      this.goToStep(--this.activeStep);
    }
  }

  goToStep(step: StepsTypes) {
    this.activeStep = step;
    this.scrollTop();
  }

  getFormGroup(name: string): FormGroup {
    return this.formGroup.get(name) as FormGroup;
  }

  private scrollTop(): void {
    this.scroller.scrollToPosition([0, 0]);
  }

  protected buildComplaintPreviewData(): IComplaintPreview {
    const whatForm = this.getFormGroup("what");
    const whereForm = this.getFormGroup("where");
    const howForm = this.getFormGroup("how");
    const reviewForm = this.getFormGroup("review");
    const { descricao, imagens } = whatForm.controls;

    const { cep, cidade, bairro, rua, complemento } = whereForm.controls;

    const { categorias } = howForm.controls;

    const { titulo } = reviewForm.controls;

    return {
      descricao: descricao.value || "",
      imagens: imagens.value || "",
      cep: cep.value || "",
      cidade: cidade.value || "",
      bairro: bairro.value || "",
      rua: rua.value || "",
      complemento: complemento.value || "",
      categorias: categorias.value,
      titulo: titulo.value || `${categorias.value[0]['nome']} na ${rua.value}`,
      idUsuario: this.authService.currentUser()?.id ?? 0,
    };
  }

  //USADO para construir a denúncia que será enviada para o backend cadastrar
  protected buildComplaintData(): ICreateComplaint {
    const whatForm = this.getFormGroup("what");
    const whereForm = this.getFormGroup("where");
    const howForm = this.getFormGroup("how");
    const reviewForm = this.getFormGroup("review");

    const { descricao, imageNames } = whatForm.controls;

    const { cep, cidade, bairro, rua, complemento } = whereForm.controls;

    const { categoriasIds } = howForm.controls;

    const { titulo } = reviewForm.controls;

    return {
      descricao: descricao.value || "",
      imagens: imageNames.value || "",
      cep: cep.value || "",
      cidade: cidade.value || "",
      bairro: bairro.value || "",
      rua: rua.value || "",
      complemento: complemento.value || "",
      categorias: categoriasIds.value,
      titulo: titulo.value || "",
      idUsuario: this.authService.currentUser()?.id ?? 0,
    };
  }

  async onSubmit(){
    if (this.formGroup.valid) {
      let fileNames : string[] = [];
      const whatForm = this.getFormGroup("what");
      const files: File[] = whatForm.controls['imagens'].value;
      const complaintToCreate = this.buildComplaintData();
      if(complaintToCreate.imagens){
        const uploaded: string[] = await firstValueFrom(
          this.uploadService.postUpload(files)
        );
        fileNames = uploaded;
      }
      this.complaintService.createComplaint({
        ...complaintToCreate,
        imagens : fileNames
      }).subscribe({
        next: () => {
          this.router.navigate(['/inicio'])
          this.toastService.show({
            message: "Cadastrado com sucesso",
            error: false,
          });
        },
        error: (err) => {
          console.log(err);
          this.toastService.show({
            message: "Ocorreu um problema" + err,
            error: true,
          });
        },
      });
    }
  }

  mapImages(images: File[]) {
    return images.map(img => img.name)
  }
}
