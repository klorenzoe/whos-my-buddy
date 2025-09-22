import type { Buddy as BuddyDb } from '@prisma/client'
import { BuddyCreateDto } from '../../models/buddy/create.model'
import { BuddyUpdateDto } from '../../models/buddy/update.model'
import { BuddiesGetDto } from '../../models/buddy/get.models'
import {
  getBuddies,
  getBuddyById,
  mardkeAsAdopted,
  registerABuddy,
  updateABuddy
} from '../../db/repositories/buddy.repository'

type Ctx = {}

//#region  Mappers
const mapBuddy = (b: BuddyDb) => ({
  id: b.id,
  name: b.name,
  species: b.species,
  size: b.size,
  ageYears: b.age_years,
  adopted: b.adopted,
  colors: b.colors,
  description: b.description,
  traits: b.traits,
  createdAt: b.created_at,
  updatedAt: b.updated_at
})

//#endregion

//#region Resolvers
export const BuddiesResolvers = {
  Query: {
    _ping: () => true,

    buddy: async (_: unknown, args: { id: string }, ctx: Ctx) => {
      const found = await getBuddyById(args.id)
      return found ? mapBuddy(found) : null
    },

    buddies: async (_: unknown, args: BuddiesGetDto, ctx: Ctx) => {
      const rows = await getBuddies(args)

      const edges = rows.map(r => ({ cursor: r.id, node: mapBuddy(r) }))
      const endCursor = edges.length ? edges[edges.length - 1].cursor : null
      const hasNextPage = false

      return {
        edges,
        pageInfo: { endCursor, hasNextPage }
      }
    }
  },

  Mutation: {
    registerABuddy: async (
      _: unknown,
      args: {
        input: BuddyCreateDto
      },
      ctx: Ctx
    ) => {
      const { input } = args
      const created = await registerABuddy(input)
      return mapBuddy(created)
    },

    updateBuddy: async (
      _: unknown,
      args: {
        id: string
        input: BuddyUpdateDto
      },
      ctx: Ctx
    ) => {
      const { id, input } = args
      const updated = await updateABuddy(id, input)
      return mapBuddy(updated)
    },

    markBuddyAdopted: async (_: unknown, args: { id: string }, ctx: Ctx) => {
      const { id } = args
      const updated = await mardkeAsAdopted(id)
      return mapBuddy(updated)
    }
  }
}

//#endregion
