<template>
  <view class="register-container">
    <view class="register-title">注册账号</view>
    <view>
      <view class="form-item">
        <input v-model="form.username" placeholder="请输入用户名" />
      </view>
      <view class="form-item">
        <input v-model="form.password" type="password" placeholder="请输入密码" />
      </view>
      <view class="form-item">
        <input v-model="form.confirmPassword" type="password" placeholder="请确认密码" />
      </view>
      <view class="form-item">
        <input v-model="form.phoneNumber" placeholder="请输入手机号" maxlength="11" />
      </view>
      <view class="form-item code-item">
        <input v-model="form.verificationCode" placeholder="请输入验证码" maxlength="6" />
        <button class="code-btn" :disabled="countdown > 0" @click="sendCode" type="button">
          {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
        </button>
      </view>
      <view class="form-item">
        <input v-model="form.email" placeholder="请输入邮箱（可选）" />
      </view>
      <button class="register-btn" @click="handleRegister" type="button">注册</button>
    </view>
    <view class="login-link" @click="goToLogin">已有账号？去登录</view>
  </view>
</template>

<script>
import { register, sendVerificationCode } from '@/api/user'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        verificationCode: '',
        email: ''
      },
      countdown: 0,
      loading: false
    }
  },
  methods: {
    async sendCode() {
      if (!this.form.phoneNumber || this.form.phoneNumber.length !== 11) {
        return uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
      }
      try {
        await sendVerificationCode(this.form.phoneNumber, 'register')
        uni.showToast({ title: '验证码已发送', icon: 'success' })
        this.countdown = 60
        const timer = setInterval(() => {
          this.countdown--
          if (this.countdown <= 0) clearInterval(timer)
        }, 1000)
      } catch (e) {
        uni.showToast({ title: e.message || '发送失败', icon: 'none' })
      }
    },
    async handleRegister() {
      console.log('点击注册');
      if (!this.form.username || !this.form.password || !this.form.confirmPassword || !this.form.phoneNumber || !this.form.verificationCode) {
        return uni.showToast({ title: '请填写完整信息', icon: 'none' })
      }
      if (this.form.password !== this.form.confirmPassword) {
        return uni.showToast({ title: '两次密码不一致', icon: 'none' })
      }
      this.loading = true
      try {
        await register({
          username: this.form.username,
          password: this.form.password,
          phoneNumber: this.form.phoneNumber,
          verificationCode: this.form.verificationCode,
          email: this.form.email
        })
        uni.showToast({ title: '注册成功', icon: 'success' })
        setTimeout(() => {
          uni.redirectTo({ url: '/pages/login/index' })
        }, 1000)
      } catch (e) {
        uni.showToast({ title: e.message || '注册失败', icon: 'none' })
      } finally {
        this.loading = false
      }
    },
    goToLogin() {
      uni.redirectTo({ url: '/pages/login/index' })
    }
  }
}
</script>

<style scoped>
.register-container {
  padding: 40rpx;
}
.register-title {
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
  text-align: center;
}
.form-item {
  margin-bottom: 32rpx;
}
input {
  width: 100%;
  padding: 24rpx;
  border: 1px solid #eee;
  border-radius: 8rpx;
  font-size: 32rpx;
}
.register-btn {
  width: 100%;
  background: #007aff;
  color: #fff;
  padding: 28rpx 0;
  border-radius: 8rpx;
  font-size: 36rpx;
  margin-top: 24rpx;
}
.login-link {
  margin-top: 32rpx;
  color: #007aff;
  text-align: center;
  font-size: 28rpx;
  cursor: pointer;
}
.code-item {
  display: flex;
  align-items: center;
}
.code-btn {
  margin-left: 16rpx;
  background: #f5f5f5;
  color: #007aff;
  border: none;
  padding: 0 24rpx;
  height: 64rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
}
</style> 