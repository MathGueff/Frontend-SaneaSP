import { FormGroup } from "@angular/forms"

export interface IStepForm{
    formGroup : FormGroup,
    isValid() : boolean,
    getData() : any
}