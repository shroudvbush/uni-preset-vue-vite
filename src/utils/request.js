/**
 * API请求工具函数
 */

import { baseURL } from '@/config';

const request = {
  config: {
    baseURL: baseURL,
    header: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    timeout: 60000,
    dataType: 'json'
  },

  interceptor: {
    request: (config) => {
      // 获取token
      const token = uni.getStorageSync('token');
      if (token) {
        config.header['Authorization'] = `Bearer ${token}`;
      }
      
      // 处理URL
      if (!config.url.startsWith('http')) {
        // 确保URL以/api开头
        const path = config.url.replace(/^\/+/, '');
        config.url = `${config.baseURL}/api/${path}`;
      }
      
      // 处理请求数据
      if (config.data && typeof config.data === 'object') {
        if (!(config.data instanceof FormData)) {
          Object.keys(config.data).forEach(key => {
            if (config.data[key] === undefined || config.data[key] === null) {
              delete config.data[key];
            }
          });
        }
      }
      
      console.log('Request URL:', config.url);
      console.log('Request Data:', config.data);
      
      return config;
    },
    response: (response) => {
      console.log('Response:', response);
      
      if (!response.data) {
        return Promise.reject(new Error('响应数据为空'));
      }

      const { data } = response;
      
      // 统一处理错误
      if (data.code !== 0) {
        // 处理401未授权错误
        if (data.code === 401) {
          uni.removeStorageSync('token');
          uni.showToast({
            title: '请重新登录',
            icon: 'none',
            duration: 2000
          });
          // 跳转到登录页
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/login/index'
            });
          }, 1500);
        } else {
          uni.showToast({
            title: data.message || '请求失败',
            icon: 'none',
            duration: 2000
          });
        }
        return Promise.reject(data);
      }
      
      return data.data;
    }
  },

  request(options = {}) {
    // 合并默认配置
    options.baseURL = options.baseURL || this.config.baseURL;
    options.dataType = options.dataType || this.config.dataType;
    options.timeout = options.timeout || this.config.timeout;
    options.header = { ...this.config.header, ...(options.header || {}) };
    options.method = options.method || 'GET';

    // 执行请求拦截
    options = this.interceptor.request(options);

    return new Promise((resolve, reject) => {
      options.success = (res) => {
        try {
          resolve(this.interceptor.response(res));
        } catch (error) {
          reject(error);
        }
      };

      options.fail = (err) => {
        console.error('Request failed:', err);
        uni.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 2000
        });
        reject(err);
      };

      uni.request(options);
    });
  },

  get(url, data = {}, options = {}) {
    return this.request({
      ...options,
      url,
      data,
      method: 'GET'
    });
  },

  post(url, data = {}, options = {}) {
    return this.request({
      ...options,
      url,
      data,
      method: 'POST'
    });
  },

  put(url, data = {}, options = {}) {
    return this.request({
      ...options,
      url,
      data,
      method: 'PUT'
    });
  },

  delete(url, data = {}, options = {}) {
    return this.request({
      ...options,
      url,
      data,
      method: 'DELETE'
    });
  },

  upload(url, filePath, name = 'file', formData = {}, options = {}) {
    const token = uni.getStorageSync('token');
    const header = token ? { 'Authorization': `Bearer ${token}` } : {};
    
    // 处理上传URL
    if (!url.startsWith('http')) {
      url = `${this.config.baseURL}/api/${url.replace(/^\/+/, '')}`;
    }
    
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url,
        filePath,
        name,
        formData,
        header,
        success: (res) => {
          try {
            if (typeof res.data === 'string') {
              res.data = JSON.parse(res.data);
            }
            
            if (res.data.code === 0) {
              resolve(res.data.data);
            } else {
              const error = new Error(res.data.message || '上传失败');
              error.code = res.data.code;
              error.data = res.data;
              
              uni.showToast({
                title: error.message,
                icon: 'none',
                duration: 2000
              });
              
              reject(error);
            }
          } catch (error) {
            reject(new Error('解析响应数据失败'));
          }
        },
        fail: (error) => {
          console.error('Upload failed:', error);
          uni.showToast({
            title: '网络异常，请稍后重试',
            icon: 'none',
            duration: 2000
          });
          reject(new Error('网络异常，请稍后重试'));
        }
      });
    });
  }
};

export default request; 