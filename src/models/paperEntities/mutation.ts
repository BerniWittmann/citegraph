import { PaperEntityFields } from '@/models/paperEntities/base'

export interface PaperEntityMutationParameters {
  id: string
  projectId: number
  entityType: string
}

export type PaperEntityMutationResponse = PaperEntityFields

function createMutationParams (params: PaperEntityMutationParameters): string {
  return `(id: ${params.id})`
}

function createData (fields: Array<string>, data: Partial<PaperEntityFields>): string {
  const updates = []
  for (let field of fields) {
    if (data.hasOwnProperty(field)) {
      // @ts-ignore
      updates.push(`${field}: "${data[field]}"`)
    }
  }
  return updates.join(', \n')
}

export function constructMutation (queryName: string, schemaName: string, params: PaperEntityMutationParameters, fields: Array<string>, data: Partial<PaperEntityFields>): string {
  return `{
      ${queryName}${createMutationParams(params)} {
        ${schemaName} {
          ${createData(fields, data)}
        }
      }
    }`
}
