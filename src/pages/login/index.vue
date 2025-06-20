<template>
  <view class="login-container">
    <!-- 顶部Logo区域 -->
    <view class="logo-section">
      <image src="/static/logo.png" class="logo" mode="aspectFit" />
      <text class="app-name">医影随护</text>
      <text class="app-slogan">智能健康管理，贴心医疗陪伴</text>
    </view>
    
    <!-- 登录表单 -->
    <view class="login-form">
      <!-- 登录方式切换 -->
      <view class="login-tabs">
        <view 
          class="tab-item" 
          :class="{ active: loginType === 'phone' }"
          @click="switchLoginType('phone')"
        >
          <text>手机号登录</text>
        </view>
        <view 
          class="tab-item" 
          :class="{ active: loginType === 'account' }"
          @click="switchLoginType('account')"
        >
          <text>账号密码登录</text>
        </view>
      </view>
      
      <!-- 手机号登录 -->
      <view v-if="loginType === 'phone'" class="phone-login">
        <view class="form-item">
          <view class="input-wrapper">
            <text class="input-icon">📱</text>
            <input 
              class="form-input"
              v-model="phoneForm.phone"
              placeholder="请输入手机号"
              type="number"
              maxlength="11"
            />
          </view>
        </view>
        
        <view class="form-item">
          <view class="input-wrapper">
            <text class="input-icon">🔐</text>
            <input 
              class="form-input"
              v-model="phoneForm.code"
              placeholder="请输入验证码"
              type="number"
              maxlength="6"
            />
            <button 
              class="code-btn" 
              :disabled="countdown > 0"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
            </button>
          </view>
        </view>
      </view>
      
      <!-- 账号密码登录 -->
      <view v-if="loginType === 'account'" class="account-login">
        <view class="form-item">
          <view class="input-wrapper">
            <text class="input-icon">👤</text>
            <input 
              class="form-input"
              v-model="accountForm.username"
              placeholder="请输入用户名/手机号"
            />
          </view>
        </view>
        
        <view class="form-item">
          <view class="input-wrapper">
            <text class="input-icon">🔒</text>
            <input 
              class="form-input"
              v-model="accountForm.password"
              placeholder="请输入密码"
              :type="showPassword ? 'text' : 'password'"
            />
            <text 
              class="password-toggle"
              @click="togglePassword"
            >
              {{ showPassword ? '👁️' : '🙈' }}
            </text>
          </view>
        </view>
      </view>
      
      <!-- 登录按钮 -->
      <button 
        class="login-btn" 
        :disabled="!isFormValid"
        @click="handleLogin"
      >
        <text>登录</text>
      </button>
      <button 
        class="guest-btn"
        @click="guestLogin"
        type="button"
      >
        <text>免注册体验</text>
      </button>
      
      <!-- 其他选项 -->
      <view class="other-options">
        <view class="forgot-password" @click="forgotPassword">忘记密码？</view>
        <view class="register-link" @click="goToRegister">注册账号</view>
      </view>
    </view>
    
    <!-- 第三方登录 -->
    <view class="third-party-login">
      <view class="divider">
        <view class="divider-line"></view>
        <text class="divider-text">其他登录方式</text>
        <view class="divider-line"></view>
      </view>
      
      <view class="third-party-buttons">
        <!-- 微信登录 -->
        <view 
          class="third-party-btn wechat-btn"
          @click="handleWechatLogin"
          v-if="isWechatSupported"
        >
          <view class="btn-icon">💬</view>
          <view class="btn-text">微信登录</view>
        </view>
        
        <!-- QQ登录 -->
        <view 
          class="third-party-btn qq-btn"
          @click="handleQQLogin"
          v-if="isQQSupported"
        >
          <view class="btn-icon">🐧</view>
          <view class="btn-text">QQ登录</view>
        </view>
        
        <!-- 苹果登录 -->
        <view 
          class="third-party-btn apple-btn"
          @click="handleAppleLogin"
          v-if="isAppleSupported"
        >
          <view class="btn-icon">🍎</view>
          <view class="btn-text">苹果登录</view>
        </view>
      </view>
    </view>
    
    <!-- 用户协议 -->
    <view class="agreement">
      <text class="agreement-text">
        登录即表示同意
        <text class="agreement-link" @click="viewAgreement">《用户协议》</text>
        和
        <text class="agreement-link" @click="viewPrivacy">《隐私政策》</text>
      </text>
    </view>
  </view>
