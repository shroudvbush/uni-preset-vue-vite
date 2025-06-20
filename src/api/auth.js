import request from '@/utils/request.js'

// 基础登录接口
export const login = (data) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}

// 手机号验证码登录
export const loginByPhone = (data) => {
  return request({
    url: '/auth/login/phone',
    method: 'POST',
    data
  })
}

// 微信登录
export const loginByWechat = (data) => {
  return request({
    url: '/auth/login/wechat',
    method: 'POST',
    data
  })
}

// QQ登录
export const loginByQQ = (data) => {
  return request({
    url: '/auth/login/qq',
    method: 'POST',
    data
  })
}

// 支付宝登录
export const loginByAlipay = (data) => {
  return request({
    url: '/auth/login/alipay',
    method: 'POST',
    data
  })
}

// 苹果登录（iOS）
export const loginByApple = (data) => {
  return request({
    url: '/auth/login/apple',
    method: 'POST',
    data
  })
}

// 获取第三方登录授权码
export const getAuthCode = (provider) => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: provider, // 'weixin', 'qq', 'alipay', 'apple'
      success: (res) => {
        resolve(res.code)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 获取用户信息
export const getUserInfo = (provider) => {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      provider: provider,
      success: (res) => {
        resolve(res.userInfo)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 绑定第三方账号
export const bindThirdParty = (data) => {
  return request({
    url: '/auth/bind',
    method: 'POST',
    data
  })
}

// 解绑第三方账号
export const unbindThirdParty = (provider) => {
  return request({
    url: '/auth/unbind',
    method: 'POST',
    data: { provider }
  })
}

// 获取已绑定的第三方账号列表
export const getBoundAccounts = () => {
  return request({
    url: '/auth/bound-accounts',
    method: 'GET'
  })
}

// 刷新token
export const refreshToken = (refreshToken) => {
  return request({
    url: '/auth/refresh',
    method: 'POST',
    data: { refreshToken }
  })
}

// 退出登录
export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'POST'
  })
} 