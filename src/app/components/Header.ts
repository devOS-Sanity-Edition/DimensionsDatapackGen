import { App } from '../App';
import { View } from '../views/View';
import { Dropdown } from './Dropdown';
import { Octicon } from './Octicon';
import { Toggle } from './Toggle';
import { languages } from '../../config.json'
import { Tracker } from '../Tracker';
import { locale } from '../Locales';

export const Header = (view: View, title: string, homeLink = '/') => {
  const panelTogglesId = view.register(el => {
    const getPanelToggles = () => {
      const panels = [['preview', 'play'], ['tree', 'note'], ['source', 'code']]
      if (!panels.map(e => e[0]).includes(App.mobilePanel.get())) return ''
      return panels
        .filter(e => e[0] !== App.mobilePanel.get())
        .filter(e => e[0] !== 'preview' || App.preview.get() !== null)
        .map(e => `<div data-id="${view.onClick(() => App.mobilePanel.set(e[0]))}">
          ${Octicon[e[1] as keyof typeof Octicon]}
        </div>`).join('')
    }
    App.mobilePanel.watchRun(() => {
      view.mount(el, getPanelToggles(), false)
    })
    App.preview.watchRun((value, oldValue) => {
      if (value === null && App.mobilePanel.get() === 'preview') {
        App.mobilePanel.set('tree')
      }
      if (value === null || oldValue === null) {
        view.mount(el, getPanelToggles(), false)
      }
    })
  })
  
  return `<header>
    <div class="titleBar">
        <div class="title">
            <a data-link href="${homeLink}" class="home-link" aria-label="${locale('home')}">${Octicon.three_bars}</a>
            <p>${title}</p>
        </div>
        <div class="buttons">
            <div class="btn">${Dropdown(view, 'globe', languages.map(l => [l.code, l.name]), App.language, Tracker.setLanguage)}</div>
            <div class="btn">${Toggle(view, [['dark', 'sun'], ['light', 'moon']], App.theme, Tracker.setTheme)}</div>
            <a class="btn" data-link href="/settings/fields/" title="${locale('settings')}">
                ${Octicon.gear}
            </a>
            <a class="btn" href="https://github.com/devOS-Sanity-Edition/DimensionsDatapackGen" target="_blank" rel="noreferrer" title="${locale('github')}">
                ${Octicon.mark_github}
            </a>
            
            <button class="btn" id="minimizeBtn">
                <svg x="0px" y="0px" viewBox="0 0 16 16">
                    <rect x="2" y="8" width="12" height="1"/>
                </svg>
            </button>
            <button class="btn" id="maximizeBtn">
                <svg x="0px" y="0px" viewBox="0 0 16 16">
                    <path d="M13,3v10H3V3H13 M14,2h-1H3H2v1v10v1h1h10h1v-1V3V2L14,2z"/>
                </svg>
            </button>
            <button class="btn" id="restoreBtn">
                <svg x="0px" y="0px" viewBox="0 0 16 16">
                    <path d="M5,2v3H2v9h9v-3h3V2H5z M10,13H3V6h7V13z M13,10h-2V5H6V3h7V10z"/>
                </svg>
            </button>
            <button id="closeBtn">
                <svg x="0px" y="0px" viewBox="0 0 16 16">
                    <polygon points="8.7,8 14.3,13.6 13.7,14.3 8,8.7 2.3,14.3 1.7,13.6 7.3,8 1.7,2.3 2.3,1.6 8,7.3 13.7,1.6 14.3,2.3 "/>
                </svg>
            </button>
        </div>
    </div>
  </header>`
}

/**
 TODO:
 - Fix button alignment
 - Fix Titlebar Text alignment
 - Fix Windows buttons alignment
 - Make Titlebar Text color line up w/ the theme
 - Change out the SVGs [later]
 */