import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
    selector: "app-image-upload-input",
    imports: [],
    templateUrl: "./image-upload-input.component.html",
    styleUrl: "./image-upload-input.component.css"
})
export class ImageUploadInputComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Output() filesSelected = new EventEmitter<File[]>(); 

  triggerInputClick() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);  
      this.filesSelected.emit(files); 
    }
  }
}
