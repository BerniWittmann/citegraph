import Loki from 'lokijs'
import {
  insertSampleAuthorsData,
  insertSampleProjectsData,
  insertSampleRecordsData,
  insertSampleCountriesData
} from './sampleData'

const db = new Loki('mock.db', {
  env: 'BROWSER'
})

function checkAndAddCollection (name: string, sampleData: Function): void {
  if (!db.getCollection(name)) {
    db.addCollection(name, {
      unique: ['id']
    })
    sampleData(db)
    db.saveDatabase()
  }
}

export function initializeDB (): void {
  db.loadDatabase()
  checkAndAddCollection('projects', insertSampleProjectsData)
  checkAndAddCollection('authors', insertSampleAuthorsData)
  checkAndAddCollection('records', insertSampleRecordsData)
  checkAndAddCollection('countries', insertSampleCountriesData)
}

export async function clearDB (): Promise<undefined> {
  ['projects', 'authors', 'records', 'countries'].forEach(await clearCollection)
  db.saveDatabase()
  return undefined
}

async function clearCollection (name: string): Promise<undefined> {
  const collection = db.getCollection(name)
  if (collection) {
    await collection.clear()
  }
  return undefined
}

initializeDB()

export default db
