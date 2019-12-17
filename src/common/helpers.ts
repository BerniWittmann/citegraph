import { Route, RouteRecord } from 'vue-router'

export function isProjectRoute (route: Route): boolean {
  return !!route.matched.find((current: RouteRecord) => current.meta.isSingleProjectPage)
}

export function isExploreRoute (route: Route): boolean {
  return !!route.matched.find((current: RouteRecord) => current.meta.isExplorePage)
}

export function isVisualizationRoute (route: Route): boolean {
  return !!route.matched.find((current: RouteRecord) => current.meta.isVisualizationPage)
}
