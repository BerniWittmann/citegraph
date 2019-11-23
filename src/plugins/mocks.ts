import Axios, { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import faker from 'faker'
import Project from '@/models/project'

const mock = new MockAdapter(Axios)

const amountProjects: number = faker.random.number(10)
const projects: Array<Project> = []
for (let i = 1; i <= amountProjects; i++) {
  projects.push(new Project({ id: i, name: faker.random.words() }))
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

mock.onPost('/projects').reply((config: AxiosRequestConfig) => {
  try {
    const projectName = JSON.parse(config.data).name.trim()
    const newProject = new Project({ id: projects.length + 1, name: projectName })
    projects.push(newProject)
    return [201, newProject]
  } catch {
    return [400, 'Could not read body']
  }
})
