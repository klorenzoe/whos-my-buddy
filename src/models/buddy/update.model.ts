import { FromSchema } from 'json-schema-to-ts'
import { BuddySchema } from './buddy.model'
import { BuddiesGetByIdSchema } from './getId.models'

//#region Types
export type BuddyUpdateDto = FromSchema<typeof BuddyUpdateDtoSchema>
//#endregion

//#region  Schemas
export const BuddyUpdateDtoSchema = {
  type: 'object',
  required: [],
  properties: {
    name: { type: 'string' },
    species: {
      type: 'array',
      items: { type: 'string' }
    },
    size: { type: 'string' },
    ageYears: { type: 'integer', minimum: 0 },
    colors: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1
    },
    description: { type: 'string' },
    traits: { type: 'array', items: { type: 'string' }, minItems: 1 }
  },
  additionalProperties: false
} as const

export const updateResponseSchema = {
  schema: {
    tags: ['REST'],
    summary: 'Update Buddy',
    description: 'Update Buddy Information with rest api',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'id del buddy',
        schema: {
          type: 'string'
        }
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { ...BuddyUpdateDtoSchema }
        }
      }
    },
    responses: {
      200: {
        description: 'Adopted Buddy',
        content: {
          'application/json': {
            schema: { ...BuddySchema }
          }
        }
      }
    }
  }
} as const
//#endregion
