import { PaperEntityFields } from '@/models/paperEntities/base'

export interface PaperEntityQueryParameters {
  projectId: number
  entityType: string
  perPage?: number
  pageOffset?: number
  filter?: string
}

export type PaperEntityQueryResponse = PaperEntityFields

export function createFilterAndPaginationForQuery (perPage?: number, pageOffset?: number, filter?: string): string {
  if (!perPage && !pageOffset && !filter) return ''
  const args = [
    filter ? `filter: ${filter}` : ''
  ]
  if (perPage !== undefined && pageOffset !== undefined) {
    args.push(`first: ${perPage}`)
    if (pageOffset > 0) {
      args.push(`skip: ${pageOffset * perPage}`)
    }
  }
  return '(' + args.filter((arg) => arg.length > 0).join(' ') + ')'
}
