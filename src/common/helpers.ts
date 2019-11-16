import { Route, RouteRecord } from 'vue-router'

export function isProjectRoute (route: Route): boolean {
  return !!route.matched.find((current: RouteRecord) => current.name === 'projects.single')
}
