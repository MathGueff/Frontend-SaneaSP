import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IStepForm } from '../../models/step-form.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadInputComponent } from "../image-upload-input/image-upload-input.component";

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [ImageUploadInputComponent, ReactiveFormsModule],
  templateUrl: './first-step.component.html',
  styleUrls: [
    './first-step.component.css'
  ]
})
export class FirstStepComponent implements IStepForm, OnInit{
  @Input() formGroup!: FormGroup;

  @ViewChild(ImageUploadInputComponent)
  imageUploadComp!: ImageUploadInputComponent;

  private imageFiles: File[] = [];
  protected filePreviews: string[] = [];

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

  isValid(): boolean {
    return this.formGroup.valid;
  }

  getData() {
    return this.formGroup.value;
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
