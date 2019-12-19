import { Route, Next, RouteConfig } from 'vue-router'
import store from '@/plugins/store'

import ProjectWrapperPage from '@/pages/project/general/ProjectWrapper.vue'
import AddProjectPage from '@/pages/projects/AddProject.vue'
import HomePage from '@/pages/Home.vue'
import AboutPage from '@/pages/About.vue'
import ProjectPage from '@/pages/project/general/Project.vue'
import ProjectsPage from '@/pages/projects/Projects.vue'
import SettingsPage from '@/pages/Settings.vue'
import EditProjectPage from '@/pages/project/general/EditProject.vue'
import EmptyRouterView from '@/router/EmptyRouterView.vue'
import ImportPage from '@/pages/project/import/Import.vue'
import ExplorePage from '@/pages/project/explore/Explore.vue'
import ExploreWrapperPage from '@/pages/project/explore/ExploreWrapper.vue'
import ExploreSinglePage from '@/pages/project/explore/ExploreSingle.vue'
import ExploreSingleWrapperPage from '@/pages/project/explore/ExploreSingleWrapper.vue'
import VisualizationsPage from '@/pages/visualizations/Visualizations.vue'
import EditVisualizationPage from '@/pages/visualizations/visualization/EditVisualization.vue'
import ViewVisualizationPage from '@/pages/visualizations/visualization/ViewVisualization.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsPage,
    beforeEnter: (to: Route, from: Route, next: Next) => {
      store.dispatch('projects/fetchProjects').then(next)
    }
  },
  {
    path: '/projects/add',
    name: 'projects.add',
    component: AddProjectPage
  },
  {
    path: '/projects/:projectId',
    meta: {
      isSingleProjectPage: true
    },
    component: ProjectWrapperPage,
    children: [{
      path: '',
      component: EmptyRouterView,
      children: [{
        path: '',
        name: 'projects.single',
        component: ProjectPage
      }, {
        path: 'import',
        name: 'projects.single.import',
        component: ImportPage
      }, {
        path: 'explore/:queryByType',
        component: ExploreWrapperPage,
        meta: {
          isExplorePage: true
        },
        children: [{
          path: '',
          name: 'projects.single.explore',
          component: ExplorePage
        }, {
          path: ':entityId',
          component: ExploreSingleWrapperPage,
          children: [{
            path: '',
            name: 'projects.single.explore.view',
            component: ExploreSinglePage
          }]
        }]
      }, {
        path: 'visualizations',
        component: EmptyRouterView,
        beforeEnter: (to: Route, from: Route, next: Next) => {
          store.dispatch('visualizations/fetchVisualizations', to.params.projectId).then(next)
        },
        children: [{
          path: '',
          name: 'projects.single.visualizations',
          component: VisualizationsPage
        }, {
          path: 'add',
          name: 'project.single.visualizations.add',
          component: EditVisualizationPage
        }, {
          path: ':visualizationId',
          component: EmptyRouterView,
          meta: {
            isVisualizationPage: true
          },
          children: [{
            path: 'edit',
            name: 'project.single.visualization.edit',
            component: EditVisualizationPage
          }, {
            path: '',
            name: 'project.single.visualization',
            component: ViewVisualizationPage
          }]
        }]
      }]
    }, {
      path: 'edit',
      name: 'projects.single.edit',
      component: EditProjectPage
    }]
  },
  {
    // Fallback Route
    path: '*',
    beforeEnter: async (to: Route, from: Route, next: Next) => {
      await store.dispatch('toasts/showError', 'route_not_found')
      next('/')
    }
  }
]

export default routes
