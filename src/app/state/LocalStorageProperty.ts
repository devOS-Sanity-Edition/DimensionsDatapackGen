import { Property, PropertyListener } from './Property'

export class LocalStorageProperty extends Property<string> {
  constructor(private id: string, fallback: string, listener?: PropertyListener<string>) {
    super(localStorage.getItem(id) ?? fallback, listener)
  }
  set(value: string) {
    super.set(value)
    localStorage.setItem(this.id, value)
  }
  get(): string {
    return this.value
  }
}
