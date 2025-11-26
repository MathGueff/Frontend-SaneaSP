interface ILabel {
    text: string
    for: string 
    class ?: string[]
}

interface IInput {
    id : string
    type : 'text' | 'number' | 'password' | 'tel' | 'email'
    placeholder : string,
    value ?: string,
    class ?: string[]
    minlength ?: number
    maxlength ?: number
    autocomplete ?: string
    step ?: string
    pattern ?: string
}

interface ITextArea { 
    id: string;
    placeholder?: string;
    class?: string[];
    minlength?: number;
    maxlength?: number;
    rows?: number;
    cols?: number;
}

interface IFormFieldBaseConfig{
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

export type IFormConfig<T extends IFormFieldInputConfig | IFormFieldTextareaConfig> = Array<T>;