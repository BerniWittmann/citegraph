import { PaperEntity, PaperEntityFields } from '@/models/paperEntities'

type QueryArguments = {
  first?: string
  skip?: string
  filter?: string
}

type FilterFunction = (obj: PaperEntityFields, filter: string) => boolean

export type QueryConfiguration = {
  schemaName: string,
  queryName: string,
  collection: Collection<PaperEntity>,
  filterFunction?: FilterFunction
}

function parseQuery (query: string): QueryArguments {
  const firstString = query.match(/first: \d+/)
  const first = firstString ? firstString.toString().substring(7) : undefined
  const skipString = query.match(/skip: \d+/)
  const skip = skipString ? skipString.toString().substring(6) : undefined
  const filterString = query.match(/filter: [a-zA-Z0-9]+/)
  const filter = filterString ? filterString.toString().substring(8) : undefined
  return {
    first,
    skip,
    filter
  }
}

export function createResponse (query: string, configuration: QueryConfiguration) {
  const queryParams = parseQuery(query)
  let chain = configuration.collection.chain().find()
  if (queryParams.filter && configuration.filterFunction) {
    const filterLc = queryParams.filter.toLowerCase()
    chain.where((obj: PaperEntity) => {
      return configuration.filterFunction!(obj as PaperEntityFields, filterLc)
    })
  }
  const count = chain.count()
  if (queryParams.skip) {
    chain = chain.offset(parseInt(queryParams.skip))
  }
  if (queryParams.first) {
    chain = chain.limit(parseInt(queryParams.first))
  }
  return [200, {
    data: {
      [configuration.queryName]: {
        count: count,
        [configuration.schemaName]: chain.data()
      }
    }
  }]
}
