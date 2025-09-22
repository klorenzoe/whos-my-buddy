import { BuddyCreateDto } from '../../models/buddy/create.model'
import { BuddyUpdateDto } from '../../models/buddy/update.model'
import { BuddiesGetDto } from '../../models/buddy/get.models'
import { prisma } from '../prisma-client'

export async function getBuddyById(id: string) {
  const found = await prisma.buddy.findUnique({
    where: { id }
  })
  return found || undefined
}

export async function getBuddies(args: BuddiesGetDto) {
  const take = Math.min(args.first ?? 20, 50)
  const skip = args.after ?? 0

  const where: any = {}
  const f = args.filter ?? {}

  if (f.q) {
    where.OR = [
      { name: { contains: f.q, mode: 'insensitive' } },
      { description: { contains: f.q, mode: 'insensitive' } }
    ]
  }
  if (f.size) where.size = f.size
  if (typeof f.adopted === 'boolean') where.adopted = f.adopted
  if (typeof f.minAge === 'number' || typeof f.maxAge === 'number') {
    where.age_years = {}
    if (typeof f.minAge === 'number') where.age_years.gte = f.minAge
    if (typeof f.maxAge === 'number') where.age_years.lte = f.maxAge
  }
  if (f.speciesAny?.length) where.species = { hasSome: f.speciesAny }
  if (f.speciesAll?.length)
    where.species = { ...(where.species ?? {}), hasEvery: f.speciesAll }
  if (f.colorsAny?.length) where.colors = { hasSome: f.colorsAny }
  if (f.traitsAll?.length) where.traits = { hasEvery: f.traitsAll }

  // Order
  const orderBy =
    args.orderBy === 'CREATED_AT_ASC'
      ? { created_at: 'asc' as const }
      : args.orderBy === 'AGE_ASC'
      ? { age_years: 'asc' as const }
      : args.orderBy === 'AGE_DESC'
      ? { age_years: 'desc' as const }
      : { created_at: 'desc' as const }

  const rows = await prisma.buddy.findMany({
    where,
    orderBy,
    skip,
    take
  })

  return rows
}

export async function registerABuddy(input: BuddyCreateDto) {
  const created = await prisma.buddy.create({
    data: {
      name: input.name,
      species: input.species,
      size: input.size,
      age_years: input.ageYears,
      adopted: false,
      colors: input.colors,
      description: input.description,
      traits: input.traits ?? []
    }
  })
  return created
}

export async function updateABuddy(id: string, input: Partial<BuddyUpdateDto>) {
  const updated = await prisma.buddy.update({
    where: { id },
    data: {
      ...(input.name ? { name: input.name } : {}),
      ...(input.species ? { species: input.species ?? [] } : {}),
      ...(input.size ? { size: input.size } : {}),
      ...(input.ageYears ? { age_years: input.ageYears } : {}),
      ...(input.colors ? { colors: input.colors ?? [] } : {}),
      ...(input.description ? { description: input.description } : {}),
      ...(input.traits ? { traits: input.traits ?? [] } : {})
    }
  })

  return updated
}

export async function mardkeAsAdopted(id: string) {
  console.log('marked as adopted', id)
  const updated = await prisma.buddy.update({
    where: { id },
    data: { adopted: true }
  })

  return updated
}
