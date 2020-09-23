import { Property } from "../state/Property";
import { View } from "../views/View";
import { Octicon } from "./Octicon";

type ToggleEntry = [string, keyof typeof Octicon]

export const Toggle = (view: View, iconMap: ToggleEntry[], state: Property<string>) => `
  <div data-id="${view.onClick(() => {
    const i = iconMap.findIndex(e => e[0] === state.get())
    state.set(iconMap[(i + 1) % iconMap.length][0])
  })}">
    ${Octicon[(iconMap.find(e => e[0] === state.get()) ?? iconMap[0])[1]]}
  </div>
`
