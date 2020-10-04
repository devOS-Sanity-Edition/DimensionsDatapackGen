import { DataModel, ModelPath, Mounter } from '@mcschema/core';
import { View } from '../../views/View';
import { Octicon } from '../Octicon';

const createPopupIcon = (type: string, icon: keyof typeof Octicon, popup: string) => {
  const div = document.createElement('div')
  div.className = `node-icon ${type}`
  div.addEventListener('click', evt => {
    div.getElementsByTagName('span')[0].classList.add('show')
    document.body.addEventListener('click', evt => {
      div.getElementsByTagName('span')[0].classList.remove('show')
    }, { capture: true, once: true })
  })
  div.insertAdjacentHTML('beforeend', `<span class="icon-popup">${popup}</span>${Octicon[icon]}`)
  return div
}

const treeViewObserver = (el: HTMLElement) => {
  el.querySelectorAll('.node[data-help]').forEach(e => {
    e.querySelector('.node-header')?.appendChild(
      createPopupIcon('node-help', 'info', e.getAttribute('data-help') ?? ''))
  })
  el.querySelectorAll('.node[data-error]').forEach(e => {
    e.querySelector('.node-header')?.appendChild(
      createPopupIcon('node-error', 'issue_opened', e.getAttribute('data-error') ?? ''))
  })
  el.querySelectorAll('.collapse.closed, button.add').forEach(e => {
    e.insertAdjacentHTML('afterbegin', Octicon['plus_circle'])
  })
  el.querySelectorAll('.collapse.open, button.remove').forEach(e => {
    e.insertAdjacentHTML('afterbegin', Octicon['trashcan'])
  })
}

export const TreePanel = (view: View, model: DataModel, showHeader?: boolean) => {
  const mounter = new Mounter()
  return `<div class="panel">
    <div class="tree" data-id="${view.register(el => {
      model.addListener({
        invalidated() {
          const path = new ModelPath(model)
          const rendered = model.schema.render(path, model.data, mounter)
          const category = model.schema.category(path)
          if (rendered[1]) {
            el.innerHTML = `<div class="node ${model.schema.type(path)}-node" ${category ? `data-category="${category}"` : ''}>
              <div class="node-header">${rendered[1]}</div>
              <div class="node-body">${rendered[2]}</div>
            </div>`
          } else {
            el.innerHTML = rendered[2]
          }
          treeViewObserver(el as HTMLElement)
          mounter.mount(el as HTMLElement)
        }
      })
    })}"></div>
  </div>`
}
