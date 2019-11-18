import routes from '@/router'
import { RouteConfig } from 'vue-router'

export function getRouteConfigByName (name: string) : RouteConfig | undefined {
  return getRouteConfigByNameRec(name, routes)
}

function getRouteConfigByNameRec (name: string, currentRoutes: Array<RouteConfig>): RouteConfig | undefined {
  return currentRoutes.find(currentRoute => {
    if (currentRoute.name === name) return currentRoute
    if (currentRoute.children) {
      return getRouteConfigByNameRec(name, currentRoute.children)
    }
    return undefined
  })
}
