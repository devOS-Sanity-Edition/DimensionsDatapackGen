import { App } from './App'

interface Locale {
  [key: string]: string
}

export const Locales: {
  [key: string]: Locale
} = {
  'en': {
      "advancement": "Advancement",
      "button.add": "Add",
      "button.collapse": "Collapse",
      "button.expand": "Expand",
      "button.remove": "Remove",
      "copy": "Copy",
      "dimension-type": "Dimension Type",
      "dimension": "Dimension",
      "download": "Download",
      "error.block_state.missing_property": "Missing block property \"%0%\"",
      "fields": "Fields",
      "github": "GitHub",
      "home": "Home",
      "item-modifier": "Item Modifier",
      "language": "Language",
      "loot-table": "Loot Table",
      "minimize": "Minimize",
      "predicate": "Predicate",
      "redo": "Redo",
      "reset": "Reset",
      "settings": "Settings",
      "settings.fields.description": "Customize advanced field settings",
      "settings.fields.path": "Context",
      "settings.fields.name": "Name",
      "share": "Share",
      "title.generator": "%0% Generator",
      "title.home": "Data Pack Generators",
      "title.suffix": "%0% Minecraft 1.15, 1.16, 1.17",
      "presets": "Presets",
      "preview": "Visualize",
      "preview.show_density": "Show Density",
      "preview.scale": "Scale",
      "preview.depth": "Depth",
      "preview.width": "Width",
      "undo": "Undo",
      "world": "World Settings",
      "worldgen/biome": "Biome",
      "worldgen/carver": "Carver",
      "worldgen/feature": "Feature",
      "worldgen/noise-settings": "Noise Settings",
      "worldgen/processor-list": "Processor List",
      "worldgen/structure-feature": "Structure Feature",
      "worldgen/surface-builder": "Surface Builder",
      "worldgen/template-pool": "Template Pool"
  }
}

export function resolveLocaleParams(value: string, params?: string[]): string | undefined {
  return value?.replace(/%\d+%/g, match => {
    const index = parseInt(match.slice(1, -1))
    return params?.[index] !== undefined ? params[index] : match
  })
}

export function locale(key: string, params?: string[]): string {
  const value: string | undefined = Locales[App.language.get()]?.[key] ?? Locales.en[key]
  return resolveLocaleParams(value, params) ?? key
}

export function segmentedLocale(segments: string[], params?: string[], depth = 5, minDepth = 1): string | undefined {
  return [App.language.get(), 'en'].reduce((prev: string | undefined, code) => {
      if (prev !== undefined) return prev

      const array = segments.slice(-depth);
      while (array.length >= minDepth) {
          const locale = resolveLocaleParams(Locales[code]?.[array.join('.')], params)
          if (locale !== undefined) return locale
          array.shift()
      }

      return undefined
  }, undefined)
}
