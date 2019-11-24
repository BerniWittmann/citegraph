import Loki from 'lokijs'
import { insertSampleProjectsData } from './sampleData'

const db = new Loki('mock.db', {
  env: 'BROWSER'
})

export function initializeDB (): void {
  db.loadDatabase()
  if (!db.getCollection('projects')) {
    db.addCollection('projects', {
      unique: ['id']
    })
    insertSampleProjectsData(db)
    db.saveDatabase()
  }
}

export async function clearDB (): Promise<undefined> {
  ['projects'].forEach(await clearCollection)
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
