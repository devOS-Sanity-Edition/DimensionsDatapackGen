const dec2hex = (dec: number) => ('0' + dec.toString(16)).substr(-2)

export function hexId(length = 12) {
  var arr = new Uint8Array(length / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

export class View {
  private registry: { [id: string]: (el: Element) => void } = {}

  render(): string {
    return ''
  }

  register(callback: (el: Element) => void): string {
    const id = hexId()
    this.registry[id] = callback
    return id
  }

  on(type: string, callback: (el: Element) => void): string {
    return this.register(el => {
      el.addEventListener(type, evt => {
        callback(el)
        evt.stopPropagation()
      })
    })
  }

  onChange(callback: (el: Element) => void): string {
    return this.on('change', callback)
  }

  onClick(callback: (el: Element) => void): string {
    return this.on('click', callback)
  }

  mounted(el: HTMLElement): void {
    for (const id in this.registry) {
      const element = el.querySelector(`[data-id="${id}"]`)
      if (element !== null) this.registry[id](element)
    }
    this.registry = {}
  }
}
