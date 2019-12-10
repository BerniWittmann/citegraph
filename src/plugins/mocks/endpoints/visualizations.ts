import { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import db from '../db'
import Project from '@/models/project'

const projects = db.getCollection('projects')
const visualizations = db.getCollection('visualizations')

function getProjectId (config: AxiosRequestConfig): number {
  const urlParts: Array<string> = config.url!.split('/')
  return parseInt(urlParts[4])
}

export function setupMocks (mock: MockAdapter) {
  mock.onGet(/\/projects\/\d+\/visualizations$/).reply((config: AxiosRequestConfig) => {
    const project: Resultset<Project> = projects.findOne({ 'id': getProjectId(config) })
    if (!project) {
      return [404]
    }
    return [200, visualizations.find()]
  })
}
