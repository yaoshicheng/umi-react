import Decimal from 'decimal.js';

type numType = number | string;

/**
 * 把数字转换为字符串，结果的小数点后有指定位数的数字
 * @param num 数据
 * @param dp 小数点截取位数
 * @param isFilling 是否填充小数点截取位数
 * @returns
 */
export const toFixed = (
  num: numType,
  dp: number,
  isFilling: boolean = true,
): string => {
  const n = new Decimal(num).toFixed(dp);
  if (isFilling) {
    return n;
  }
  return new Decimal(n).toNumber().toString();
};
/**
 * 精确加法
 */
export const plus = (
  num1: numType,
  num2: numType,
  ...others: numType[]
): number => {
  if (others.length > 0) {
    return plus(plus(num1, num2), others[0], ...others.slice(1));
  }
  return new Decimal(num1).add(new Decimal(num2)).toNumber();
};

/**
 * 精确减法
 */
export const minus = (
  num1: numType,
  num2: numType,
  ...others: numType[]
): number => {
  if (others.length > 0) {
    return minus(minus(num1, num2), others[0], ...others.slice(1));
  }
  return new Decimal(num1).sub(new Decimal(num2)).toNumber();
};
/**
 * 精确乘法
 */
export const times = (
  num1: numType,
  num2: numType,
  ...others: numType[]
): number => {
  if (others.length > 0) {
    return times(times(num1, num2), others[0], ...others.slice(1));
  }
  return new Decimal(num1).mul(new Decimal(num2)).toNumber();
};

/**
 * 精确除法
 */
export const divide = (
  num1: numType,
  num2: numType,
  ...others: numType[]
): number => {
  if (others.length > 0) {
    return divide(divide(num1, num2), others[0], ...others.slice(1));
  }
  return new Decimal(num1).div(new Decimal(num2)).toNumber();
};

export default { plus, minus, times, divide, toFixed };
