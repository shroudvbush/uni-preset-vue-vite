# 第三方登录实现指南

## 概述

本项目支持多种第三方登录方式，包括微信登录、QQ登录、支付宝登录和苹果登录。本文档详细说明如何配置和实现这些登录功能。

## 支持的登录方式

### 1. 微信登录
- **支持平台**: 微信小程序、H5、App
- **配置要求**: 需要在微信开放平台注册应用并获取AppID和AppSecret

### 2. QQ登录
- **支持平台**: QQ小程序、H5、App
- **配置要求**: 需要在QQ互联平台注册应用并获取AppID和AppKey

### 3. 支付宝登录
- **支持平台**: 支付宝小程序、H5、App
- **配置要求**: 需要在支付宝开放平台注册应用并获取AppID和私钥

### 4. 苹果登录
- **支持平台**: iOS App
- **配置要求**: 需要在Apple Developer后台配置Sign in with Apple

## 配置步骤

### 1. 微信登录配置

#### 1.1 微信开放平台配置
1. 登录[微信开放平台](https://open.weixin.qq.com/)
2. 创建应用并获取AppID和AppSecret
3. 配置授权回调域名

#### 1.2 项目配置
在 `manifest.json` 中配置微信登录：

```json
{
  "mp-weixin": {
    "appid": "你的微信AppID",
    "setting": {
      "urlCheck": false
    }
  },
  "app-plus": {
    "distribute": {
      "sdkConfigs": {
        "oauth": {
          "weixin": {
            "appid": "你的微信AppID",
            "UniversalLinks": "你的Universal Links"
          }
        }
      }
    }
  }
}
```

### 2. QQ登录配置

#### 2.1 QQ互联平台配置
1. 登录[QQ互联](https://connect.qq.com/)
2. 创建应用并获取AppID和AppKey
3. 配置授权回调域名

#### 2.2 项目配置
在 `manifest.json` 中配置QQ登录：

```json
{
  "mp-qq": {
    "appid": "你的QQ AppID"
  },
  "app-plus": {
    "distribute": {
      "sdkConfigs": {
        "oauth": {
          "qq": {
            "appid": "你的QQ AppID"
          }
        }
      }
    }
  }
}
```

### 3. 支付宝登录配置

#### 3.1 支付宝开放平台配置
1. 登录[支付宝开放平台](https://open.alipay.com/)
2. 创建应用并获取AppID
3. 配置授权回调域名

#### 3.2 项目配置
在 `manifest.json` 中配置支付宝登录：

```json
{
  "mp-alipay": {
    "appid": "你的支付宝AppID"
  },
  "app-plus": {
    "distribute": {
      "sdkConfigs": {
        "oauth": {
          "alipay": {
            "appid": "你的支付宝AppID"
          }
        }
      }
    }
  }
}
```

### 4. 苹果登录配置

#### 4.1 Apple Developer配置
1. 登录[Apple Developer](https://developer.apple.com/)
2. 在App ID中启用"Sign in with Apple"
3. 配置Associated Domains

#### 4.2 项目配置
在 `manifest.json` 中配置苹果登录：

```json
{
  "app-plus": {
    "distribute": {
      "sdkConfigs": {
        "oauth": {
          "apple": {
            "services": ["Sign in with Apple"]
          }
        }
      }
    }
  }
}
```

## 后端接口实现

### 1. 微信登录接口

```javascript
// 后端接口示例 (Node.js + Express)
app.post('/api/auth/login/wechat', async (req, res) => {
  try {
    const { code, userInfo } = req.body
    
    // 1. 通过code获取access_token
    const tokenResponse = await axios.get('https://api.weixin.qq.com/sns/oauth2/access_token', {
      params: {
        appid: process.env.WECHAT_APPID,
        secret: process.env.WECHAT_SECRET,
        code,
        grant_type: 'authorization_code'
      }
    })
    
    const { access_token, openid } = tokenResponse.data
    
    // 2. 获取用户信息
    const userResponse = await axios.get('https://api.weixin.qq.com/sns/userinfo', {
      params: {
        access_token,
        openid,
        lang: 'zh_CN'
      }
    })
    
    // 3. 查找或创建用户
    let user = await User.findOne({ wechatOpenId: openid })
    if (!user) {
      user = await User.create({
        wechatOpenId: openid,
        nickname: userResponse.data.nickname,
        avatar: userResponse.data.headimgurl,
        gender: userResponse.data.sex
      })
    }
    
    // 4. 生成JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    
    res.json({
      code: 0,
      message: '登录成功',
      data: {
        userInfo: user,
        token
      }
    })
  } catch (error) {
    res.status(500).json({
      code: 1,
      message: '登录失败',
      error: error.message
    })
  }
})
```

### 2. QQ登录接口

```javascript
app.post('/api/auth/login/qq', async (req, res) => {
  try {
    const { code, userInfo } = req.body
    
    // 1. 通过code获取access_token
    const tokenResponse = await axios.get('https://graph.qq.com/oauth2.0/token', {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.QQ_APPID,
        client_secret: process.env.QQ_APPKEY,
        code,
        redirect_uri: process.env.QQ_REDIRECT_URI
      }
    })
    
    const access_token = tokenResponse.data.split('&')[0].split('=')[1]
    
    // 2. 获取openid
    const openidResponse = await axios.get('https://graph.qq.com/oauth2.0/me', {
      params: { access_token }
    })
    
    const openid = openidResponse.data.match(/openid":"([^"]+)"/)[1]
    
    // 3. 获取用户信息
    const userResponse = await axios.get('https://graph.qq.com/user/get_user_info', {
      params: {
        access_token,
        oauth_consumer_key: process.env.QQ_APPID,
        openid
      }
    })
    
    // 4. 查找或创建用户
    let user = await User.findOne({ qqOpenId: openid })
    if (!user) {
      user = await User.create({
        qqOpenId: openid,
        nickname: userResponse.data.nickname,
        avatar: userResponse.data.figureurl_qq_1,
        gender: userResponse.data.gender
      })
    }
    
    // 5. 生成JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    
    res.json({
      code: 0,
      message: '登录成功',
      data: {
        userInfo: user,
        token
      }
    })
  } catch (error) {
    res.status(500).json({
      code: 1,
      message: '登录失败',
      error: error.message
    })
  }
})
```

## 前端使用示例

### 1. 基础使用

```javascript
import { wechatLogin, qqLogin, alipayLogin, appleLogin } from '@/utils/auth.js'

// 微信登录
const handleWechatLogin = async () => {
  try {
    const result = await wechatLogin()
    if (result.code === 0) {
      // 登录成功，保存用户信息
      saveLoginState(result.data.userInfo, result.data.token)
      uni.showToast({ title: '登录成功' })
    }
  } catch (error) {
    uni.showToast({ title: '登录失败', icon: 'none' })
  }
}
```

### 2. 检查平台支持

```javascript
import { checkPlatformSupport } from '@/utils/auth.js'

// 检查是否支持微信登录
const isWechatSupported = checkPlatformSupport('weixin')

// 检查是否支持苹果登录
const isAppleSupported = checkPlatformSupport('apple')
```

### 3. 绑定第三方账号

```javascript
import { bindAccount, unbindAccount } from '@/utils/auth.js'

// 绑定微信账号
const bindWechat = async () => {
  try {
    const result = await bindAccount('weixin', userInfo)
    if (result.code === 0) {
      uni.showToast({ title: '绑定成功' })
    }
  } catch (error) {
    uni.showToast({ title: '绑定失败', icon: 'none' })
  }
}

// 解绑微信账号
const unbindWechat = async () => {
  try {
    const result = await unbindAccount('weixin')
    if (result.code === 0) {
      uni.showToast({ title: '解绑成功' })
    }
  } catch (error) {
    uni.showToast({ title: '解绑失败', icon: 'none' })
  }
}
```

## 安全注意事项

### 1. 数据验证
- 始终在后端验证第三方登录的token和用户信息
- 不要完全信任前端传递的用户信息

### 2. 隐私保护
- 遵守相关平台的隐私政策
- 明确告知用户数据使用目的
- 提供用户撤销授权的选项

### 3. 错误处理
- 妥善处理登录失败的情况
- 提供友好的错误提示
- 记录登录日志便于问题排查

### 4. Token管理
- 使用HTTPS传输敏感信息
- 设置合理的token过期时间
- 实现token刷新机制

## 常见问题

### 1. 微信登录失败
- 检查AppID和AppSecret是否正确
- 确认授权回调域名配置
- 检查网络连接和防火墙设置

### 2. QQ登录失败
- 检查AppID和AppKey是否正确
- 确认授权回调域名配置
- 检查应用状态是否正常

### 3. 苹果登录失败
- 检查Apple Developer配置
- 确认Associated Domains配置
- 检查iOS版本是否支持

### 4. 跨平台兼容性
- 不同平台的登录流程可能略有差异
- 需要针对不同平台进行测试
- 考虑提供备用的登录方式

## 总结

第三方登录能够显著提升用户体验，减少注册门槛。在实现过程中需要注意安全性、隐私保护和错误处理。建议在正式上线前进行充分的测试，确保各种场景下都能正常工作。 