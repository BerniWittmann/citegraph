import { Route, Next, RouteConfig } from 'vue-router'
import store from '@/plugins/store'

import ProjectWrapperPage from '@/pages/project/ProjectWrapper.vue'
import AddProjectPage from '@/pages/projects/AddProject.vue'
import HomePage from '@/pages/Home.vue'
import AboutPage from '@/pages/About.vue'
import ProjectPage from '@/pages/project/Project.vue'
import ProjectsPage from '@/pages/projects/Projects.vue'
import SettingsPage from '@/pages/Settings.vue'
import EditProjectPage from '@/pages/project/EditProject.vue'
import EmptyRouterView from '@/router/EmptyRouterView.vue'
import ImportPage from '@/pages/project/Import.vue'

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
      }]
    }, {
      path: 'edit',
      name: 'projects.single.edit',
      component: EditProjectPage
    }]
  }
]

export default routes
