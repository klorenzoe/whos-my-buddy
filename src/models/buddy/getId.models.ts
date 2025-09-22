import { FromSchema } from 'json-schema-to-ts'
import { BuddySchema } from './buddy.model'

//#region  Schemas
export const BuddiesGetByIdSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' }
  },
  additionalProperties: false
} as const

export const getByIdResponseSchema = {
  schema: {
    tags: ['REST'],
    summary: 'Get Buddy by Id',
    description: 'Get Buddy by Id using rest api',
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
    responses: {
      200: {
        description: 'Get Buddy by Id',
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
