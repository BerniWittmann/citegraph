import { PaperEntityFields } from '@/models/paperEntities/base'

export interface PaperEntityQueryParameters {
  projectId: number
  entityType: string
  perPage?: number
  pageOffset?: number
  filter?: string
  filterBy?: string
  sortBy?: string
  id?: string
  belongsTo?: string
  belongsToType?: string
}

export type PaperEntityQueryResponse = PaperEntityFields

function createQueryParams (params: PaperEntityQueryParameters): string {
  const keys = Object.keys(params).filter((key) => key !== 'entityType' && key !== 'projectId')
  if (keys.length === 0) return ''
  if (params.id) {
    return `(id: ${params.id})`
  }
  const args = [
    params.filter ? `filter: ${params.filter}` : '',
    params.sortBy ? `orderBy: ${params.sortBy}` : ''
  ]
  if (params.filter !== undefined && params.filterBy !== undefined) {
    args.push(`filterBy: ${params.filterBy}`)
  }
  if (params.belongsTo !== undefined && params.belongsToType !== undefined) {
    args.push(`belongsTo: ${params.belongsTo}`)
    args.push(`belongsToType: ${params.belongsToType}`)
  }
  if (params.perPage !== undefined && params.pageOffset !== undefined) {
    args.push(`first: ${params.perPage}`)
    if (params.pageOffset > 0) {
      args.push(`skip: ${params.pageOffset * params.perPage}`)
    }
  }
  return '(' + args.filter((arg) => arg.length > 0).join('; ') + ')'
}

export function constructQuery (queryName: string, schemaName: string, params: PaperEntityQueryParameters, fields: string): string {
  return `{
      ${queryName}${createQueryParams(params)} {
        count
        ${schemaName} {
          ${fields}
        }
      }
    }`
}
