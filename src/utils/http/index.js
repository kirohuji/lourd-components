import axios from "axios";
import { findIndex } from "lodash";
// import qs from 'qs'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";

const config = {
  baseURL: "http://localhost:3000/api",
  timeout: 120 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};
const pending = new Map();
const excludeUrl = ["xxxx"]; // 需要排除的接口地址可以放里面
//  qs.stringify(config.params), qs.stringify(config.data)
const addPending = (config) => {
  const isInExcludeUrl =
    findIndex(excludeUrl, (o) => {
      return o.search(config.url) >= 0;
    }) >= 0;
  if (isInExcludeUrl) {
    return;
  }
  const url = [config.method, config.url].join("&");
  console.log(url);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel);
      }
    });
};
/**
 * 移除请求
 * @param {Object} config
 */
//  qs.stringify(config.params), qs.stringify(config.data)
const removePending = (config) => {
  const url = [config.method, config.url].join("&");
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};
const _axios = axios.create(config);

_axios.interceptors.request.use(
  (cfg) => {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    // const { token } = store.getters
    if (token) {
      cfg.headers.common["Authorization"] = token;
    }
    // cfg.headers.common['Authorization'] = localStorage.getItem('token')
    removePending(cfg); // 在请求开始前，对之前的请求做检查取消操作
    addPending(cfg); // 将当前请求添加到 pending 中
    return cfg;
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  (res) => {
    // Do something with response data
    removePending(res); // 在请求结束后，移除本次请求
    return res.data;
    // const { code } = res.data;
    // if (Number(code) === 200) {
    //   // debugger;
    //   localStorage.setItem("token", "Bearer " + res.headers.authorization);
    //   return res.data;
    // } else {
    //   const { message, msg } = res.data;
    //   // debugger
    //   if (Number(code) === 401) {
    //     // console.log('/调整')
    //     // Message({
    //     //   message: message || msg,
    //     //   type: 'error'
    //     // })

    //     // new DonMessage().error(message || msg)
    //     localStorage.removeItem("token");
    //     // router.go('/login')
    //     return;
    //   } else {
    //     return Promise.reject(message || msg);
    //   }
    // }
  },
  (err) => {
    // Do something with response error
    if (axios.isCancel(err)) {
      console.log("repeated request: " + err.message || err.msg);
    } else {
      // console.log('服务器开小差了，请刷新重试')
    }
    return Promise.reject(err);
  }
);
const $axios = _axios;
const api = _axios;
const $axiosAll = axios.all;
const $axiosSpread = axios.spread;
const $CancelToken = axios.CancelToken;
export { $axios, $axiosAll, $axiosSpread, $CancelToken, clearPending, api };
