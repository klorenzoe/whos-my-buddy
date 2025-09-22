import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import type { SchemaObject } from 'ajv'
import { unflatten } from '../utils'

const ajv = new Ajv({ allErrors: true, coerceTypes: true, useDefaults: true })
addFormats(ajv)
export const validateBody =
  (schema: SchemaObject) => (req: any, res: any, next: any) => {
    const validate = ajv.compile(schema)
    if (!validate(req.body)) {
      return res.status(400).json({ errors: validate.errors })
    }
    next()
  }

export const validateQuery =
  (schema: SchemaObject) => (req: any, res: any, next: any) => {
    req.query = unflatten(req.query)
    console.log('VALIDATE QUERY', req.query)
    console.log('SCHEMA', schema)
    const validate = ajv.compile(schema)
    if (!validate(req.query)) {
      return res.status(400).json({ errors: validate.errors })
    }
    next()
  }

export const validateParams =
  (schema: SchemaObject) => (req: any, res: any, next: any) => {
    const validate = ajv.compile(schema)
    if (!validate(req.params)) {
      return res.status(400).json({ errors: validate.errors })
    }
    next()
  }
