const types: any = {
  'Number': Number,
  'Boolean': Boolean,
  'String': String,
  'Symbol': Symbol,
  'BigInt': BigInt,
  'Object': Object,
}


function checkType(val: unknown, typeFunction: () => Function): boolean {
  if (val == null || Number.isNaN(val)) {
    return false;
  }
  const expectType = typeFunction();
  const type = types[Object.prototype.toString.call(val).slice(8, -1)];
  return expectType === type || expectType instanceof type;
}

export { checkType }