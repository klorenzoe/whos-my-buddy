import { Request, Response } from 'express'
import { BuddiesGetDto } from '../models/buddy/get.models'
import {
  getBuddies,
  getBuddyById,
  mardkeAsAdopted,
  registerABuddy,
  updateABuddy
} from '../db/repositories/buddy.repository'

export const getBuddiesHandler = async (req: Request, res: Response) => {
  const input = req.query
  console.log('INPUT', input)
  const data = await getBuddies(input)
  console.log('RESPONSE', data)
  res.json(data)
}

export const getBuddyByIdHandler = async (req: Request, res: Response) => {
  const id = req.params.id
  const data = await getBuddyById(id)
  if (!data) return res.status(404).json({ error: 'Not found' })
  res.json(data)
}

export const registerABuddyHandler = async (req: Request, res: Response) => {
  const input = req.body
  const created = await registerABuddy(input)
  res.status(201).json(created)
}

export const updateABuddyHandler = async (req: Request, res: Response) => {
  const id = req.params.id
  const input = req.body
  console.log('UPDATE INPUT', id, input)
  const updated = await updateABuddy(id, input)
  res.json(updated)
}

export const markBuddyAdoptedHandler = async (req: Request, res: Response) => {
  const id = req.params.id
  const updated = await mardkeAsAdopted(id)
  res.json(updated)
}
