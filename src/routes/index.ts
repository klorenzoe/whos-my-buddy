import { Request, Response } from 'express'
import {
  validateBody,
  validateParams,
  validateQuery
} from '../middlewares/prevalidation.middleware'
import { BuddiesGetDtoSchema } from '../models/buddy/get.models'
import {
  getBuddiesHandler,
  getBuddyByIdHandler,
  markBuddyAdoptedHandler,
  registerABuddyHandler,
  updateABuddyHandler
} from './buddy.handler'
import { BuddiesGetByIdSchema } from '../models/buddy/getId.models'
import { BuddyCreateDtoSchema } from '../models/buddy/create.model'
import { BuddyUpdateDtoSchema } from '../models/buddy/update.model'

export interface Routes {
  configuration: {
    method: 'get' | 'post' | 'put' | 'delete'
    url: string
    middlewares: any[]
    handler: (_req: Request, res: Response) => void
  }
}

const routes: Routes[] = [
  {
    configuration: {
      method: 'get',
      url: '/buddies',
      middlewares: [validateQuery(BuddiesGetDtoSchema)],
      handler: getBuddiesHandler
    }
  },
  {
    configuration: {
      method: 'get',
      url: '/buddies/:id',
      middlewares: [validateParams(BuddiesGetByIdSchema)],
      handler: getBuddyByIdHandler
    }
  },
  {
    configuration: {
      method: 'post',
      url: '/buddies',
      middlewares: [validateBody(BuddyCreateDtoSchema)],
      handler: registerABuddyHandler
    }
  },
  {
    configuration: {
      method: 'put',
      url: '/buddies/:id',
      middlewares: [
        validateQuery(BuddiesGetByIdSchema),
        validateBody(BuddyUpdateDtoSchema)
      ],
      handler: updateABuddyHandler
    }
  },
  {
    configuration: {
      method: 'put',
      url: '/buddies/:id/adopted',
      middlewares: [validateParams(BuddiesGetByIdSchema)],
      handler: markBuddyAdoptedHandler
    }
  }
]

export default routes
