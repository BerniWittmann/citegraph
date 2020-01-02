import MockAdapter from 'axios-mock-adapter'
import { AxiosRequestConfig } from 'axios'
import Project from '@/models/project'
import db from '@/plugins/mocks/db'
import { createResponse, QueryConfiguration } from '@/plugins/mocks/endpoints/graphql-helpers/queries'
import { createMutationResponse } from '@/plugins/mocks/endpoints/graphql-helpers/mutations'
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
    let data
    let isQuery = false
    let isMutation = false
    try {
      data = JSON.parse(config.data)
      isQuery = data.hasOwnProperty('query')
      isMutation = data.hasOwnProperty('mutation')
    } catch {
      return [400, 'Could not read body']
    }

    if (isQuery) {
      const query = data.query
      for (const schemaName of Object.keys(queryResponseConfiguration)) {
        const regex = new RegExp('{\\n\\s*(' + schemaName + ')(\\(.*\\))?\\s{')
        if (!regex.test(query)) continue
        const queryConfiguration = queryResponseConfiguration[schemaName]
        return createResponse(query, queryConfiguration)
      }
    } else if (isMutation) {
      const mutation = data.mutation
      for (const schemaName of Object.keys(queryResponseConfiguration)) {
        const regex = new RegExp('{\\n\\s*(' + schemaName + ')(\\(.*\\))?\\s{')
        if (!regex.test(mutation)) continue
        const queryConfiguration = queryResponseConfiguration[schemaName]
        return createMutationResponse(mutation, queryConfiguration)
      }
    }
    return [400, 'Could not process query']
  })
}
