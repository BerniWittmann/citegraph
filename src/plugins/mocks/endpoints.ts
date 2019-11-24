import Axios, { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import db, { clearDB } from './db'
import Project from '@/models/project'
import insertSampleData from '@/plugins/mocks/sampleData'

const mock = new MockAdapter(Axios)
const projects = db.getCollection('projects')

mock.onGet(/\/projects\/\d+/).reply((config: AxiosRequestConfig) => {
  const urlParts: Array<string> = config.url!.split('/')
  const id: number = parseInt(urlParts[urlParts.length - 1])
  const project: Resultset<Project> = projects.findOne({ 'id': id })
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

mock.onPost('/database/clear').reply(async () => {
  try {
    await clearDB()
    return [200]
  } catch (err) {
    return [500, err]
  }
})

mock.onPost('/database/reseed').reply(async () => {
  try {
    await clearDB()
    insertSampleData(db)
    db.saveDatabase()
    return [200]
  } catch (err) {
    return [500, err]
  }
})
