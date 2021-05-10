import { validate } from 'class-validator'
import { getValidationErrors } from '../utils/validateError'

const validateModel = async (obj: Object, skip: boolean = true) => getValidationErrors(await validate(obj, { skipUndefinedProperties: skip }))


export { validateModel }