function objectToArray<T>(object: Object): T[] {
  const ans: T[] = [];
  for (const prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      ans.push((object as any)[prop]);
    }
  }
  return ans;
}

type ArrayHelper = (val: unknown[]) => boolean

function dyadicArrayHepler(value: unknown): boolean;
function dyadicArrayHepler(value: unknown, helper: ArrayHelper): boolean;
function dyadicArrayHepler(value: unknown, helper?: ArrayHelper): boolean {
  if (helper) {
    return Array.isArray(value) && value.every(val => Array.isArray(val) && helper(val));
  }
  return Array.isArray(value) && value.every(val => Array.isArray(val));
}

export { objectToArray, dyadicArrayHepler }