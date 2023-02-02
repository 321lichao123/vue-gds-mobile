import axios from 'axios';
import QS from 'qs';
import { Toast } from 'vant';
import store from '@/store'
import router from '@/router'


if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://117.50.163.32:8080/';
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = 'https://www.ceshi.com';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://117.50.163.32:8080/';
}

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use(
  config => {
    const token = store.state.token;
    token && (config.headers.token = token);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  response => {
    console.log(response, '---response');
    if (response.data.status === 1000) {
        return Promise.resolve(response);
    } else {
        console.log(1111);
        return Promise.reject(response);
    }
  },
  error => {
    console.log(error.data.status, '-----error.data.status');
    if (error.data.status) {
      switch (error.data.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 1014:
          router.replace({
              path: '/login',
              query: { 
                redirect: router.currentRoute.fullPath
              }
          });
        break;
        case 1017:
          Toast({
            message: '登录过期，请重新登录',
            duration: 1000,
            forbidClick: true
          });
          // 清除数据
          localStorage.removeItem('token');
          localStorage.removeItem('uid');
          localStorage.removeItem('user-info');
          // store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
          setTimeout(() => {
            router.replace({
                path: '/login',
                query: { 
                  redirect: router.currentRoute.fullPath 
                }
            });
          }, 1000);
          break; 

        // 404请求不存在
        case 404:
          Toast({
              message: '网络请求不存在',
              duration: 1500,
              forbidClick: true
          });
        break;
        // 其他错误，直接抛出错误提示
        default:
          Toast({
            message: error.data.desc || '系统错误',
            duration: 1500,
            forbidClick: true
          });
        break;
      }
      return Promise.reject(error.data);
    }
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, QS.stringify(params)).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data)
    })
  });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data)
    })
  });
}