import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router'
import setupConfiguration from '@/router/configuration'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

setupConfiguration(router)

export default router
