import { App } from '../App';
import { View } from '../views/View';
import { Octicon } from './Octicon';
import { Toggle } from './Toggle';
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
        <div class="title header-title">
            <a href="${homeLink}" class="titlebtn" aria-label="${locale('home')}">${Octicon.three_bars}</a>
            <h2>${title}</h2>
        </div>
        <div class="buttons">
            ${Toggle(view, [['dark', 'sun'], ['light', 'moon']], App.theme, Tracker.setTheme, 'titlebtn')}
            <a class="titlebtn" href="/settings/fields/" title="${locale('settings')}">
                ${Octicon.gear}
            </a>
            <button class="titlebtn" onclick="openLink('https://github.com/devOS-Sanity-Edition/DimensionsDatapackGen')" title="${locale('github')}">
                ${Octicon.mark_github}
            </button>
            
            <button class="titlebtn" id="minimizeBtn">${Octicon.dash}</button>
            <button class="titlebtn" id="maximizeBtn">${Octicon.square}</button>
            <button class="titlebtn" id="restoreBtn">${Octicon.restore}</button>
            <button class="titlebtn" id="closeBtn">${Octicon.x}</button>
        </div>
    </div>
  </header>`
}

/**
 TODO:
 - Change out the SVGs [later]
 */