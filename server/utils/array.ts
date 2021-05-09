function objectToArray<T>(object: Object): T[] {
  const ans: T[] = [];
  for (const prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      ans.push((object as any)[prop]);
    }
  }
  return ans;
}

function dyadicArrayHepler(value: unknown): boolean;
function dyadicArrayHepler(value: unknown, helper: (val: unknown[]) => boolean): boolean;
function dyadicArrayHepler(value: unknown, helper?: (val: unknown[]) => boolean): boolean {
  return Array.isArray(value) && value.every(val => Array.isArray(val) && (helper && helper(val)));
}

// 判断是否为二维数组
function isDyadicArray(value: unknown): boolean {
  return dyadicArrayHepler(value);
}

function isDyadicArrayOf(typeFunc: () => Function, value: unknown): boolean {
  const type = typeFunc();
  return dyadicArrayHepler(value, val => val.every(v => v instanceof type));
}

export { objectToArray, isDyadicArray, isDyadicArrayOf, dyadicArrayHepler }