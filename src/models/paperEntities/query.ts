import { PaperEntityFields } from '@/models/paperEntities/base'

export interface PaperEntityQueryParameters {
  projectId: number
  entityType: string
  perPage?: number
  pageOffset?: number
  filter?: string
  sortBy?: string,
  id?: string
}

export type PaperEntityQueryResponse = PaperEntityFields

function createQueryParams (params: PaperEntityQueryParameters): string {
  if (!params.id && !params.perPage && !params.pageOffset && !params.filter && !params.sortBy) return ''
  if (params.id) {
    return `(id: ${params.id})`
  }
  const args = [
    params.filter ? `filter: ${params.filter}` : '',
    params.sortBy ? `orderBy: ${params.sortBy}` : ''
  ]
  if (params.perPage !== undefined && params.pageOffset !== undefined) {
    args.push(`first: ${params.perPage}`)
    if (params.pageOffset > 0) {
      args.push(`skip: ${params.pageOffset * params.perPage}`)
    }
  }
  return '(' + args.filter((arg) => arg.length > 0).join(' ') + ')'
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
