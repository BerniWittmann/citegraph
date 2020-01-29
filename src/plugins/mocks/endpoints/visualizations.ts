import { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import db from '../db'
import Project from '@/models/project'
import Visualization from '@/models/visualizations/Visualization'
import { visualizationsKeyMap } from '@/models/visualizations'

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

function getVisualizationClass (visualization: Visualization): typeof Visualization | undefined {
  if (!visualization || !visualization.key) return undefined
  return visualizationsKeyMap[visualization.key]
}

export function setupMocks (mock: MockAdapter) {
  mock.onGet(/\/projects\/\d+\/visualizations$/).reply((config: AxiosRequestConfig) => {
    const project: Resultset<Project> = projects.findOne({ 'id': getProjectId(config) })
    if (!project) {
      return [404]
    }
    const vis = visualizations.find().map(v => {
      const c = getVisualizationClass(v)
      if (!c) return undefined
      return c!.transformer.send(v)
    })
    return [200, vis]
  })

  mock.onGet(/\/projects\/\d+\/visualizations\/\d+$/).reply((config: AxiosRequestConfig) => {
    const project: Resultset<Project> = projects.findOne({ 'id': getProjectId(config) })
    if (!project) {
      return [404]
    }
    const visualization: Resultset<Visualization> = visualizations.findOne({ 'id': getVisualizationId(config) })

    const c = getVisualizationClass(visualization as any)
    const data = c ? c.transformer.send(visualization) : undefined
    if (!data) {
      return [404]
    }
    return [200, data]
  })

  mock.onPost(/\/projects\/\d+\/visualizations$/).reply((config: AxiosRequestConfig) => {
    const project: Resultset<Project> = projects.findOne({ 'id': getProjectId(config) })
    if (!project) {
      return [404]
    }
    try {
      const data = JSON.parse(config.data)
      if (!data || !data.key) throw new Error()
      const VisualizationClass = visualizationsKeyMap[data.key]
      if (!VisualizationClass) throw new Error()
      data.id = (visualizations.count() + 1).toString()
      const visualization: Visualization = VisualizationClass.transformer.fetch(data)
      visualization.progress = 0.1
      visualization.data = undefined
      visualizations.insert(visualization)
      db.saveDatabase()
      return [200, VisualizationClass.transformer.send(visualization)]
    } catch {
      return [400, 'Could not read body']
    }
  })

  mock.onPut(/\/projects\/\d+\/visualizations\/\d+$/).reply((config: AxiosRequestConfig) => {
    const project: Resultset<Project> = projects.findOne({ 'id': getProjectId(config) })
    if (!project) {
      return [404]
    }
    let visualization: Resultset<Visualization> = visualizations.findOne({ 'id': getVisualizationId(config) })
    if (!visualization) {
      return [404]
    }
    try {
      let data = JSON.parse(config.data)
      if (!data || !data.key) throw new Error()
      const VisualizationClass = visualizationsKeyMap[data.key]
      if (!VisualizationClass) throw new Error()
      data = VisualizationClass.transformer.fetch(data)
      const updateData = {
        ...visualization,
        ...{
          ...data,
          data: undefined,
          progress: 0.1
        }
      }
      visualization = visualizations.update(updateData)
      db.saveDatabase()
      return [200, VisualizationClass.transformer.send(visualization)]
    } catch {
      return [400, 'Could not read body']
    }
  })
}
