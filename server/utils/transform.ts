import { ParsedUrlQuery } from 'querystring'
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

/**
 * 将 koa query 中的数字数据转为数字，
 * 无效的数据（array、-> NaN, undefined, null) -> undefined
 * @param query koa 的 ctx.request.query
 * @param props 需要转换的属性
 * @returns 
 */
function queryTransformNumber(query: ParsedUrlQuery, ...props: string[]): (number | undefined)[] {
  return props.map(prop => {
    const val = query[prop];
    return val !== undefined
      ? Array.isArray(val)
        ? NaN
        : Number(val)
      : undefined;
  });
}

export { plainTransform, queryTransformNumber }