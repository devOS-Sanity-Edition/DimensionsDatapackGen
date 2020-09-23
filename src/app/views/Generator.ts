import { STATE } from '../app'
import { Header } from '../components/Header'
import { Panel } from '../components/Panel'
import { SplitGroup } from '../components/SplitGroup'
import { View } from './View'

export class Generator extends View {
  private schema: string
  constructor() {
    super()
    this.schema = STATE.params.schema
  }
  render(): string {
    return `
      ${Header(this, this.schema)}
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
