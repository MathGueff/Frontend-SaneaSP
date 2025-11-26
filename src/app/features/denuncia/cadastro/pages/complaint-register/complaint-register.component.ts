import { UploadService } from './../../../../../shared/services/upload.service';
import { Component, inject } from "@angular/core";
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
  IComplaintPreview,
  ICreateComplaint,
} from "@features/denuncia/models/complaint.model";
import { ComplaintService } from "@features/denuncia/services/complaint.service";
import { AuthService } from "@core/services/auth.service";
import { ToastService } from "@shared/services/toast.service";
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { ICategory } from '@features/categoria/models/category.model';

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
      icon: {
        folder: 'actions',
        name: 'report.svg',
        alt: 'O que'
      },
      description: 'Descrição e imagens do ocorrido',
      completed: false,
    },
    {
      formTitle: "Onde foi o ocorrido?",
      name: "Onde",
      type: StepsTypes.WHERE,
      icon: {
        folder: 'entities',
        name: 'address.svg',
        alt: 'Onde'
      },
      description: 'Endereço onde ocorreu',
      completed: false,
    },
    {
      formTitle: "Qual o tipo do problema?",
      name: "Tipo",
      type: StepsTypes.HOW,
       icon: {
        folder: 'entities',
        name: 'category.svg',
        alt: 'Tipo'
      },
      description: 'Categorias relacionadas ao problema',
      completed: false,
    },
    {
      formTitle: "Como ficou sua denúncia",
      name: "Revisão",
      type: StepsTypes.REVIEW,
       icon: {
        folder: 'entities',
        name: 'complaint.svg',
        alt: 'Revisão'
      },
      description: 'Revise os dados inseridos',
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
      rua: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      bairro: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      cidade: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      cep: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      numero: ["", [Validators.maxLength(30)]],
      complemento: [""],
    }),
    how: this.fb.group({
      categorias: [""],
      categoriasIds: [""],
    }),
    review: this.fb.group({
      titulo: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
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
    const invalidControl = Object.keys(activeFormGroup.controls)
      .find(key => activeFormGroup.get(key)?.invalid);

    if (invalidControl) {
      this.toastService.show({
        message: `O campo "${invalidControl}" está inválido.`,
        error: true
      });
      return
    }

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
      titulo: titulo.value || this.generateCommonTitle(bairro.value, rua.value, categorias.value),
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

  generateCommonTitle(bairro?: string, rua?: string, categorias?: ICategory[]): string {
    const user = this.authService.currentUser();
    const firstName = user?.nome?.split(' ')[0] || '';
    const hasCategoria = Array.isArray(categorias) && categorias.length > 0 && categorias[0]?.nome;
    const categoriaNome = hasCategoria ? categorias[0].nome : '';

    // Se houver categoria e rua
    if (hasCategoria && rua) {
      return `${categoriaNome} na ${rua}`;
    }
    // Se houver categoria e bairro
    if (hasCategoria && bairro) {
      return `${categoriaNome} ${bairro} de ${firstName}`.trim();
    }

    if (rua && !hasCategoria) {
      return `Relato em "${rua}"`;
    }
    // fallback
    return 'Relato por ' + firstName;
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
