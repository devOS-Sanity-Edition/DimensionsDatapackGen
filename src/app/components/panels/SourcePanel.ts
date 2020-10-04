import { DataModel, ModelPath, Path } from '@mcschema/core';
import { STATE } from '../../app';
import { View } from '../../views/View';

export const SourcePanel = (view: View, model: DataModel) => `
  <div class="panel">
    <textarea class="source" data-id="${view.register(el => {
      model.addListener({
        invalidated() {
          const rawSource = STATE.rawSource.get()
          if (rawSource) {
            (el as HTMLTextAreaElement).value = rawSource
            return
          }
          const data = model.schema.transform(new ModelPath(model), model.data);
          (el as HTMLTextAreaElement).value = JSON.stringify(data, null, 2)
        }
      })
      el.addEventListener('change', () => {
        const rawSource = (el as HTMLTextAreaElement).value
        let parsed = {}
        try {
          parsed = JSON.parse(rawSource)
          STATE.rawSource.set('')
        } catch (err) {
          STATE.rawSource.set(rawSource)
          model.error(new Path().push('JSON'), err.message)
          console.log(STATE.errors)
          return
        }
        model.reset(parsed)
      })
    })}"></textarea>
  </div>
`
