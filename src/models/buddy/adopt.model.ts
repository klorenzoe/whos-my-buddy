import { BuddySchema } from './buddy.model'

//#region  Schemas

export const adoptResponseSchema = {
  schema: {
    tags: ['REST'],
    summary: 'Adopt Buddy',
    description: 'Update Buddy to adopted with rest api',
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
