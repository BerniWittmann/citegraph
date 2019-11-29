import db from '../db'
import MockAdapter from 'axios-mock-adapter'
import { RecordFields } from '@/models/paperEntities/record'
import { setupMocks as setupGraphQLMocks } from './graphql-helpers/endpoint'
import { QueryConfiguration } from './graphql-helpers/queries'
import { AuthorFields } from '@/models/paperEntities/author'

const records = db.getCollection('records')
const authors = db.getCollection('authors')

const queryResponseConfiguration: Record<string, QueryConfiguration> = {
  'Records': {
    schemaName: 'record',
    queryName: 'Records',
    collection: records,
    filterFunction: recordsFilter
  },
  'Authors': {
    schemaName: 'author',
    queryName: 'Authors',
    collection: authors,
    filterFunction: authorsFilter
  }
}

function recordsFilter (obj: RecordFields, filter: string) {
  return obj.title.toLowerCase().includes(filter) ||
    obj.year.toString().includes(filter) ||
    obj.keywords.map(keyword => keyword.toLowerCase()).includes(filter) ||
    obj.authors.map(author => (author.firstName + ' ' + author.lastName).toLowerCase()).includes(filter)
}

function authorsFilter (obj: AuthorFields, filter: string) {
  return obj.firstName.toLowerCase().includes(filter) ||
    obj.lastName.toLowerCase().includes(filter)
}

export function setupMocks (mock: MockAdapter) {
  setupGraphQLMocks(mock, queryResponseConfiguration)
}
