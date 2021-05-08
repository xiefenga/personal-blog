import { ValidationError } from "class-validator";

function objectToArray<T>(object: Object): T[] {
  const ans: T[] = [];
  for (const prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      ans.push((object as any)[prop]);
    }
  }
  return ans;
}

function handleNestedError({ constraints, children }: ValidationError): string[] {
  if (!constraints && children?.length) {
    // 处理 nested（嵌套） 情况
    return children.map(error => handleNestedError(error)).flat();
  } else if (constraints) {
    return objectToArray<string>(constraints);
  }
  return [];
}

const gatherValidationError = (validationError: ValidationError[]): string[] => validationError.map(error => handleNestedError(error)).flat();


export default gatherValidationError;