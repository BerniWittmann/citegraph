import Axios, { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Project from '@/models/project'

const mock = new MockAdapter(Axios)

mock.onGet('/projects/404').reply(404)

mock.onGet(/\/projects\/\d+/).reply((config: AxiosRequestConfig) => {
  const urlParts: Array<string> = config.url!.split('/')
  const id: number = parseInt(urlParts[urlParts.length - 1])
  return [200, new Project({
    id: id,
    name: `Project #${id}`
  })]
})
