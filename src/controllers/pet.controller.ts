import { PetSearchSchemaType } from '../routes/pets/schemas/pet-search.schema'
import { PetSchemaType } from '../routes/pets/schemas/pet.schema'

// In-memory store temporal (luego lo cambiamos por DB)
const db: any[] = []

export const createPet = (pet: PetSchemaType) => {
  const parsedPet = { ...pet, id: crypto.randomUUID(), adopted: false }
  db.push(parsedPet)
  return parsedPet
}

export const getPets = (query: PetSearchSchemaType) => {
  const { q, species, minAge, maxAge, adopted, limit = 20, offset = 0 } = query

  let items = db.slice()
  if (q)
    items = items.filter(p =>
      p.name?.toLowerCase().includes(String(q).toLowerCase())
    )
  if (species) items = items.filter(p => p.species === species)
  if (minAge !== undefined)
    items = items.filter(p => (p.ageYears ?? 0) >= Number(minAge))
  if (maxAge !== undefined)
    items = items.filter(p => (p.ageYears ?? 0) <= Number(maxAge))
  if (adopted !== undefined) items = items.filter(p => p.adopted)

  const total = items.length
  const paged = items.slice(Number(offset), Number(offset) + Number(limit))

  return { items: paged, total }
}
