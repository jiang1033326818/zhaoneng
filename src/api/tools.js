/**
 * zh
 */
import axios from 'axios';
import {message} from "antd/lib/index";
axios.defaults.withCredentials=true;

// 配置API接口地址
//  var basepath = window.location.origin
console.log(process.env.APP_TYPE);
const basepath = process.env.APP_TYPE === 'test' ? 'https://www.zhaoenergy.cn/' : 'https://www.powerchainshop.com/';


// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}


/*  接口处理函数 */

function apiAxios (method,url, headers, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url:  url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: basepath,
    headers: {
      'Authorization': sessionStorage.obj,
      ...headers
    }
    // ajax默认不携带cookie或者session，需要这样设置
    // withCredentials: false,
  })
  .then((res) => {
    console.log(res);
    if (res.data.code === 0 ) {
      success(res.data)
    } else {
      failure(res.data)
      console.log('error: ' + JSON.stringify(res.data))
    }
  })
  .catch((err)=> {
    // failure(err)
    //   if(err.response.data!=="undefined"){
    //       message.warning(err.response.data.content[0].defaultMessage);
    //
    //   }
    // console.log(err.response.data)
    // message.warning(err.response.data.content[0].defaultMessage);
    if (err.response && err.response.status === 401) {
      window.location.href = '/login';
    }
  })
}

// 返回调用接口
export default {
  get: function (url, headers, params, success, failure) {
    return apiAxios('GET', url, headers, params, success, failure)
  },
  post: function (url, headers, params, success, failure) {
    return apiAxios('POST', url, headers, params, success, failure)
  },
  put: function (url, headers, params, success, failure) {
    return apiAxios('PUT', url, headers, params, success, failure)
  },
  delete: function (url, headers, params, success, failure) {
    return apiAxios('DELETE', url, headers, params, success, failure)
  },
  basepath
}