export interface ISteps{
    formTitle : string,
    name: string,
    type : StepsTypes;
}

export enum StepsTypes{
    WHAT,
    WHERE,
    HOW
}