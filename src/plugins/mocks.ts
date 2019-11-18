import Axios, { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Project from '@/models/project'

const mock = new MockAdapter(Axios)

const amountProjects: number = Math.random() * (10 - 1) + 1
const projects: Array<Project> = []
for (let i = 1; i <= amountProjects; i++) {
  projects.push(new Project({ id: i, name: `Project #${i}` }))
}

mock.onGet(/\/projects\/\d+/).reply((config: AxiosRequestConfig) => {
  const urlParts: Array<string> = config.url!.split('/')
  const id: number = parseInt(urlParts[urlParts.length - 1])
  const project: Project | undefined = projects.find((current) => current.id === id)
  if (!project) {
    return [404]
  }
  return [200, project]
})

mock.onGet('/projects').reply(() => {
  return [200, projects]
})
