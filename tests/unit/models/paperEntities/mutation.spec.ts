import { constructMutation } from '@/models/paperEntities/mutation'

describe('models/paperEntities/mutation.ts', () => {
  describe('it has a function to create a mutation', () => {
    const params = {
      id: '42',
      projectId: 9,
      entityType: 'record'
    }
    it('creates a mutation', () => {
      const fields = ['id', 'name']
      const data = {
        id: '42',
        name: 'Name',
        keywords: ['too', 'much']
      }
      expect(constructMutation('Record', 'record', params, fields, data)).toMatchSnapshot()
    })

    it('handles invalid field declaration', () => {
      const fields = ['id', 'name', 'wrong']
      const data = {
        id: '42',
        name: 'Name',
        keywords: ['too', 'much']
      }
      expect(constructMutation('Record', 'record', params, fields, data)).toMatchSnapshot()
    })
  })
})