</template>

<script>
import { loginByPhone, login } from '@/api/auth.js'
import { 
  wechatLogin, 
  qqLogin, 
  alipayLogin, 
  appleLogin,
  checkPlatformSupport,
  saveLoginState
} from '@/utils/auth.js'

export default {
  data() {
    return {
      loginType: 'phone', // 'phone' | 'account'
      phoneForm: {
        phone: '',
        code: ''
      },
      accountForm: {
        username: '',
        password: ''
      },
      showPassword: false,
      countdown: 0,
      isWechatSupported: false,
      isQQSupported: false,
      isAlipaySupported: false,
      isAppleSupported: false
    }
  },
  computed: {
    isFormValid() {
      if (this.loginType === 'phone') {
        return this.phoneForm.phone.length === 11 && this.phoneForm.code.length === 6
      } else {
        return this.accountForm.username && this.accountForm.password.length >= 6
      }
    }
  },
  onLoad() {
    this.checkPlatformSupport()
  },
  methods: {
    // 检查平台支持的第三方登录
    checkPlatformSupport() {
      this.isWechatSupported = checkPlatformSupport('weixin')
      this.isQQSupported = checkPlatformSupport('qq')
      this.isAlipaySupported = checkPlatformSupport('alipay')
      this.isAppleSupported = checkPlatformSupport('apple')
    },
    
    // 切换登录方式
    switchLoginType(type) {
      this.loginType = type
    },
    
    // 切换密码显示
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    
    // 发送验证码
    async sendCode() {
      if (!this.phoneForm.phone || this.phoneForm.phone.length !== 11) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
        return
      }
      
      try {
        uni.showLoading({
          title: '发送中...'
        })
        
        // 这里应该调用发送验证码的API
        // await sendVerificationCode(this.phoneForm.phone)
        
        // 模拟发送成功
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({
            title: '验证码已发送',
            icon: 'success'
          })
          
          // 开始倒计时
          this.countdown = 60
          const timer = setInterval(() => {
            this.countdown--
            if (this.countdown <= 0) {
              clearInterval(timer)
            }
          }, 1000)
        }, 1000)
        
      } catch (error) {
        uni.hideLoading()
        uni.showToast({
          title: '发送失败',
          icon: 'none'
        })
      }
    },
    
    // 处理登录
    async handleLogin() {
      if (!this.isFormValid) {
        uni.showToast({
          title: '请完善登录信息',
          icon: 'none'
        })
        return
      }
      
      try {
        uni.showLoading({
          title: '登录中...'
        })
        
        let result
        if (this.loginType === 'phone') {
          result = await loginByPhone(this.phoneForm)
        } else {
          result = await login(this.accountForm)
        }
        
        if (result.code === 0) {
          // 保存登录状态
          saveLoginState(result.data.userInfo, result.data.token)
          
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          })
          
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/index/index'
            })
          }, 1500)
        } else {
          uni.showToast({
            title: result.message || '登录失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('登录失败:', error)
        uni.showToast({
          title: '登录失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    },
    
    // 微信登录
    async handleWechatLogin() {
      console.log('点击微信登录');
      try {
        uni.showLoading({
          title: '登录中...'
        })
        const result = await wechatLogin()
        if (result.code === 0) {
          saveLoginState(result.data.userInfo, result.data.token)
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          })
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/index/index'
            })
          }, 1500)
        }
      } catch (error) {
        uni.showToast({
          title: '微信登录失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    },
    
    // QQ登录
    async handleQQLogin() {
      console.log('点击QQ登录');
      try {
        uni.showLoading({
          title: '登录中...'
        })
        const result = await qqLogin()
        if (result.code === 0) {
          saveLoginState(result.data.userInfo, result.data.token)
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          })
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/index/index'
            })
          }, 1500)
        }
      } catch (error) {
        uni.showToast({
          title: 'QQ登录失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    },
    
    // 苹果登录
    async handleAppleLogin() {
      try {
        uni.showLoading({
          title: '登录中...'
        })
        
        const result = await appleLogin()
        
        if (result.code === 0) {
          saveLoginState(result.data.userInfo, result.data.token)
          
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          })
          
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/index/index'
            })
          }, 1500)
        }
      } catch (error) {
        uni.showToast({
          title: '苹果登录失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    },
    
    // 忘记密码
    forgotPassword() {
      uni.navigateTo({
        url: '/pages/login/forgot-password'
      })
    },
    
    // 注册账号
    goToRegister() {
      // 检查注册页面是否存在，若不存在则提示用户
      uni.navigateTo({
        url: '/pages/login/register'
      });
    },
    
    // 查看用户协议
    viewAgreement() {
      uni.navigateTo({
        url: '/pages/common/agreement'
      })
    },
    
    // 查看隐私政策
    viewPrivacy() {
      uni.navigateTo({
        url: '/pages/common/privacy'
      })
    },
    
    guestLogin() {
      // 免注册模拟登录，直接跳转首页并保存游客身份
      const guestUser = {
        id: 'guest',
        username: '游客',
        role: 'guest'
      }
      const guestToken = 'guest-token';
      // 保存游客登录状态
      if (typeof saveLoginState === 'function') {
        saveLoginState(guestUser, guestToken);
      } else {
        uni.setStorageSync('userInfo', guestUser);
        uni.setStorageSync('token', guestToken);
      }
      uni.showToast({ title: '欢迎体验', icon: 'success' });
      setTimeout(() => {
        uni.switchTab({ url: '/pages/index/index' });
      }, 800);
    }
  }
}
</script>

<style>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 30px;
  box-sizing: border-box;
}

