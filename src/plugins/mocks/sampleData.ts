import faker from 'faker'
import Project from '@/models/project'

export default function insertSampleData (db: Loki): void {
  insertSampleProjectsData(db)
}

export function insertSampleProjectsData (db: Loki): void {
  const amountProjects: number = faker.random.number(5)
  const projects = db.getCollection('projects')
  for (let i = 1; i <= amountProjects; i++) {
    projects.insert(new Project({ id: i, name: faker.random.words() }))
  }
}
