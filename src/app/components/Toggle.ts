import { Property } from '../state/Property';
import { View } from '../views/View';
import { Octicon } from './Octicon';

export const Toggle = (view: View, entries: [string, keyof typeof Octicon][], state: Property<string>) => `
  <div data-id="${view.onClick(() => {
    const i = entries.findIndex(e => e[0] === state.get())
    state.set(entries[(i + 1) % entries.length][0])
  })}">
    ${Octicon[(entries.find(e => e[0] === state.get()) ?? entries[0])[1]]}
  </div>
`
