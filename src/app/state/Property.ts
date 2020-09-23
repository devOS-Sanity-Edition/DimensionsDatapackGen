import { STATE } from '../app'

export type PropertyListener<T> = (oldValue: T | null, newValue: T) => void

export class Property<T> {
  constructor(protected value: T, protected listener?: PropertyListener<T>) {
    if (this.listener) this.listener(null, value)
  }
  set(value: T) {
    if (this.value === value) return
    if (this.listener) this.listener(this.value, value)
    this.value = value
    STATE.invalidate()
  }
  get(): T {
    return this.value
  }
}
