export interface IComplaintRegisterSteps{
    title : string,
    type : ComplaintRegisterStepsTypes;
}

export enum ComplaintRegisterStepsTypes{
    WHAT,
    WHERE,
    HOW
}