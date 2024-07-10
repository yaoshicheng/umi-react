import { subPath } from '@/const';

import request from '@/utils/request';

export default {
  postApi(data: unknown) {
    return request({
      url: `${subPath}/xxxxxxxxxxxx`,
      method: 'POST',
      data,
    });
  },
  getApi(data: unknown) {
    return request({
      url: `${subPath}/xxxxxxxxxxxxxxxxxx`,
      method: 'GET',
      data,
    });
  },
};
