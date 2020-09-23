import { Home } from './views/Home'
import { Generator } from './views/Generator'
import { View } from './views/View';
import { State } from './state/State';

export const STATE = new State()

const pathToRegex = (path: string) => {
  return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")
}

const getParams = (match: MatchedRoute) => {
  const values = match.result!.slice(1);
  const keys = match.path.match(/:\w+/g)?.map(m => m.slice(1)) ?? [];
  return keys.reduce((acc, key, index) => ({...acc, [key]: values[index]}), {})
};

const navigateTo = (url: string) => {
  history.pushState(null, '', url);
  router();
};

type Route = {
  path: string,
  view: typeof View
}
type MatchedRoute = Route & {
  result: RegExpMatchArray | null
}

const router = async () => {
  const routes: Route[] = [
    { path: '/', view: Home },
    { path: '/:schema', view: Generator }
  ]

  let match: MatchedRoute | undefined = routes
    .map(route => ({
      ...route,
      result: location.pathname.match(pathToRegex(route.path))
    }))
    .find(route => route.result !== null)

  console.log("Match:", match)

  if (!match) {
    match = {
      ...routes[0],
      result: [location.pathname]
    }
  }

  STATE.setParams(getParams(match))
  STATE.setView(new match.view())
  STATE.invalidate()
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target instanceof Element
      && e.target.hasAttribute('data-link')
      && e.target.hasAttribute('href')
    ) {
      e.preventDefault();
      navigateTo((e.target as HTMLAnchorElement).href);
    }
  });
  router();
});
