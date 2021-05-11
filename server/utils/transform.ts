import { ClassConstructor, plainToClass } from 'class-transformer'

function plainTransform<T, V>(cls: ClassConstructor<T>, plain: V) {
  return plainToClass(
    cls,
    plain,
    // 去除 plain-object 中额外的属性
    // 允许暴露出来的属性使用默认值
    { excludeExtraneousValues: true, exposeDefaultValues: true }
  );
}

export { plainTransform }