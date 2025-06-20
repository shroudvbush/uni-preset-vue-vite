import { 
  loginByWechat, 
  loginByQQ, 
  loginByAlipay, 
  loginByApple,
  getAuthCode,
  getUserInfo,
  bindThirdParty,
  unbindThirdParty,
  getBoundAccounts
} from '@/api/auth.js'

// 第三方登录提供者配置
const PROVIDERS = {
  WECHAT: 'weixin',
  QQ: 'qq', 
  ALIPAY: 'alipay',
  APPLE: 'apple'
}

// 检查平台是否支持第三方登录
export const checkPlatformSupport = (provider) => {
  const platform = uni.getSystemInfoSync().platform
  const systemType = uni.getSystemInfoSync().system
  
  switch (provider) {
    case PROVIDERS.WECHAT:
      // 微信登录支持：微信小程序、H5、App
      return true
    case PROVIDERS.QQ:
      // QQ登录支持：QQ小程序、H5、App
      return true
    case PROVIDERS.ALIPAY:
      // 支付宝登录支持：支付宝小程序、H5、App
      return true
    case PROVIDERS.APPLE:
      // 苹果登录仅支持iOS
      return platform === 'ios' && systemType.includes('iOS')
    default:
      return false
  }
}

// 微信登录
export const wechatLogin = async () => {
  try {
    // 检查是否支持微信登录
    if (!checkPlatformSupport(PROVIDERS.WECHAT)) {
      throw new Error('当前平台不支持微信登录')
    }
    
    // 获取微信授权码
    const code = await getAuthCode(PROVIDERS.WECHAT)
    
    // 获取用户信息
    const userInfo = await getUserInfo(PROVIDERS.WECHAT)
    
    // 调用后端接口进行登录
    const result = await loginByWechat({
      code,
      userInfo
    })
    
    return result
  } catch (error) {
    console.error('微信登录失败:', error)
    throw error
  }
}

// QQ登录
export const qqLogin = async () => {
  try {
    if (!checkPlatformSupport(PROVIDERS.QQ)) {
      throw new Error('当前平台不支持QQ登录')
    }
    
    const code = await getAuthCode(PROVIDERS.QQ)
    const userInfo = await getUserInfo(PROVIDERS.QQ)
    
    const result = await loginByQQ({
      code,
      userInfo
    })
    
    return result
  } catch (error) {
    console.error('QQ登录失败:', error)
    throw error
  }
}

// 支付宝登录
export const alipayLogin = async () => {
  try {
    if (!checkPlatformSupport(PROVIDERS.ALIPAY)) {
      throw new Error('当前平台不支持支付宝登录')
    }
    
    const code = await getAuthCode(PROVIDERS.ALIPAY)
    const userInfo = await getUserInfo(PROVIDERS.ALIPAY)
    
    const result = await loginByAlipay({
      code,
      userInfo
    })
    
    return result
  } catch (error) {
    console.error('支付宝登录失败:', error)
    throw error
  }
}

// 苹果登录
export const appleLogin = async () => {
  try {
    if (!checkPlatformSupport(PROVIDERS.APPLE)) {
      throw new Error('当前平台不支持苹果登录')
    }
    
    const code = await getAuthCode(PROVIDERS.APPLE)
    const userInfo = await getUserInfo(PROVIDERS.APPLE)
    
    const result = await loginByApple({
      code,
      userInfo
    })
    
    return result
  } catch (error) {
    console.error('苹果登录失败:', error)
    throw error
  }
}

// 通用第三方登录方法
export const thirdPartyLogin = async (provider) => {
  switch (provider) {
    case PROVIDERS.WECHAT:
      return await wechatLogin()
    case PROVIDERS.QQ:
      return await qqLogin()
    case PROVIDERS.ALIPAY:
      return await alipayLogin()
    case PROVIDERS.APPLE:
      return await appleLogin()
    default:
      throw new Error('不支持的登录方式')
  }
}

// 绑定第三方账号
export const bindAccount = async (provider, userInfo) => {
  try {
    const result = await bindThirdParty({
      provider,
      userInfo
    })
    return result
  } catch (error) {
    console.error('绑定账号失败:', error)
    throw error
  }
}

// 解绑第三方账号
export const unbindAccount = async (provider) => {
  try {
    const result = await unbindThirdParty(provider)
    return result
  } catch (error) {
    console.error('解绑账号失败:', error)
    throw error
  }
}

// 获取已绑定的账号列表
export const getBoundAccountList = async () => {
  try {
    const result = await getBoundAccounts()
    return result
  } catch (error) {
    console.error('获取绑定账号失败:', error)
    throw error
  }
}

// 检查是否已绑定某个第三方账号
export const isAccountBound = async (provider) => {
  try {
    const accounts = await getBoundAccountList()
    return accounts.some(account => account.provider === provider)
  } catch (error) {
    console.error('检查绑定状态失败:', error)
    return false
  }
}

// 保存登录状态
export const saveLoginState = (userInfo, token) => {
  try {
    uni.setStorageSync('userInfo', userInfo)
    uni.setStorageSync('token', token)
    uni.setStorageSync('loginTime', Date.now())
  } catch (error) {
    console.error('保存登录状态失败:', error)
  }
}

// 清除登录状态
export const clearLoginState = () => {
  try {
    uni.removeStorageSync('userInfo')
    uni.removeStorageSync('token')
    uni.removeStorageSync('loginTime')
  } catch (error) {
    console.error('清除登录状态失败:', error)
  }
}

// 获取登录状态
export const getLoginState = () => {
  try {
    const userInfo = uni.getStorageSync('userInfo')
    const token = uni.getStorageSync('token')
    const loginTime = uni.getStorageSync('loginTime')
    
    return {
      userInfo,
      token,
      loginTime,
      isLoggedIn: !!(userInfo && token)
    }
  } catch (error) {
    console.error('获取登录状态失败:', error)
    return {
      userInfo: null,
      token: null,
      loginTime: null,
      isLoggedIn: false
    }
  }
}

// 检查token是否过期
export const isTokenExpired = () => {
  try {
    const loginTime = uni.getStorageSync('loginTime')
    if (!loginTime) return true
    
    // 假设token有效期为7天
    const expireTime = 7 * 24 * 60 * 60 * 1000
    return Date.now() - loginTime > expireTime
  } catch (error) {
    console.error('检查token过期失败:', error)
    return true
  }
} 