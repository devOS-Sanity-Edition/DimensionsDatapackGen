import { DataModel, NumberNode, ObjectNode } from "@mcschema/core";
import { View } from "../views/View";
import { LocalStorageProperty } from './LocalStorageProperty';
import config from '../../config.json'

type UrlParams = {[name: string]: string}

export class State {
  theme = new LocalStorageProperty('theme', 'light', (_, value) => {
    document.documentElement.setAttribute('data-theme', value)
  })
  language = new LocalStorageProperty('language', 'en')

  models: { [key: string]: DataModel } = {}
  constructor() {
    config.models.forEach(m => {
      this.models[m.schema] = new DataModel(ObjectNode({
        foo: NumberNode()
      }))
    })
  }

  params: UrlParams = {}
  setParams(params: UrlParams) {
    this.params = params
  }

  searchParams: URLSearchParams = new URLSearchParams(location.search)
  setSearchParams(searchParams: URLSearchParams) {
    this.searchParams = searchParams
  }

  private view?: View
  setView(view: View) {
    this.view = view
  }

  invalidate() {
    const target = document.getElementById('app')!
    target.innerHTML = this.view!.render()
    this.view!.mounted(target)
  }
}
