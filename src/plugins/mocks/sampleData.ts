import faker from 'faker'
import Project from '@/models/project'
import Author from '@/models/paperEntities/author'
import Record from '@/models/paperEntities/record'

function randomNumberFromInterval (min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function insertSampleData (db: Loki): void {
  insertSampleProjectsData(db)
  insertSampleAuthorsData(db)
  insertSampleRecordsData(db)
}

export function insertSampleProjectsData (db: Loki): void {
  const amountProjects: number = faker.random.number(5)
  const projects = db.getCollection('projects')
  for (let i = 1; i <= amountProjects; i++) {
    projects.insert(new Project({ id: i, name: faker.random.words() }))
  }
}

export function insertSampleAuthorsData (db: Loki): void {
  const amountAuthors: number = randomNumberFromInterval(10, 50)
  const authors = db.getCollection('authors')
  for (let i = 1; i <= amountAuthors; i++) {
    authors.insert(new Author({
      id: i.toString(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      countRecords: randomNumberFromInterval(0, 100)
    }))
  }
}

export function insertSampleRecordsData (db: Loki): void {
  const amountRecords: number = randomNumberFromInterval(20, 60)
  const records = db.getCollection('records')
  for (let i = 1; i <= amountRecords; i++) {
    records.insert(new Record({
      id: i.toString(),
      title: faker.company.catchPhrase(),
      year: randomNumberFromInterval(1980, 2019),
      keywords: faker.company.bs().split(' '),
      numberCitations: randomNumberFromInterval(0, 100),
      authors: [{
        id: randomNumberFromInterval(1, 10).toString(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        countRecords: randomNumberFromInterval(0, 100)
      }, {
        id: randomNumberFromInterval(1, 10).toString(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        countRecords: randomNumberFromInterval(0, 100)
      }]
    }))
  }
}
