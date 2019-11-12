import HomePage from '@/pages/Home.vue'
import AboutPage from '@/pages/About.vue'
import ProjectPage from '@/pages/Project.vue'

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
    path: '/projects/:projectId',
    name: 'projects.single',
    component: ProjectPage
  }
]
