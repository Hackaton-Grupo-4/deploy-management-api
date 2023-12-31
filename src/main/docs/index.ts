import components from './components'
import paths from './paths'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Deploy Management API',
    description: 'Deploy Management API',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'User',
  },{
    name: 'History'
  }],
  paths,
  components,
  schemas
}
