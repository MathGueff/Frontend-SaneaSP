import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ITag } from '../../models/interface/ITag.model';
import { TagService } from '../../Services/tag.service';


@Component({
  selector: 'app-tag-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tag-select.component.html',
  styleUrl: './tag-select.component.css'
})
export class TagSelectComponent {
  private tagService = inject(TagService);
  public formTags !: ITag[];
  public select = new FormControl<ITag | null>(null)
  public formSelects : ITag[] = []
  constructor() {
    this.tagService.getTagsList().subscribe({
      next: (tags) => this.formTags = tags.data
    })
    this.select.valueChanges.subscribe((tag)=>{
      if(tag){
        if(tag.id !== 0){
          if(! this.formSelects.find((tagArray) =>{
            return tagArray.id === tag.id
          })){
            this.formSelects.push(tag);
            console.log(this.formSelects)
          }
        }


      }
    })
  }

 protected TirarTagSelect( tag: ITag){
  let index = this.formSelects.indexOf(tag)
  if(index !== -1){
    this.formSelects.splice(index,1)
  }
 }


}
