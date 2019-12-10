import MockAdapter from 'axios-mock-adapter'
import { AxiosRequestConfig } from 'axios'
import Project from '@/models/project'
import db from '@/plugins/mocks/db'
import { createResponse, QueryConfiguration } from '@/plugins/mocks/endpoints/graphql-helpers/queries'
const projects = db.getCollection('projects')

function getProjectId (config: AxiosRequestConfig): number {
  const urlParts: Array<string> = config.url!.split('/')
  return parseInt(urlParts[4])
}

export function setupMocks (mock: MockAdapter, queryResponseConfiguration: Record<string, QueryConfiguration>) {
  mock.onPost(/\/projects\/\d+\/paper-entities$/).reply((config: AxiosRequestConfig) => {
    const project: Resultset<Project> = projects.findOne({ 'id': getProjectId(config) })
    if (!project) {
      return [404]
    }
    let query
    try {
      query = JSON.parse(config.data).query
    } catch {
      return [400, 'Could not read body']
    }

    for (const schemaName of Object.keys(queryResponseConfiguration)) {
      const regex = new RegExp('{\\n\\s*(' + schemaName + ')(\\(.*\\))?\\s{')
      if (!regex.test(query)) continue
      const queryConfiguration = queryResponseConfiguration[schemaName]
      return createResponse(query, queryConfiguration)
    }
    return [400, 'Could not process query']
  })
}
