import { Route, VueRouter } from 'vue-router/types/router'
import { Next } from 'vue-router'

import store from '@/plugins/store'
import { isProjectRoute } from '@/common/helpers'

export default function setupNavigationGuards (router: VueRouter): void {
  router.beforeEach(async (to: Route, from: Route, next: Next) => {
    if (isProjectRoute(to)) {
      await loadProject(to)
    }
    return next()
  })
  router.afterEach(async (to: Route) => {
    if (!isProjectRoute(to)) {
      await unloadProject()
    }
  })
}

async function loadProject (route: Route): Promise<undefined> {
  return store.dispatch('projects/fetchProject', route.params.projectId)
}

async function unloadProject (): Promise<undefined> {
  return store.dispatch('projects/unsetActiveProject')
}
