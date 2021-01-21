import { Property } from '../state/Property';
import { View } from '../views/View';
import { Octicon } from './Octicon';

export const Toggle = <T>(view: View, entries: [T, keyof typeof Octicon][], state: Property<T>, watcher?: (value: T) => void, toggleClass: string = 'toggle') => {
  const activeOcticon = () => Octicon[(entries.find(e => e[0] === state.get()) ?? entries[0])[1]]
  const toggle = view.register(el => {
    el.addEventListener('click', () => {
      const i = entries.findIndex(e => e[0] === state.get())
      state.set(entries[(i + 1) % entries.length][0])
    })
    state.watch(_ => el.innerHTML = activeOcticon(), 'toggle')
  })
  return `<button class="${toggleClass}" data-id="${toggle}">${activeOcticon()}</button>`
}
