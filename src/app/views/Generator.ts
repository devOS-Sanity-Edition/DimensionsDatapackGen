import { DataModel, SourceView, TreeView } from '@mcschema/core'
import { STATE } from '../app'
import { Header } from '../components/Header'
import { SplitGroup } from '../components/SplitGroup'
import { View } from './View'
import config from '../../config.json'
import { VisualizerView } from '../visualization/VisualizerView'

export class Generator extends View {
  private schema: typeof config.models[0]
  private model: DataModel
  constructor() {
    super()
    const url = STATE.params.schema.replace(/\/$/, '')
    this.schema = config.models.find(m => m.id === url)!
    this.model = STATE.models[this.schema.schema]
  }
  render(): string {
    this.model.listeners = []
    return `
      ${Header(this, this.schema?.name + ' Generator' ?? '')}
      <div class="content">
        ${SplitGroup(this, { direction: "horizontal", sizes: [66, 34] }, [
          `<div class="panel">
            <div class="tree" data-id="${this.register(el => {
              new TreeView(this.model, el as HTMLElement)
            })}"></div>
          </div>`,
          SplitGroup(this, { direction: 'vertical', sizes: [60, 40] }, [
            `<div class="panel">
              <textarea class="source" data-id="${this.register(el => {
                new SourceView(this.model, el as HTMLTextAreaElement, { indentation: 2 })
              })}"></textarea>
            </div>`,
            `<div class="panel"></div>`
          ])
        ])}
      </div>
    `
  }
  mounted(el: HTMLElement) {
    super.mounted(el)
    this.model.invalidate()
  }
}
