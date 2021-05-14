import { isDataURI, isURL, registerDecorator, ValidationOptions } from 'class-validator'

type Checker = (val: unknown) => boolean;

function IsArrayOf(typeCheck: Checker, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isArrayOf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate: (value: unknown) => Array.isArray(value) && value.every(v => typeCheck(v))
      },
    })
  }
}

function IsValidURL(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidURL',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate: (value: unknown) => typeof value === 'string' && (isURL(value) || isDataURI(value))
      },
    })
  }
}


export { IsValidURL, IsArrayOf }