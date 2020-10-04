import { Property } from '../state/Property';
import { View } from '../views/View';
import { Octicon } from './Octicon';

export const Toggle = <T>(view: View, entries: [T, keyof typeof Octicon][], state: Property<T>) => `
  <div class="toggle" data-id="${view.onClick(() => {
    const i = entries.findIndex(e => e[0] === state.get())
    state.set(entries[(i + 1) % entries.length][0])
  })}">
    ${Octicon[(entries.find(e => e[0] === state.get()) ?? entries[0])[1]]}
  </div>
`
