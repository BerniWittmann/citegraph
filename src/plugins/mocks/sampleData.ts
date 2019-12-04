import faker from 'faker'
import Project from '@/models/project'
import Author from '@/models/paperEntities/author'
import Record from '@/models/paperEntities/record'
import Country from '@/models/paperEntities/country'

function randomNumberFromInterval (min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function insertSampleData (db: Loki): void {
  insertSampleProjectsData(db)
  insertSampleAuthorsData(db)
  insertSampleRecordsData(db)
  insertSampleCountriesData(db)
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
      }, {
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

export function insertSampleCountriesData (db: Loki): void {
  const countries = db.getCollection('countries')
  const countriesData = [new Country({
    id: '1',
    name: 'United States of America',
    flagUrl: 'https://restcountries.eu/data/usa.svg',
    countRecords: randomNumberFromInterval(0, 100)
  }), new Country({
    id: '2',
    name: 'Germany',
    flagUrl: 'https://restcountries.eu/data/deu.svg',
    countRecords: randomNumberFromInterval(0, 100)
  }), new Country({
    id: '3',
    name: 'France',
    flagUrl: 'https://restcountries.eu/data/fra.svg',
    countRecords: randomNumberFromInterval(0, 100)
  }), new Country({
    id: '4',
    name: 'Canada',
    flagUrl: 'https://restcountries.eu/data/can.svg',
    countRecords: randomNumberFromInterval(0, 100)
  }), new Country({
    id: '5',
    name: 'China',
    flagUrl: 'https://restcountries.eu/data/chn.svg',
    countRecords: randomNumberFromInterval(0, 100)
  }), new Country({
    id: '6',
    name: 'Norway',
    flagUrl: 'https://restcountries.eu/data/nor.svg',
    countRecords: randomNumberFromInterval(0, 100)
  }), new Country({
    id: '7',
    name: 'Bavaria',
    countRecords: randomNumberFromInterval(0, 10)
  })]
  countriesData.forEach((country) => {
    countries.insert(country)
  })
}
