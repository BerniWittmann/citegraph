import MockAdapter from 'axios-mock-adapter'
import db, { clearDB } from '../db'
import insertSampleData from '../sampleData'

export function setupMocks (mock: MockAdapter): void {
  mock.onPost('/database/clear').reply(async () => {
    try {
      await clearDB()
      return [200]
    } catch (err) {
      return [500, err]
    }
  })

  mock.onPost('/database/reseed').reply(async () => {
    try {
      await clearDB()
      insertSampleData(db)
      db.saveDatabase()
      return [200]
    } catch (err) {
      return [500, err]
    }
  })
}