.logo-section {
  text-align: center;
  margin-bottom: 50px;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.app-name {
  font-size: 28px;
  font-weight: bold;
  color: white;
  display: block;
  margin-bottom: 10px;
}

.app-slogan {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.login-form {
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.login-tabs {
  display: flex;
  margin-bottom: 30px;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 4px;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  border-radius: 8px;
  font-size: 16px;
  color: #666;
  transition: all 0.3s ease;
}

.tab-item.active {
  background-color: #6C63FF;
  color: white;
}

.form-item {
  margin-bottom: 20px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 0 15px;
  background-color: #f8f9fa;
}

.input-icon {
  font-size: 18px;
  margin-right: 10px;
}

.form-input {
  flex: 1;
  height: 50px;
  font-size: 16px;
  color: #333;
  border: none;
  background: transparent;
}

.code-btn {
  background-color: #6C63FF;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 15px;
  font-size: 14px;
  margin-left: 10px;
}

.code-btn:disabled {
  background-color: #ccc;
}

.password-toggle {
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
}

.login-btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #6C63FF 0%, #8B7CF6 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.login-btn:disabled {
  background: #ccc;
}

.guest-btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #aaa 0%, #ccc 100%);
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 10px;
}

.other-options {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.forgot-password, .register-link {
  color: #6C63FF;
  cursor: pointer;
}

.third-party-login {
  margin-bottom: 30px;
}

.divider {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
}

.divider-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin: 0 15px;
}

.third-party-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.third-party-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.third-party-btn:active {
  transform: scale(0.95);
}

.btn-icon {
  font-size: 24px;
  margin-bottom: 5px;
}

.btn-text {
  font-size: 12px;
  color: white;
}

.wechat-btn {
  background-color: rgba(7, 193, 96, 0.2);
}

.qq-btn {
  background-color: rgba(0, 122, 255, 0.2);
}

.alipay-btn {
  background-color: rgba(0, 122, 255, 0.2);
}

.apple-btn {
  background-color: rgba(0, 0, 0, 0.2);
}

.agreement {
  text-align: center;
}

.agreement-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.agreement-link {
  color: white;
  text-decoration: underline;
}
</style> 