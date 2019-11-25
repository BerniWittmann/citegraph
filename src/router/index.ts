import { Route, Next } from 'vue-router'
import store from '@/plugins/store'

import ProjectWrapperPage from '@/pages/ProjectWrapper.vue'
import AddProjectPage from '@/pages/AddProject.vue'
import HomePage from '@/pages/Home.vue'
import AboutPage from '@/pages/About.vue'
import ProjectPage from '@/pages/Project.vue'
import ProjectsPage from '@/pages/Projects.vue'
import SettingsPage from '@/pages/Settings.vue'
import EditProjectPage from '@/pages/EditProject.vue'

export default [
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
      name: 'projects.single',
      component: ProjectPage
    }, {
      path: 'edit',
      name: 'projects.single.edit',
      component: EditProjectPage
    }]
  }
]
