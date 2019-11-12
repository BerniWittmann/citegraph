import { Route, RouteRecord, VueRouter } from 'vue-router/types/router'
import { Next } from 'vue-router'

import store from '@/plugins/store'

export default function setupNavigationGuards (router: VueRouter): void {
  router.beforeEach(async (to: Route, from: Route, next: Next) => {
    if (to.matched.find((current: RouteRecord) => current.name === 'projects.single')) {
      await loadProject(to)
    } else {
      await unloadProject()
    }
    return next()
  })
}

async function loadProject (route: Route): Promise<undefined> {
  return store.dispatch('projects/fetchProject', route.params.projectId)
}

async function unloadProject (): Promise<undefined> {
  return store.dispatch('projects/unsetProject')
}
