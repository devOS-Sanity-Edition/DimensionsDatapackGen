import { STATE } from '../app'

export type PropertOptions<T> = {
  watcher?: (value: T, oldValue: T | null) => void
  silent?: boolean
}

export class Property<T> {
  constructor(public value: T, private options: PropertOptions<T> = {}) {
    if (options.watcher) options.watcher(value, null)
  }
  set(value: T) {
    if (this.value === value) return
    if (this.options.watcher) this.options.watcher(value, this.value)
    this.value = value
    if (!this.options.silent) STATE.invalidate()
  }
  get(): T {
    return this.value
  }
}
