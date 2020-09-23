import { View } from '../views/View';
import { Octicon } from './Octicon';

export const Panel = (view: View, icon: keyof typeof Octicon, content: string) => `
  <div class="panel">
    <div class="panel-content">
      ${Octicon[icon]}
      ${content}
    </div>
  </div>
`
