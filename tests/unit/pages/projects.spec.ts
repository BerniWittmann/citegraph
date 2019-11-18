import { shallowMount } from '@vue/test-utils'
import { i18n } from '../setupPlugins'

import ProjectsPage from '@/pages/Projects.vue'
import Project from '@/models/project'

describe('pages/Projects.vue', () => {
  const projects = [
    new Project({ id: 1, name: 'First Project' }),
    new Project({ id: 2, name: 'Second Project' }),
    new Project({ id: 12, name: 'My awesome Project' }),
    new Project({ id: 42, name: 'Other Project' })
  ]
  const dispatch = jest.fn().mockReturnValue({
    then: (cb: Function) => cb()
  })
  const router = {
    push: jest.fn()
  }
  const getWrapper = (currentProjects: Array<Project>) => {
    return shallowMount(ProjectsPage, {
      i18n,
      mocks: {
        $store: {
          getters: {
            'projects/projects': currentProjects
          },
          dispatch
        },
        $router: router
      }
    })
  }
  it('renders the page', () => {
    const wrapper = getWrapper(projects)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the projects', () => {
    const wrapper = getWrapper(projects)
    const projectCards = wrapper.findAll('.project-card')
    expect(projectCards.length).toEqual(4)
  })
  it('a click on a project card navigates to the project', () => {
    const wrapper = getWrapper(projects)
    const projectCards = wrapper.findAll('.project-card')
    expect(projectCards.length).toEqual(4)
    const openButton = projectCards.at(2).find('v-btn-stub')
    expect(openButton.exists()).toBeTruthy()

    // @ts-ignore
    wrapper.vm.openProject(projects[2])

    expect(dispatch).toHaveBeenCalledWith('projects/openProject', projects[2])
    expect(router.push).toHaveBeenCalledWith({ name: 'projects.single', params: { projectId: '12' } })
  })
  it('can handle if no projects are available', () => {
    const wrapper = getWrapper([])
    expect(wrapper.html()).toMatchSnapshot()
    const projectCards = wrapper.findAll('.project-card')
    expect(projectCards.length).toEqual(0)
  })
  it('renders a button to add projects', () => {
    const wrapper = getWrapper(projects)
    const addButton = wrapper.find('.add-card')
    expect(addButton.exists()).toBeTruthy()
    expect(addButton.props('to')).toEqual({ name: 'projects.add' })
  })
})