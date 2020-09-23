import { Header } from '../components/Header'
import { View } from './View'
import config from '../../config.json'
import { Octicon } from '../components/Octicon'

export class Home extends View {
  render(): string {
    return `
      ${Header(this, 'Data Pack Generators')}
      <div class="home">
        <ul class="generators-list">
          ${config.models.map(m => `
            <li>
              <a data-link href="${m.id}" class="generators-card">
                ${m.name}
                ${m.children ? Octicon['chevron_right'] : ''}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    `
  }
}
