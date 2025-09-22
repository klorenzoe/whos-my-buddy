import { getResponseSchema } from './models/buddy/get.models.js'
import { createResponseSchema } from './models/buddy/create.model.js'
import { getByIdResponseSchema } from './models/buddy/getId.models.js'
import { updateResponseSchema } from './models/buddy/update.model.js'
import { adoptResponseSchema } from './models/buddy/adopt.model.js'

export const openapi = {
  openapi: '3.1.0',
  info: {
    title: 'Who’s My Buddy? API',
    version: '0.1.0',
    description:
      'Express API documented with OpenAPI 3.1 using shared JSON Schemas.'
  },
  servers: [{ url: 'http://localhost:3001' }],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } }
                }
              }
            }
          }
        }
      }
    },
    '/api/buddies': {
      get: {
        ...getResponseSchema.schema
      },
      post: {
        ...createResponseSchema.schema
      }
    },
    '/api/buddies/{id}': {
      get: {
        ...getByIdResponseSchema.schema
      },
      put: {
        ...updateResponseSchema.schema
      }
    },
    '/api/buddies/{id}/adopted': {
      put: {
        ...adoptResponseSchema.schema
      }
    },
    '/graphql': {
      post: {
        tags: ['GraphQL'],
        summary: 'GraphQL endpoint',
        description:
          'Use GraphQL queries and mutations according to the defined schema.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                    description: 'GraphQL query or mutation'
                  },
                  variables: { type: 'object', additionalProperties: true },
                  operationName: { type: 'string' }
                },
                required: ['query']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'GraphQL response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'object' },
                    errors: {
                      type: 'array',
                      items: { type: 'object' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
} as const
