import { Route, Next } from 'vue-router'
import store from '@/plugins/store'

import AddProjectPage from '@/pages/AddProject.vue'
import HomePage from '@/pages/Home.vue'
import AboutPage from '@/pages/About.vue'
import ProjectPage from '@/pages/Project.vue'
import ProjectsPage from '@/pages/Projects.vue'

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
    name: 'projects.single',
    component: ProjectPage
  }
]
