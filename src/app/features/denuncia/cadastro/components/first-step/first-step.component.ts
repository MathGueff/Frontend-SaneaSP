import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadInputComponent } from "../image-upload-input/image-upload-input.component";
import { FormFieldComponent } from "@core/components/forms/form-field/form-field.component";
import { IFormFieldInputConfig } from '@core/models/form.model';

@Component({
    selector: 'app-first-step',
    imports: [ImageUploadInputComponent, ReactiveFormsModule, FormFieldComponent],
    templateUrl: './first-step.component.html',
    styleUrls: [
        './first-step.component.css'
    ]
})
export class FirstStepComponent implements OnInit{
  @Input() formGroup!: FormGroup;

  @ViewChild(ImageUploadInputComponent)
  imageUploadComp!: ImageUploadInputComponent;

  private imageFiles: File[] = [];
  protected filePreviews: string[] = [];
  protected descriptionInputConfig : IFormFieldInputConfig = {
    formControlName: 'descricao',
    input : {type: 'text', placeholder: 'Coloque o seu relato aqui', id: 'descricao', class: ['field__input--description']},
    label : {text: 'O que aconteceu', for: 'descricao'}
  }

  ngOnInit(): void {
    this.loadExistingImages();
  }

  private loadExistingImages(): void {
    const existingImages = this.formGroup.get('imagens')?.value;
    
    if (existingImages && existingImages.length > 0) {
      this.imageFiles = [...existingImages];
      
      existingImages.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onFilesSelected(files: File[]) {
    this.imageFiles.push(...files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });

    this.formGroup.get('imagens')?.setValue(this.imageFiles);
    this.formGroup.get('imageNames')?.setValue(this.imageFiles.map(img => img.name));
  }

  removeImage(index: number): void {
    this.imageFiles.splice(index, 1);
    this.filePreviews.splice(index, 1);
    this.formGroup.get('imagens')?.setValue(this.imageFiles);
  }
}
