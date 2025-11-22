import { IIcon } from "@shared/models/icon.model";

export interface ISteps{
    formTitle : string,
    icon: IIcon,
    description: string,
    name: string,
    type : StepsTypes,
    completed : boolean
}

export enum StepsTypes{
    WHAT,
    WHERE,
    HOW,
    REVIEW
}