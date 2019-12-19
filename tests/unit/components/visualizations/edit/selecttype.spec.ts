import { shallowMount } from '@vue/test-utils'
import { i18n } from '../../../setupPlugins'

import VisualizationEditSelectTypeComponent from '@/components/visualizations/edit/SelectType.vue'
import { visualizations } from '@/models/visualizations'

jest.useFakeTimers()

describe('components/visualizations/edit/SelectType.vue', () => {
  const router = {
    back: jest.fn()
  }
  const getWrapper = () => {
    return shallowMount(VisualizationEditSelectTypeComponent, {
      i18n,
      mocks: {
        $router: router
      }
    })
  }

  it('renders', () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has a back Button', () => {
    const wrapper = getWrapper()
    const btns = wrapper.findAll('v-btn-stub')
    const btn = btns.at(btns.length - 2)
    expect(btn.exists()).toBeTruthy()
    expect(btn.text()).toContain('visualizations.add.type.back')
    btn.vm.$emit('click')
    expect(router.back).toHaveBeenCalled()
  })

  it('has a submit button', () => {
    const wrapper = getWrapper()
    const btns = wrapper.findAll('v-btn-stub')
    const btn = btns.at(btns.length - 1)
    expect(btn.exists()).toBeTruthy()
    expect(btn.text()).toContain('visualizations.add.type.submit')
    expect(btn.props('disabled')).toBeTruthy()
    expect(wrapper.emitted('next-step')).toBeFalsy()
    wrapper.setProps({
      currentType: 'wordcloud'
    })

    expect(btn.props('disabled')).toBeFalsy()
    expect(wrapper.emitted('next-step')).toBeFalsy()

    btn.vm.$emit('click')
    expect(wrapper.emitted('next-step')).toBeTruthy()
  })

  visualizations.forEach((VisualizationClass: any, index: number) => {
    describe('renders a card for type ' + VisualizationClass.key, () => {
      let card: any
      let wrapper: any
      beforeEach(() => {
        wrapper = getWrapper()
        card = wrapper.findAll('v-col-stub').at(index).find('v-card-stub')
        expect(card.exists()).toBeTruthy()
      })
      it('renders', () => {
        expect(card.html()).toMatchSnapshot()
      })
      it('renders the title and description', () => {
        expect(card.text()).toContain(VisualizationClass.title)
        expect(card.text()).toContain(VisualizationClass.description)
        expect(card.text()).toContain(VisualizationClass.longDescription)
      })

      it('renders the image and description', () => {
        const img = card.find('v-img-stub')
        expect(img.exists()).toBeTruthy()
        expect(img.props('src')).toContain(VisualizationClass.imageUrl)
      })

      it('has a button to choose the type', () => {
        const btn = card.find('v-btn-stub')
        expect(btn.exists()).toBeTruthy()
        expect(btn.text()).toEqual('visualizations.add.type.choose')
        expect(wrapper.emitted('update-type')).toBeFalsy()
        btn.vm.$emit('click')
        expect(wrapper.emitted('update-type')).toBeTruthy()
        expect(wrapper.emitted('update-type')[0][0]).toEqual(VisualizationClass)
      })

      it('renders the card active if the type is active', () => {
        wrapper.setProps({
          currentType: VisualizationClass.key
        })
        expect(card.html()).toMatchSnapshot()
        expect(card.props('raised')).toBeTruthy()
      })
    })
  })
})
