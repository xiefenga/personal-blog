import { objectToArray } from '../utils/helper'
import { validate, ValidationError } from 'class-validator'

function handleNestedError({ constraints, children }: ValidationError): string[] {
  if (!constraints && children?.length) {
    // 处理 nested（嵌套） 情况
    return children.map(error => handleNestedError(error)).flat();
  } else if (constraints) {
    return objectToArray<string>(constraints);
  }
  return [];
}

const getValidationErrors = (validationError: ValidationError[]): string[] => validationError.map(error => handleNestedError(error)).flat();

const validateModel = async (obj: Object, skip: boolean = false) => getValidationErrors(await validate(obj, { skipUndefinedProperties: skip }))


export { validateModel, getValidationErrors }