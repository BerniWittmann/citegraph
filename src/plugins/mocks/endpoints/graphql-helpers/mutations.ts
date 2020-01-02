import { PaperEntityFields } from '@/models/paperEntities'
import { QueryConfiguration } from '@/plugins/mocks/endpoints/graphql-helpers/queries'
import db from '../../db'

type MutationArguments = {
  id?: string
}

function parseQuery (query: string): MutationArguments {
  const idString = query.match(/id: [a-zA-Z0-9]+/)
  const id = idString ? idString[0].toString().substring(4) : undefined
  return {
    id
  }
}

function parseData (query: string): Partial<PaperEntityFields> {
  // extract update data
  const result: Record<string, any> = {}
  const items = query.match(/\w+: ".*"/g) || []
  items.forEach((item: string) => {
    const key = item.split(': ')[0]
    const val = item.split(': ')[1]
    result[key] = val.substring(1, val.length - 1).replace(/\/"/g, '')
  })
  return result
}

function updateOne (queryParams: MutationArguments, data: Partial<PaperEntityFields>, configuration: QueryConfiguration) {
  let entity = configuration.collection.findOne({ id: queryParams.id })
  if (!entity) {
    throw new Error('Entity not found')
  }
  for (let key in data) {
    // @ts-ignore
    entity[key] = data[key]
  }
  return configuration.collection.update(entity)
}

export function createMutationResponse (query: string, configuration: QueryConfiguration) {
  const queryParams = parseQuery(query)
  if (!queryParams.id) {
    return [400, 'No id given']
  }
  try {
    const response = updateOne(queryParams, parseData(query), configuration)
    db.saveDatabase()
    return [200, {
      data: {
        [configuration.queryName]: {
          ...response
        }
      }
    }]
  } catch (err) {
    return [404, err]
  }
}
