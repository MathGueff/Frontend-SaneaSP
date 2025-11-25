export interface ILabel {
    text: string
    for: string 
    class ?: string[]
}

export interface IInput {
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

export interface ITextArea { 
    id: string;
    placeholder?: string;
    value?: string;
    class?: string[];
    minlength?: number;
    maxlength?: number;
    rows?: number;
    cols?: number;
}

export interface IFormFieldBaseConfig{
    formControlName: string
    class ?: string[]
    label: ILabel
}

export type IFormFieldInputConfig = IFormFieldBaseConfig & {
    input: IInput
}

export type IFormFieldTextareaConfig = Omit<IFormFieldBaseConfig, 'label'> & {
    label ?: ILabel
    textarea: ITextArea
};