import { STATE } from "../app";
import { View } from "../views/View";
import { Octicon } from "./Octicon";
import { Toggle } from "./Toggle";

export const Header = (view: View, title: string) => `
  <header>
    <div class="header-title">
      <a data-link href="/" class="home-link">${Octicon['three_bars']}</a>
      <h2>${title}</h2>
    </div>
    <nav>
      <ul>
        <li>${Octicon['globe']}</li>
        <li>${Toggle(view, [['dark', 'sun'], ['light', 'moon']], STATE.theme)}</li>
        <li class="dimmed">
          <a href="https://github.com/misode/misode.github.io" target="_blank">
            ${Octicon['mark_github']}
          </a>
        </li>
      </ul>
    </nav>
  </header>
`
