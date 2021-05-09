import { isDataURI, isURL, registerDecorator, ValidationOptions } from 'class-validator'

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

export { IsValidURL }