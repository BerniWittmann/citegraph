import Axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import db, { clearDB } from '../db'
import insertSampleData from '../sampleData'

const mock = new MockAdapter(Axios)

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
