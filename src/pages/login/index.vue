<template>
  <view class="login-container">
    <view class="login-card">
      <view class="logo-area">
        <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
        <text class="app-name">医影随护AI平台</text>
      </view>
      
      <view class="form-area">
        <view class="input-group" :class="{'input-active-group': activeField === 'username'}">
          <view class="icon-box user-icon"></view>
          <input 
            class="input-field" 
            type="text" 
            placeholder="请输入账号" 
            placeholder-class="placeholder"
            v-model="username"
            @focus="handleFocus('username')"
            @blur="handleBlur('username')"
          />
        </view>
        
        <view class="input-group" :class="{'input-active-group': activeField === 'password'}">
          <view class="icon-box lock-icon"></view>
          <input 
            class="input-field" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="请输入密码" 
            placeholder-class="placeholder"
            v-model="password"
            @focus="handleFocus('password')"
            @blur="handleBlur('password')"
          />
          <view 
            class="icon-box eye-icon" 
            :class="showPassword ? 'eye-open' : 'eye-close'"
            @click="togglePasswordVisibility"
          ></view>
        </view>
        
        <view class="remember-forgot">
          <label class="checkbox-wrapper">
            <checkbox :checked="rememberMe" @click="rememberMe = !rememberMe" color="#6C63FF" style="transform:scale(0.7)" />
            <text>记住账号</text>
          </label>
          <text class="forgot-password" @click="handleForgotPassword">忘记密码？</text>
        </view>
      </view>
      
      <view class="button-area">
        <button 
          class="login-button" 
          :class="{'button-active': isButtonActive, 'button-valid': isFormValid}" 
          :disabled="!isFormValid" 
          @click="handleLogin"
          @touchstart="isButtonActive = true"
          @touchend="isButtonActive = false"
        >
          登录
        </button>
      </view>
      
      <view class="footer">
        <text>还没有账号？</text>
        <text class="register-link" @click="handleRegister">立即注册</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      rememberMe: false,
      activeField: '',
      isButtonActive: false
    }
  },
  computed: {
    isFormValid() {
      return this.username.length > 0 && this.password.length > 0;
    }
  },
  methods: {
    handleFocus(field) {
      this.activeField = field;
    },
    handleBlur(field) {
      this.activeField = '';
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleLogin() {
      if (!this.isFormValid) return;
      
      uni.showLoading({
        title: '登录中...'
      });
      
      // 模拟登录请求
      setTimeout(() => {
        uni.hideLoading();
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        });
        
        // 登录成功后跳转到首页tab
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
      }, 2000);
    },
    handleForgotPassword() {
      uni.showToast({
        title: '暂未开放此功能',
        icon: 'none'
      });
    },
    handleRegister() {
      uni.showToast({
        title: '暂未开放注册功能',
        icon: 'none'
      });
    }
  }
}
</script>

<style lang="scss">
.login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e6f3 100%);
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
}

.login-card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  padding: 40px 30px;
  position: relative;
  box-sizing: border-box;
}

.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.logo {
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
}

.app-name {
  font-size: 22px;
  font-weight: bold;
  color: #1e88e5;
  letter-spacing: 1px;
}

.form-area {
  margin-bottom: 30px;
  width: 100%;
}

.input-group {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #E0E0E0;
  padding: 12px 0;
  margin-bottom: 20px;
  transition: all 0.3s;
  width: 100%;
}

.input-active-group {
  border-bottom: 1px solid #6C63FF;
  
  .icon-box {
    color: #6C63FF;
    border-color: #6C63FF;
  }
}

.icon-box {
  width: 24px;
  height: 24px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
}

.user-icon:before {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid currentColor;
  display: block;
}

.user-icon:after {
  content: '';
  width: 14px;
  height: 8px;
  border-radius: 6px 6px 0 0;
  border: 2px solid currentColor;
  border-bottom: none;
  position: absolute;
  top: 16px;
}

.lock-icon:before {
  content: '';
  width: 14px;
  height: 10px;
  border: 2px solid currentColor;
  border-radius: 3px;
  display: block;
}

.lock-icon:after {
  content: '';
  width: 4px;
  height: 4px;
  background-color: currentColor;
  border-radius: 50%;
  position: absolute;
  bottom: 8px;
}

.eye-icon {
  width: 24px;
  height: 24px;
  position: relative;
  padding: 0 5px;
}

.eye-open:before {
  content: '';
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-radius: 50%;
  display: block;
  position: relative;
  left: 2px;
}

.eye-open:after {
  content: '';
  width: 4px;
  height: 4px;
  background-color: currentColor;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 10px;
}

.eye-close:before {
  content: '';
  width: 16px;
  height: 2px;
  background-color: currentColor;
  transform: rotate(45deg);
  display: block;
  position: absolute;
  top: 12px;
  left: 4px;
}

.eye-close:after {
  content: '';
  width: 16px;
  height: 2px;
  background-color: currentColor;
  transform: rotate(-45deg);
  display: block;
  position: absolute;
  top: 12px;
  left: 4px;
}

.input-field {
  flex: 1;
  margin: 0 10px;
  font-size: 16px;
  color: #333;
  height: 24px;
}

.placeholder {
  color: #999;
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  width: 100%;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
}

.forgot-password {
  color: #6C63FF;
}

.button-area {
  margin-bottom: 20px;
  margin-top: 40px;
  width: 100%;
}

.login-button {
  width: 100%;
  height: 50px;
  background: #CCCCCC;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;
  letter-spacing: 2px;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}

.button-valid {
  background: #6C63FF;
  box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
}

.button-active {
  transform: scale(0.98);
  background: #5A52D5;
}

.footer {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #666;
  margin-top: 20px;
  width: 100%;
}

.register-link {
  color: #6C63FF;
  margin-left: 4px;
}
</style> 