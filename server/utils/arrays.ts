function objectToArray<T>(object: Object): T[] {
  const ans: T[] = [];
  for (const prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      ans.push((object as any)[prop]);
    }
  }
  return ans;
}

export { objectToArray }