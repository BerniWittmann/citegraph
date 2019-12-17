import { Route, VueRouter } from 'vue-router/types/router'
import { Next } from 'vue-router'

import store from '@/plugins/store'
import { isProjectRoute, isVisualizationRoute } from '@/common/helpers'

export default function setupConfiguration (router: VueRouter): void {
  router.onError(async (error: Error) => {
    await store.dispatch('toasts/showError', error.message)
  })
  router.beforeEach(async (to: Route, from: Route, next: Next) => {
    if (isProjectRoute(to)) {
      await loadProject(to)
    }
    if (isVisualizationRoute(to)) {
      await loadVisualization(to)
    }
    return next()
  })
  router.afterEach(async (to: Route) => {
    if (!isProjectRoute(to)) {
      await unloadProject()
    }
    if (!isVisualizationRoute(to)) {
      await unloadVisualization()
    }
  })
}

async function loadProject (route: Route): Promise<undefined> {
  return store.dispatch('projects/fetchProject', route.params.projectId)
}

async function unloadProject (): Promise<undefined> {
  return store.dispatch('projects/unsetActiveProject')
}

async function loadVisualization (route: Route): Promise<void> {
  return store.dispatch('visualizations/fetchVisualization', {
    projectId: route.params.projectId,
    visualizationId: route.params.visualizationId
  })
}

async function unloadVisualization (): Promise<void> {
  return store.dispatch('visualizations/unsetCurrentVisualization')
}
