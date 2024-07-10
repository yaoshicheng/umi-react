import axios from 'axios';
import { Toast } from 'antd-mobile';
import { getToken } from '@/utils/auth';
import SettingMer from '@/utils/settingMer';
import { isPhone } from '@/utils/wechat';

const service = axios.create({
  baseURL: SettingMer.apiBaseURL,
  timeout: 60000, // 过期时间
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // 发送请求之前做的
    const token = getToken();
    if (token) {
      config.headers['Authori-zation'] = token;
    }
    let jsonData = config.data;
    if (jsonData&&jsonData.page) {
      // 提取page和limit的值,集中处理query参数
      let page = jsonData.page;
      let limit = jsonData.limit;
      config.url=`${config.url}?page=${page}&limit=${limit}`
      delete config.data.page
      delete config.data.limit
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.code === 401) {
      // to re-login
      Toast.show({
        content: '无效的会话，或者登录已过期，请重新登录。',
      })
      if (window.location.pathname !== '/login') location.href = '/login';
    } else if (res.code === 403) {
      Toast.show({
        content: '没有权限访问。',
      })
    }
    if (res.code !== 200 && res.code !== 401) {
      if (isPhone()) {
        //移动端
        return Promise.reject(res || 'Error');
      }
      Toast.show({
        content: res.message || 'api Error',
      })
      
      return Promise.reject();
    } else {
      return res.data;
    }
  },
  (error) => {
    Toast.show({
      content: error.message || 'api Error',
    })

    return Promise.reject(error);
  },
);

export default service;
