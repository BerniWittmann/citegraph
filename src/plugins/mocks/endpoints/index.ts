import Axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { setupMocks as setupDatabaseMocks } from './database'
import { setupMocks as setupProjectsMocks } from './projects'
import { setupMocks as setupPaperEntitiesMocks } from './paperEntities'
import { setupMocks as setupVisualizationsMocks } from './visualizations'

const mock = new MockAdapter(Axios)

setupDatabaseMocks(mock)
setupProjectsMocks(mock)
setupPaperEntitiesMocks(mock)
setupVisualizationsMocks(mock)
