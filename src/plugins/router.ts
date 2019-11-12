import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router'
import setupNavigationGuards from '@/router/navigationGuards'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

setupNavigationGuards(router)

export default router
