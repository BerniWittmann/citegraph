import faker from 'faker'
import Project, { ProjectStates } from '@/models/project'
import Author from '@/models/paperEntities/author'
import Record from '@/models/paperEntities/record'
import Country from '@/models/paperEntities/country'
import WordCloudVisualization, { WordCloudDataPoint } from '@/models/visualizations/WordCloudVisualization'
import BarChartVisualization from '@/models/visualizations/BarChartVisualization'
import NetworkVisualization from '@/models/visualizations/NetworkVisualization'

function getRandomFromArray (arr: Array<any>): any {
  if (!arr || arr.length === 0) return undefined
  return arr[randomNumberFromInterval(0, arr.length - 1)]
}

function randomNumberFromInterval (min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function insertSampleData (db: Loki): void {
  insertSampleProjectsData(db)
  insertSampleAuthorsData(db)
  insertSampleRecordsData(db)
  insertSampleCountriesData(db)
  insertSampleVisualizationsData(db)
}

export function insertSampleProjectsData (db: Loki): void {
  const amountProjects: number = faker.random.number(5)
  const projects = db.getCollection('projects')
  for (let i = 1; i <= amountProjects; i++) {
    projects.insert(new Project({
      id: i,
      name: faker.random.words(),
      state: getRandomFromArray([ProjectStates.IMPORT, ProjectStates.EXPLORE, ProjectStates.VISUALIZE]),
      counts: {
        records: faker.random.number(),
        authors: faker.random.number(100),
        institutions: faker.random.number(70),
        countries: faker.random.number(40),
        publications: faker.random.number(100),
        publishers: faker.random.number(100),
        conferences: faker.random.number(100),
        keywords: faker.random.number(),
        visualizations: faker.random.number(10)
      },
      topAuthors: [...Array(10).keys()].map((id) => {
        return new Author({
          id: (id + 1).toString(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          countRecords: randomNumberFromInterval(0, 100)
        })
      }),
      topRecords: [...Array(10).keys()].map((id) => {
        return new Record({
          id: (id + 1).toString(),
          title: faker.company.catchPhrase(),
          year: randomNumberFromInterval(1980, 2019),
          keywords: faker.company.bs().split(' '),
          numberCitations: randomNumberFromInterval(0, 100),
          authors: [...Array(randomNumberFromInterval(1, 6)).keys()].map(() => ({
            id: randomNumberFromInterval(1, 10).toString(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            countRecords: randomNumberFromInterval(0, 100)
          }))
        })
      }),
      topKeywords: [...Array(10).keys()].map(() => {
        return faker.company.bs().split(' ')[0]
      }),
      countryRelevanceData: [{
        country: new Country({
          id: '1',
          name: 'United States of America',
          flagUrl: 'https://restcountries.eu/data/usa.svg',
          countRecords: randomNumberFromInterval(0, 100)
        }),
        relevance: 0.4
      }, {
        country: new Country({
          id: '2',
          name: 'Germany',
          flagUrl: 'https://restcountries.eu/data/deu.svg',
          countRecords: randomNumberFromInterval(0, 100)
        }),
        relevance: 0.3
      }, {
        country: new Country({
          id: '3',
          name: 'France',
          flagUrl: 'https://restcountries.eu/data/fra.svg',
          countRecords: randomNumberFromInterval(0, 100)
        }),
        relevance: 0.1
      }, {
        country: new Country({
          id: '5',
          name: 'China',
          flagUrl: 'https://restcountries.eu/data/chn.svg',
          countRecords: randomNumberFromInterval(0, 100)
        }),
        relevance: 0.2
      }]
    }))
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
      authors: [...Array(randomNumberFromInterval(1, 6)).keys()].map(() => ({
        id: randomNumberFromInterval(1, 10).toString(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        countRecords: randomNumberFromInterval(0, 100)
      }))
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

function createWordData (): Array<WordCloudDataPoint> {
  const count = randomNumberFromInterval(50, 100)
  const arr: Array<WordCloudDataPoint> = []
  for (let i = 0; i < count; i++) {
    arr.push({
      word: faker.company.catchPhraseDescriptor(),
      weight: randomNumberFromInterval(10, 80)
    })
  }
  return arr
}

export function insertSampleVisualizationsData (db: Loki): void {
  const visualizations = db.getCollection('visualizations')
  visualizations.insert(new WordCloudVisualization({
    id: '1',
    name: 'My Word Cloud',
    progress: 1,
    data: {
      data: createWordData()
    }
  }))
  visualizations.insert(new BarChartVisualization({
    id: '2',
    name: 'My Bar Chart',
    progress: 0.8
  }))
  visualizations.insert(new NetworkVisualization({
    id: '3',
    name: 'Network Chart'
  }))
}
