import { Component, Input, ViewChild } from '@angular/core';
import { IStepForm } from '../../models/step-form.model';
import { FormGroup } from '@angular/forms';
import { ImageUploadInputComponent } from "../image-upload-input/image-upload-input.component";

@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [ImageUploadInputComponent],
  templateUrl: './first-step.component.html',
  styleUrls: [
    './first-step.component.css'
  ]
})
export class FirstStepComponent implements IStepForm {
  @Input() formGroup!: FormGroup;

  @ViewChild(ImageUploadInputComponent)
  imageUploadComp!: ImageUploadInputComponent;

  private imageFiles: File[] = [];
  protected filePreviews: string[] = [];

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
  }
}
