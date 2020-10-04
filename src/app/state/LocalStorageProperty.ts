import { Property, PropertOptions } from './Property'

export class LocalStorageProperty extends Property<string> {
  constructor(private id: string, fallback: string, options?: PropertOptions<string>) {
    super(localStorage.getItem(id) ?? fallback, options)
  }
  set(value: string) {
    super.set(value)
    localStorage.setItem(this.id, value)
  }
  get(): string {
    return this.value
  }
}
