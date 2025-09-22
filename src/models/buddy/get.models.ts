import { FromSchema } from 'json-schema-to-ts'
import { BuddySchema } from './buddy.model'

//#region Types
export type BuddiesGetDto = FromSchema<typeof BuddiesGetDtoSchema>
//#endregion

//#region  Schemas
export const BuddiesGetDtoSchema = {
  type: 'object',
  properties: {
    filter: {
      type: 'object',
      properties: {
        q: { type: 'string' },
        speciesAny: {
          type: 'array',
          items: { type: 'string' }
        },
        speciesAll: {
          type: 'array',
          items: { type: 'string' }
        },
        size: { type: 'string' },
        adopted: { type: 'boolean' },
        colorsAny: {
          type: 'array',
          items: { type: 'string' }
        },
        traitsAll: {
          type: 'array',
          items: { type: 'string' }
        },
        minAge: { type: 'number' },
        maxAge: { type: 'number' }
      },
      additionalProperties: false
    },
    first: { type: 'number' },
    after: { type: 'number' },
    orderBy: {
      type: 'string',
      enum: ['CREATED_AT_DESC', 'CREATED_AT_ASC', 'AGE_ASC', 'AGE_DESC']
    }
  },
  additionalProperties: false
} as const

export const getResponseSchema = {
  schema: {
    tags: ['REST'],
    summary: 'Get Buddies',
    description: 'Get Buddies with rest api',
    parameters: [
      {
        name: 'filter.q',
        in: 'query',
        description: 'text search',
        required: false,
        schema: { type: 'string' }
      },
      {
        name: 'filter.speciesAny',
        in: 'query',
        description: 'array of species, any match',
        required: false,
        schema: { type: 'array', items: { type: 'string' } }
      },
      {
        name: 'filter.speciesAll',
        in: 'query',
        description: 'array of species, all match',
        required: false,
        schema: { type: 'array', items: { type: 'string' } }
      },
      {
        name: 'filter.size',
        in: 'query',
        description: 'Buddy size',
        required: false,
        schema: { type: 'string' }
      },
      {
        name: 'filter.adopted',
        in: 'query',
        description: 'Adopted status',
        required: false,
        schema: { type: 'string' }
      },
      {
        name: 'filter.colorsAny',
        in: 'query',
        description: 'colors of buddy, any match',
        required: false,
        schema: { type: 'array', items: { type: 'string' } }
      },
      {
        name: 'filter.traitsAll',
        in: 'query',
        description: 'traits of buddy, all match',
        required: false,
        schema: { type: 'array', items: { type: 'string' } }
      },
      {
        name: 'filter.minAge',
        in: 'query',
        description: 'minimum age in years',
        required: false,
        schema: { type: 'number' }
      },
      {
        name: 'filter.maxAge',
        in: 'query',
        description: 'maximum age in years',
        required: false,
        schema: { type: 'number' }
      },
      {
        name: 'first',
        in: 'query',
        description: 'pagination - number of items to return',
        required: false,
        schema: { type: 'number' }
      },
      {
        name: 'after',
        in: 'query',
        description: 'pagination - number of items to skip',
        required: false,
        schema: { type: 'number' }
      },
      {
        name: 'orderBy',
        in: 'query',
        description: 'pagination - order by criteria',
        required: false,
        schema: {
          type: 'string',
          values: ['CREATED_AT_DESC', 'CREATED_AT_ASC', 'AGE_ASC', 'AGE_DESC']
        }
      }
    ],
    query: {
      required: true,
      content: {
        'application/json': {
          schema: { ...BuddiesGetDtoSchema }
        }
      }
    },
    responses: {
      200: {
        description: 'Get Buddies',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { ...BuddySchema }
            }
          }
        }
      }
    }
  }
} as const
//#endregion
