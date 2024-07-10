// @ts-nocheck
import { times, divide, plus } from './calculator';
import Decimal from 'decimal.js';

interface Params {
  [proppName: string]: any;
}

/**
 * 判断地址
 */
export function parseQuery() {
  const res = {};

  const query = (location.href.split('?')[1] || '').trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach((param) => {
    const parts = param.replace(/\+/g, ' ').split('=');
    const key = decodeURIComponent(parts.shift());
    const val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}


/**
 * @param  {any} n 金额
 * @param  {number} fixed 小数点截取位数，默认两位
 * @param  {boolean} isFilling 是否填充小数点截取位数，默认填充
 * @param  {string} prefix 前缀
 * @returns string 千分位金额
 */
export function toThousands({
  value,
  fixed = 2,
  isFilling = true,
  prefix = '',
}: {
  value: any;
  fixed?: number;
  isFilling?: boolean;
  prefix?: string;
}): string {
  if (isNaN(value) || value === null || value === undefined) return value;
  if ([''].includes(value)) return value;
  if ([0, '0'].includes(value)) {
    if (isFilling) {
      return `${prefix}${Number(value).toFixed(fixed)}`;
    }
    return `${prefix}${value}`;
  }
  let num = new Decimal(value).toFixed(fixed);
  if (!isFilling && num.includes('.')) num = num.replace(/0+$/, '');
  if (!num.includes('.')) num = `${num}.`;
  // @ts-ignore
  return `${prefix}${num
    .replace(/(\d)(?=(\d{3})+\.)/g, ($0: any, $1: any) => `${$1},`)
    .replace(/\.$/, '')}`;
}

/*
 * @params [String, Number] num小数
 * @params [Boolean] isTransform 是否需要转换百分比
 * @params [Number] fixed 数点后位数
 * @return [String] 百分数
 */
export function toPercent(
  num: any,
  isTransform: boolean = true,
  fixed: number = 0,
): string {
  if (isNaN(num)) return num;
  if ([''].includes(num)) return num;
  if ([0, '0'].includes(num)) return `${num}%`;
  const pow = 10 ** fixed;
  const hundredfold = isTransform ? 100 * 100 : 100;
  num = Math.round(Number(num) * hundredfold * pow);
  return `${(num / 100 / pow).toFixed(fixed)}%`;
}


/**
 * 计算一维数组指定字段之和
 * @param  {any[]} arr
 * @param  {string} key
 * @param  {number=0} defaultValue
 * @returns number
 */
export function sum(
  arr: any[],
  key: string,
  defaultValue: number = 0,
): number {
  if (arr.length) {
    const item = arr.map((item) => (key ? +item[key] || defaultValue : item));
    if (item.length > 1) {
      return item.reduce((item, sum) => plus(item, sum), 0);
    }
    return +item.toString();
  }
  return 0;
}


/**
 * @param  {string=''} str 字符串
 * @param  {boolean=false} byte 字节长度 or 字符长度
 * @returns number
 */
export function getLen(
  str: string = '',
  byte: boolean = false,
): number {
  if (byte) {
    return str.replace(/[\u0391-\uFFE5]/g, 'aa').length;
  }
  return str.length;
}

/**
 * 解析 URL 参数的方法
 * @param {string} search
 * @param {string} key
 */
export function getParams(search: string, key?: string): any {
  if (!search) return {};
  const str = search.indexOf('?') !== -1 ? search.split('?')[1] : search;
  const params = str.split('&').reduce((args, arg) => {
    const [argKey, ...value] = arg.split('=');
    //@ts-ignore
    args[decodeURIComponent(argKey)] = decodeURIComponent(value.join('='));
    return args;
  }, {});
  //@ts-ignore
  if (key) return params[key] || '';
  return params;
}

/* eslint-disable no-useless-escape */
/**
 * 根据位置,使用 * 遮蔽字符串
 * @param {string} str
 * @param {number} start 起始位置
 * @param {number} len 长度
 * @param {string} _mask
 * @example mask('12398765432',3,4) // => "123****5432"
 */
export function mask(
  str: string,
  start: number = 0,
  len: number = 0,
  _mask: string = '*',
): string {
  const reg = new RegExp(
    `\^\(\.\{${start}\}\)\(\.\{${len}\}\)\(\.${
      start + len >= str.length ? '?' : '+'
    }\)\$`,
  );
  return str.replace(reg, (_, $1, $2, $3) => $1 + $2.replace(/./g, _mask) + $3);
}

/**
 * @param  {Params} data 将查询参数转成字符串
 * @returns string 重置协议后的URL地址
 */
export function obj2String(data: Params): string {
  let str = '';
  for (const key in data) {
    str += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`;
  }
  return str.slice(0, -1);
}

/**
 * @param  {any} n 小写金额
 * @returns string 大写金额
 */
export function smalltoBig(n: any): string {
  if (isNaN(n) || n === '' || n === null || n === undefined) return n;
  n = +n;
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  const head = n < 0 ? '(负数)' : '';
  n = Math.abs(n);

  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    const a = Math.floor(times(n, 1000, 10, 10 ** i));
    const b = a % (10 * 1000);
    const c = Math.floor(divide(b, 1000));
    s += (digit[c] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  );
}

/**
 * 对 obj 对象中的属性名称进行替换
 * @param  {Record<string, any>} obj 需要进行键名替换的对象
 * @param  {[key: string]: string } keyMap 用于指定新旧键名的键值对，KeyMap 类型表示一个字符串索引签名对象，它的 key 表示原有键名，value 表示替换后的新键名。
 * @returns number
 */
type KeyMap = { [key: string]: string };

export function replaceKeys(
  obj: Record<string, any>,
  keyMap: KeyMap,
): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = keyMap[key] || key;
    //@ts-ignore
    acc[newKey] = obj[key];
    return acc;
  }, {});
}


