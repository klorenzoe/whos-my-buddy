import { FromSchema } from 'json-schema-to-ts'

//#region Types
export type Buddy = FromSchema<typeof BuddySchema>
//#endregion

//#region Schemas

export const BuddySchema = {
  type: 'object',
  required: [
    'id',
    'name',
    'species',
    'size',
    'ageYears',
    'adopted',
    'colors',
    'description',
    'traits',
    'createdAt',
    'UpdatedAt'
  ],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    species: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1
    },
    size: { type: 'string' },
    ageYears: { type: 'integer', minimum: 0 },
    adopted: { type: 'boolean' },
    colors: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1
    },
    description: { type: 'string' },
    traits: { type: 'array', items: { type: 'string' }, minItems: 1 },
    createdAt: { type: 'string', format: 'date-time' },
    UpdatedAt: { type: 'string', format: 'date-time' }
  },
  additionalProperties: false
} as const

//#endregion
