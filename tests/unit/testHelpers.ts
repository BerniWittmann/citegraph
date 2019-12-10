import routes from '@/router'
import { RouteConfig } from 'vue-router'

export function getRouteConfigByName (name: string) : RouteConfig | undefined {
  return getRouteConfigByKeyRec('name', name, routes)
}

export function getRouteConfigByPath (path: string) : RouteConfig | undefined {
  return getRouteConfigByKeyRec('path', path, routes)
}

function getRouteConfigByKeyRec (key: string, name: string, currentRoutes: Array<RouteConfig>): RouteConfig | undefined {
  return currentRoutes.reduce((acc: RouteConfig | undefined, currentRoute: RouteConfig) => {
    if (acc) return acc
    // @ts-ignore
    if (currentRoute[key] && currentRoute[key] === name) return currentRoute
    if (currentRoute.children) {
      acc = getRouteConfigByKeyRec(key, name, currentRoute.children)
    }
    return acc
  }, undefined)
}
