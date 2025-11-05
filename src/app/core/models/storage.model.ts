export interface IStorage {
  set(value: string): void;
  get(): string | null;
  remove(): void;
}
