export interface ISteps{
    formTitle : string,
    name: string,
    type : StepsTypes,
    completed : boolean
}

export enum StepsTypes{
    WHAT,
    WHERE,
    HOW
}