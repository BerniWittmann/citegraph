import { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import db from '../db'
import Project from '@/models/project'
import Visualization from '@/models/visualizations/Visualization'

const projects = db.getCollection('projects')
const visualizations = db.getCollection('visualizations')

function getProjectId (config: AxiosRequestConfig): number {
  const urlParts: Array<string> = config.url!.split('/')
  return parseInt(urlParts[4])
}

function getVisualizationId (config: AxiosRequestConfig): string {
  const urlParts: Array<string> = config.url!.split('/')
  return urlParts[6]
}

export function setupMocks (mock: MockAdapter) {
  mock.onGet(/\/projects\/\d+\/visualizations$/).reply((config: AxiosRequestConfig) => {
    const project: Resultset<Project> = projects.findOne({ 'id': getProjectId(config) })
    if (!project) {
      return [404]
    }
    return [200, visualizations.find()]
  })

  mock.onGet(/\/projects\/\d+\/visualizations\/\d+$/).reply((config: AxiosRequestConfig) => {
    const project: Resultset<Project> = projects.findOne({ 'id': getProjectId(config) })
    if (!project) {
      return [404]
    }
    const visualization: Resultset<Visualization> = visualizations.findOne({ 'id': getVisualizationId(config) })
    if (!visualization) {
      return [404]
    }
    return [200, visualization]
  })
}
