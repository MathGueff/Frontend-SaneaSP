import { FormControl } from "@angular/forms"

export interface IFormFieldConfig{
    formControlName: string
    class ?: string[]
    label: {
        text: string
        for: string 
        class ?: string[]
    }
    input: {
        id : string
        type : 'text' | 'number' | 'password' | 'tel'
        placeholder : string,
        value ?: string,
        class ?: string[]
        minlength ?: number
        maxlength ?: number
        autocomplete ?: string
        step ?: string
        pattern ?: string
    }
}
