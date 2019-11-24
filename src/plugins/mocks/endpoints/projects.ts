import Axios, { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import db from '../db'
import Project from '@/models/project'

const mock = new MockAdapter(Axios)
const projects = db.getCollection('projects')

function getProjectId (config: AxiosRequestConfig): number {
  const urlParts: Array<string> = config.url!.split('/')
  return parseInt(urlParts[urlParts.length - 1])
}

mock.onGet(/\/projects\/\d+/).reply((config: AxiosRequestConfig) => {
  const project: Resultset<Project> = projects.findOne({ 'id': getProjectId(config) })
  if (!project) {
    return [404]
  }
  return [200, project]
})

mock.onGet('/projects').reply(() => {
  return [200, projects.find()]
})

mock.onPost('/projects').reply((config: AxiosRequestConfig) => {
  try {
    const projectName = JSON.parse(config.data).name.trim()
    const newProject = new Project({ id: projects.count() + 1, name: projectName })
    projects.insert(newProject)
    db.saveDatabase()
    return [201, newProject]
  } catch {
    return [400, 'Could not read body']
  }
})

mock.onDelete(/\/projects\/\d+/).reply((config: AxiosRequestConfig) => {
  const project: Resultset<Project> = projects.findOne({ 'id': getProjectId(config) })
  if (!project) {
    return [404]
  }
  projects.remove(project)
  db.saveDatabase()
  return [200, project]
})
