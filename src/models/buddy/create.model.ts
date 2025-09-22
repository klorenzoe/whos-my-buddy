import { FromSchema } from 'json-schema-to-ts'
import { BuddySchema } from './buddy.model'

//#region Types
export type BuddyCreateDto = FromSchema<typeof BuddyCreateDtoSchema>
//#endregion

//#region  Schemas
export const BuddyCreateDtoSchema = {
  type: 'object',
  required: ['name', 'species', 'size', 'ageYears', 'colors', 'description'],
  properties: {
    name: { type: 'string' },
    species: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1
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

export const createResponseSchema = {
  schema: {
    tags: ['REST'],
    summary: 'Register Buddy',
    description: 'Register Buddy using rest api',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: { ...BuddyCreateDtoSchema }
        }
      }
    },
    responses: {
      '201': {
        description: 'Created',
        content: {
          'application/json': {
            schema: { ...BuddySchema }
          }
        }
      },
      '400': { description: 'Validation error' }
    }
  }
} as const
//#endregion
