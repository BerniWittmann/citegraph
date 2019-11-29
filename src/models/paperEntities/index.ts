import Author from './author'
import Conference from './conference'
import Country from './country'
import Institution from './institution'
import Publication from './publication'
import Publisher from './publisher'
import Record from './record'
import PaperEntity, { PaperEntityTableColumn, PaperEntityFields } from './base'

export const entities = [
  Record,
  Author,
  Institution,
  Country,
  Publication,
  Publisher,
  Conference
]

export const entityKeysMap = {
  [Record.key]: Record,
  [Author.key]: Author,
  [Institution.key]: Institution,
  [Country.key]: Country,
  [Publication.key]: Publication,
  [Publisher.key]: Publisher,
  [Conference.key]: Conference
}

export const entityKeys: Array<string> = entities.map((entity) => entity.key)

export type PaperEntityTableColumn = PaperEntityTableColumn

export type PaperEntity = PaperEntity

export type PaperEntityFields = PaperEntityFields

export default {
  Author,
  Conference,
  Country,
  Institution,
  Publication,
  Publisher,
  Record
}
