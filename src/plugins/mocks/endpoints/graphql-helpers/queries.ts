import { PaperEntity, PaperEntityFields } from '@/models/paperEntities'

type QueryArguments = {
  first?: string
  skip?: string
  filter?: string
  orderBy?: string
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
  const orderByString = query.match(/orderBy: [a-zA-Z0-9]+_((ASC)|(DESC))/)
  const orderBy = orderByString ? orderByString[0].toString().substring(9) : undefined
  return {
    first,
    skip,
    filter,
    orderBy
  }
}

export function createResponse (query: string, configuration: QueryConfiguration) {
  const queryParams = parseQuery(query)
  let chain = configuration.collection.chain().find()
  if (queryParams.filter && configuration.filterFunction) {
    const filterLc = queryParams.filter.toLowerCase()
    chain = chain.where((obj: PaperEntity) => {
      return configuration.filterFunction!(obj as PaperEntityFields, filterLc)
    })
  }
  if (queryParams.orderBy) {
    const orderByParts = queryParams.orderBy.split('_')
    const prop = orderByParts[0]
    const isDescending = orderByParts[1] === 'DESC'
    // @ts-ignore
    chain = chain.simplesort(prop, isDescending)
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
