import formatTime, {
  timestampFormat,
  getDateRange,
  formatRange,
  getDateTimestampRange,
} from './formatTime';
import {getLen, mask, sum, getParams, toPercent, smalltoBig, toThousands, obj2String, replaceKeys, parseQuery} from './common';
import calculator from './calculator';

export const isEmptyObj = (obj: object | null | undefined): boolean => {
  if (obj === null || obj === undefined) {
    return true;
  }
  return !Object.keys(obj).length;
};

export {
  mask,
  formatTime,
  toThousands,
  obj2String,
  smalltoBig,
  getParams,
  replaceKeys,
  timestampFormat,
  getDateRange,
  getDateTimestampRange,
  formatRange,
  calculator,
  sum,
  getLen,
  toPercent,
  parseQuery
};
