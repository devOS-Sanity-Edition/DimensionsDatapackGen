import { Errors as SchemaErrors } from '@mcschema/core'
import { STATE } from '../app'
import { Header } from '../components/Header'
import { SplitGroup } from '../components/SplitGroup'
import { View } from './View'
import { TreePanel } from '../components/panels/TreePanel'
import { SourcePanel } from '../components/panels/SourcePanel'
import { Errors } from '../components/Errors'
import config from '../../config.json'

export class Generator extends View {
  private schema: typeof config.models[0]
  constructor() {
    super()
    const url = STATE.params.schema.replace(/\/$/, '')
    this.schema = config.models.find(m => m.id === url)!
  }
  render(): string {
    const model = STATE.models[this.schema.schema]
    if (model) {
      model.listeners = []
      model.addListener({
        errors(errors: SchemaErrors) {
          STATE.errors.set(errors.getAll())
        }
      })
    }
    return `
      ${Header(this, this.schema?.name + ' Generator' ?? '')}
      <div class="content">
        ${model ? SplitGroup(this, { direction: "horizontal", sizes: [66, 34] }, [
          TreePanel(this, model, true),
          SplitGroup(this, { direction: 'vertical', sizes: [60, 40] }, [
            SourcePanel(this, model),
            `<div class="panel"></div>`
          ])
        ]) : '<div class="spinner"></div>'}
      </div>
      ${STATE.errors.get().length > 0 ? Errors(this) : ''}
    `
  }
  mounted(el: HTMLElement) {
    super.mounted(el)
    STATE.models[this.schema.schema]?.invalidate()
  }
}
