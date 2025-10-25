import { InjectionToken } from "@angular/core";

export const LocalStorageToken = new InjectionToken<Storage | null>('Local Storage', {
    providedIn: 'root',
    factory: () =>{
         if (typeof window !== 'undefined') {
            return window.localStorage;
        }
        return null;
    }
})