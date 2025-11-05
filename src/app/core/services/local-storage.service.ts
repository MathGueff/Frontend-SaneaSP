import { inject, Injectable } from "@angular/core";
import { LocalStorageToken } from "@core/auth/tokens/local-storage";

@Injectable({ providedIn: "root" })
export class LocalStorageService {
  private localStorageToken = inject(LocalStorageToken);

  get(item: string) {
    return this.localStorageToken?.getItem(item) || null;
  }

  getObject<T>(item: string): T | null {
    const value = this.get(item);
    return value ? (JSON.parse(value) as T) : null;
  }

  set(item: string, value: string) {
    return this.localStorageToken?.setItem(item, value);
  }

  setObject<T>(item: string, value: T) {
    this.localStorageToken?.setItem(item, JSON.stringify(value));
  }

  remove(item: string) {
    this.localStorageToken?.removeItem(item);
  }
}
