/**
 * 格式化时间
 * @param {any} value
 * @param {String} format
 * @example utilscore.formatTime('2019/06/04 12:45:32','YYYY-MM-DD hh:mm:ss') // => "2019-06-04 12:45:32"
 */

const isValidDate = (date: any) =>
  date instanceof Date && !isNaN(date.getTime());

export default function formatTime(
  value: any,
  format: string = 'YYYY-MM-DD',
): string {
  if (!value || +value === 14400000) return '';
  value = `${value}`;
  let standardTime: string = '';
  if (value.length === 13) {
    const date = +new Date(+value) + 8 * 60 * 60 * 1000;
    standardTime = new Date(date).toISOString();
  } else if (value.length > 14) {
    standardTime = value;
  } else {
    if (isNaN(value)) return value;
    let reg = /(\d{4})(\d{2})(\d{2})/g;
    if (value.length === 6) reg = /(\d{4})(\d{2})/g;
    if (value.length === 14)
      reg = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g;
    const dateReg = reg.exec(value);
    if (dateReg) {
      const [
        ,
        year,
        month,
        day = '01',
        hours = '00',
        minute = '00',
        second = '00',
      ] = dateReg;
      const date = `${year}-${month}-${day} ${hours}:${minute}:${second}`;
      const date2Date = new Date(date);

      // 兼容ios, ios不支持xxxx-xx-xx格式，支持xxxx/xx/xx格式
      const dateIos = `${year}/${month}/${day} ${hours}:${minute}:${second}`;
      const date2DateIos = new Date(dateIos);

      if (isValidDate(date2Date)) {
        standardTime = new Date(+date2Date + 8 * 60 * 60 * 1000).toISOString();
      } else if (isValidDate(date2DateIos)) {
        standardTime = new Date(
          +date2DateIos + 8 * 60 * 60 * 1000,
        ).toISOString();
      } else {
        return date;
      }
    } else {
      return value;
    }
  }
  const time = standardTime.substr(0, 19).replace(/[a-z]/i, ' ');
  const [, YYYY, MM, DD, HH, mm, ss] =
    time.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/) || [];
  const filterTime = (type: string, _: string) => type.slice(0, _.length);
  return format
    .replace(/(Y{1,4})/g, ($1) => filterTime(YYYY, $1))
    .replace(/(M{1,2})/g, ($1) => filterTime(MM, $1))
    .replace(/(D{1,2})/g, ($1) => filterTime(DD, $1))
    .replace(/(H{1,2})/g, ($1) => filterTime(HH, $1))
    .replace(/(h{1,2})/g, ($1) => filterTime(HH, $1))
    .replace(/(m{1,2})/g, ($1) => filterTime(mm, $1))
    .replace(/(s{1,2})/g, ($1) => filterTime(ss, $1));
}

export const timestampFormat = (timestamp: any) => {
  if (!timestamp || +timestamp === 14400000) return '';
  timestamp = `${timestamp}`;
  let standardTime = 0;
  if (timestamp.length !== 13) {
    return '';
  } else {
    standardTime = +timestamp;
  }
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // const halfamonth = day * 15;
  // const month = day * 30;
  const now = new Date().getTime();
  const diffValue = now - timestamp;
  if (diffValue < 0) {
    return;
  }
  // const monthC = diffValue / month;
  // const weekC = diffValue / (7 * day);
  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;

  const date = new Date(standardTime);
  const _year = date.getFullYear();
  const _month = date.getMonth() + 1;
  const _day = date.getDate();
  let result = '';
  // if (monthC >= 1) {
  //   result = '' + parseInt(monthC) + '月前';
  // } else if (weekC >= 1) {
  //   result = '' + parseInt(weekC) + '周前';
  // } else

  // result = `${_month}月${_day}日`;
  const a = new Date();
  const b = new Date(standardTime);

  if (dayC >= 1) {
    const c = new Date(a);
    c.setDate(a.getDate() - 1);

    if (a.getFullYear() === b.getFullYear()) {
      if (c.getMonth() === b.getMonth() && c.getDate() === b.getDate()) {
        result = '昨天 ' + formatTime(standardTime, 'HH:mm');
      } else {
        result = `${_month}月${_day}日`;
      }
    } else {
      result = `${_year}/${_month}/${_day}`;
    }
  } else if (hourC >= 1) {
    const _a = a.getMonth() + '' + a.getDate();
    const _b = b.getMonth() + '' + b.getDate();
    if (_a === _b) {
      result = '今天 ' + formatTime(standardTime, 'HH:mm');
    } else {
      result = '昨天 ' + formatTime(standardTime, 'HH:mm');
    }
  } else if (minC >= 1) {
    result = '' + parseInt(`${minC}`) + '分钟前';
  } else result = '刚刚';
  return result;
};

export function formatRange(dateRange: Date[]) {
  if (dateRange.length) {
    const [start, end] = dateRange;
    return [formatTime(start.getTime()), formatTime(end.getTime())];
  }
  return [];
}

export function getDateRange(duration = 90) {
  let _duration = duration;
  if (typeof duration !== 'number') {
    _duration = 90;
  }
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - _duration);
  return [start, end];
}

export function getDateTimestampRange(duration = 90) {
  // 获取当天 23:59:59
  let _duration = duration;
  if (typeof duration !== 'number') {
    _duration = 90;
  }
  const end =
    +new Date(new Date().toLocaleDateString()) + 24 * 60 * 60 * 1000 - 1;
  const start = end - _duration * 24 * 60 * 60 * 1000 + 2;
  return [start, end];
}
