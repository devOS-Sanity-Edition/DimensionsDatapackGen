import { App, Models } from './App';
import { View } from './views/View';
import { Home } from './views/Home'
import { FieldSettings } from './views/FieldSettings'
import { Generator } from './views/Generator'
import { locale } from './Locales';
import config from '../config.json'

declare global {
  interface Window {
    app: any;
    openLink: (url: string) => void;
  }
}

const categories = config.models.filter(m => m.category === true)

function electron() {
  const {ipcRenderer} = require("electron")
  const {shell} = require("electron").remote

  document.getElementById("minimizeBtn")!!.addEventListener("click", () => {
    ipcRenderer.send("minimize")
  })

  document.getElementById("maximizeBtn")!!.addEventListener("click", () => {
    ipcRenderer.send("maximize")
  })

  document.getElementById("restoreBtn")!!.addEventListener("click", () => {
    ipcRenderer.send("unmaximize")
  })

  document.getElementById("closeBtn")!!.addEventListener("click", () => {
    ipcRenderer.send("close")
  })

  ipcRenderer.on("maximized", () => {
    document.body.classList.add("maximized")
  })

  ipcRenderer.on("unmaximized", () => {
    document.body.classList.remove("maximized")
  })

  document.querySelectorAll("a:not(.titlebtn)").forEach(link => {
    if (link instanceof HTMLAnchorElement) link.addEventListener("click", (e) => {
      shell.openExternal(link.href)
      e.preventDefault()
    });
  })

  window.openLink = (url) => {
    shell.openExternal(url)
  }
}

const router = async () => {
  const urlParts = location.hash.replace('#', '').split('/').filter(e => e)
  const urlParams = new URLSearchParams(location.search)

  const target = document.getElementById('app')!
  let title = locale('title.home')
  let renderer = (view: View) => ''
  let panel = 'home'

  if (urlParts.length === 0){
    App.model.set({ id: '', name: 'Data Pack', category: true, minVersion: '1.15'})
    renderer = Home
  } else if (urlParts[0] === 'settings' && urlParts[1] === 'fields') {
    panel = 'settings'
    renderer = FieldSettings
  } else if (urlParts.length === 1 && categories.map(m => m.id).includes(urlParts[0])) {
    App.model.set(categories.find(m => m.id === urlParts[0])!)
    renderer = Home
  } else {
    panel = 'tree'
    App.model.set(config.models.find(m => m.id === urlParts.join('/'))!)
    if (urlParams.has('q')) {
      try {
        const data = atob(urlParams.get('q') ?? '')
        Models[App.model.get()!.id].reset(JSON.parse(data))
      } catch (e) {}
    }
    renderer = Generator
    if (App.model.get()) {
      title = locale('title.generator', [locale(App.model.get()!.id)])
    }
  }

  document.title = locale('title.suffix', [title])
  App.mobilePanel.set(panel)
  const view = new View()
  view.mount(target, renderer(view), true);
  window.app = App.model;

  electron();
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", async () => {
  document.body.addEventListener("click", async e => {
    if (e.target instanceof Element
      && e.target.hasAttribute('href')
    ) {
      e.preventDefault();
      const target = e.target.getAttribute('href')!

      const url = new URL(window.location.toString());
      url.hash = target;
      history.pushState(null, '', url.toString());
      await router();
    }
  });

  window.location.hash = '/';

  await router();
});
