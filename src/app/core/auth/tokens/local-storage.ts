import { InjectionToken } from "@angular/core";

export const LocalStorageToken = new InjectionToken<Storage>('Local Storage', {
    providedIn: 'root',
    factory: () => window.localStorage
})