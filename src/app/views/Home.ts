import { Header } from '../components/Header'
import { View } from './View'
import { Octicon } from '../components/Octicon'
import config from '../../config.json'
import { STATE } from '../app'

const GeneratorCard = (url: string, name: string, arrow?: boolean, active?: boolean) =>  `
  <li>
    <a data-link href="${url}" class="generators-card${active ? ' selected' : ''}">
      ${name}
      ${arrow ? Octicon['chevron_right'] : ''}
    </a>
  </li>
`

export class Home extends View {
  private category?: string
  constructor() {
    super()
    this.category = STATE.searchParams.get('category') ?? undefined
  }
  render(): string {
    return `
      ${Header(this, 'Data Pack Generators')}
      <div class="home">
        <ul class="generators-list">
          ${config.models
            .filter(m => !m.category)
            .map(m => GeneratorCard(m.id, m.name))
            .join('')}
          ${[...new Set(
              config.models
                .filter(m => m.category)
                .map(m => m.category)
            )]
            .map(c => GeneratorCard('?category=' + c, c!, true, c === this.category))
            .join('')}
        </ul>
        ${this.category ? `
          <ul class="generators-list">
          ${config.models
            .filter(m => m.category === this.category)
            .map(m => GeneratorCard(m.id, m.name)).join('')}
          </ul>
        ` : ''}
      </div>
    `
  }
}
