import { CollectionRegistry, DataModel, LOCALES, PathError, SchemaRegistry } from '@mcschema/core';
import { getCollections, getSchemas } from '@mcschema/java-1.16'
import { View } from '../views/View';
import { LocalStorageProperty } from './LocalStorageProperty';
import config from '../../config.json'
import { Property } from './Property';
import { Visualizer } from '../visualization/Visualizer';
import { RegistryFetcher } from '../RegistryFetcher';

type UrlParams = {[name: string]: string}

const fetchLocale = async (id: string) => {
  const response = await fetch(`/locales/${id}.json`)
  LOCALES.register(id, await response.json())
}

export class State {
  theme = new LocalStorageProperty('theme', 'light', {
    silent: true,
    watcher: (value) => document.documentElement.setAttribute('data-theme', value)
  })
  language = new LocalStorageProperty('language', 'en')
  rawSource = new Property<string | null>(null)
  errors = new Property<PathError[]>([])
  errorsHidden = new Property(true)
  visualizer = new Property<Visualizer | null>(null)
  visualizerActive = new Property(false)

  collections: CollectionRegistry
  schemas: null | SchemaRegistry = null

  models: { [key: string]: DataModel | null } = {}
  constructor() {
    config.models.forEach(m => {
      this.models[m.schema] = null
    })
    this.collections = getCollections()

    Promise.all([
      fetchLocale('en'),
      RegistryFetcher(this.collections, config.registries)
    ]).then(() => {
      this.schemas = getSchemas(this.collections)
      config.models.forEach(m => {
        this.models[m.schema] = new DataModel(this.schemas!.get(m.schema))
      })
      this.invalidate()
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
