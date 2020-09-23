import { STATE } from '../app'
import { Header } from '../components/Header'
import { Panel } from '../components/Panel'
import { SplitGroup } from '../components/SplitGroup'
import { View } from './View'
import config from '../../config.json'

export class Generator extends View {
  private schema?: typeof config.models[0]
  constructor() {
    super()
    const url = STATE.params.schema.replace(/\/$/, '')
    this.schema = config.models.find(m => m.id === url)
  }
  render(): string {
    return `
      ${Header(this, this.schema?.name + ' Generator' ?? '')}
      <div class="content">
        ${SplitGroup(this, { direction: "horizontal", sizes: [66, 34] }, [
          Panel(this, 'note', '<h2>1</h2>'),
          SplitGroup(this, { direction: 'vertical', sizes: [60, 40] }, [
            Panel(this, 'code', '<h2>2</h2>'),
            Panel(this, 'play', '<h2>3</h2>')
          ])
        ])}
      </div>
    `
  }
}
