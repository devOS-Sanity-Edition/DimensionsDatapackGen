import { Property } from '../state/Property';
import { View } from '../views/View';
import { Octicon } from './Octicon';

export const Dropdown = (view: View, icon: keyof typeof Octicon, entries: [string, string][], state: Property<string>) => `
  <div class="dropdown">
    <select data-id="${view.onChange((el) => {
      state.set((el as HTMLSelectElement).value)
    })}">
      ${entries.map(e => `
        <option value=${e[0]}>${e[1]}</option>
      `).join('')}
    </select>
    ${Octicon[icon]}
  </div>
`
