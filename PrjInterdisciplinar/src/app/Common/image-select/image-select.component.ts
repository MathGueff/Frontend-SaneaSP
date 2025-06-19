import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-select',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './image-select.component.html',
  styleUrl: './image-select.component.css'
})
export class ImageSelectComponent {
  src: any = null;

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
