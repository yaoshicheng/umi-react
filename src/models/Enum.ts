// {k1:[k2,value]},k1查k2,k2查value
type KKV<T> = {
  [key: string | number]: [number, T] | T;
};

type Entries<T> = Array<[number, T]>;
type EntriesFunction<T> = () => Entries<T>;
/**
 * 使用方法：
 * const AuditStatus = EnumMap({
      UNAUDIT: '未审核',
      AUDITED: '已审核',
      AUDITING: [2,'审核中]',
   });
   对enum的扩展，可以根据k1找到k2，根据k2找到value
 * @param data {k1:[k2,value]},可以简化为{k1:value},此时k2为k1在属性中的index值
 * @returns
 */

export default function Enum<P extends KKV<T>, T>(data: P) {
  type U = P extends KKV<infer S> ? S : 'string'; // 令U=S，S类型为T
  const map = new Map<string | number, number | U>();
  const entries: Entries<U> = [];
  if (!data) {
    return data;
  }
  // Object.getOwnPropertyNames是有序的
  Object.getOwnPropertyNames(data).forEach((key1, index) => {
    let key2, value: U;
    if (Array.isArray(data[key1])) {
      const arr = data[key1] as [number, U];
      key2 = arr[0];
      value = arr[1];
    } else {
      key2 = index;
      value = data[key1] as U;
    }
    map.set(key1, key2);
    map.set(key2, value);
    entries.push([key2, value]);
  });
  return new Proxy(
    {} as { [key in keyof Exclude<P, 'entries'>]: number } & {
      [key: number]: U;
      entries: EntriesFunction<U>;
    },
    {
      get(_target, propKey: string) {
        if (propKey === 'entries') {
          return () => entries;
        }

        let value = map.get(propKey) ?? data[propKey];
        if (value === undefined && /\d+/.test(propKey)) {
          value = map.get(Number(propKey)) || data[Number(propKey)];
        }
        return value;
      },
    },
  );
}
