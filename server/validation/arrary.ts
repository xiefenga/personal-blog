import { checkType } from '../utils/type'
import { dyadicArrayHepler, isDyadicArrayOf } from '../utils/array'
import { registerDecorator, ValidationOptions } from 'class-validator'

function IsDyadicArrayOf(typeFunction: () => Function, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDyadicArrayOf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isDyadicArrayOf(typeFunction, value);
        },
      },
    })
  }
}

function DyadicArray(typeFunction: () => Function, minLength: number = 0, maxLength: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'dyadicArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate: (value: unknown) => dyadicArrayHepler(value, val => val.length <= maxLength && val.length >= minLength && val.every(v => checkType(v, typeFunction)))
      },
    })
  }
}

export { IsDyadicArrayOf, DyadicArray }