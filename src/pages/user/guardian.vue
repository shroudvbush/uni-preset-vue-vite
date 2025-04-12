<template>
  <view class="container">
    <page-header title="监护人绑定"></page-header>
    
    <view class="content">
      <!-- 未绑定状态 -->
      <view v-if="!isBound">
        <view class="section">
          <text class="label">监护人联系方式</text>
          <input 
            class="input-field" 
            type="number" 
            placeholder="请输入监护人手机号" 
            v-model="phoneNumber"
            maxlength="11"
          />
        </view>

        <view class="action-button-area">
          <button class="bind-button" @click="bindGuardian" :disabled="!isValidPhone">绑定</button>
        </view>
        
        <view class="description">
          <text class="desc-text">说明：完成与监护人绑定后，便可以使用监护人视频通话功能。</text>
        </view>
      </view>
      
      <!-- 已绑定状态 -->
      <view v-else>
        <view class="bound-info">
          <text class="bound-title">※已绑定监护人</text>
          <view class="bound-phone">
            <text class="phone-text">{{ maskedPhoneNumber }}</text>
            <view class="delete-icon" @click="showUnbindConfirm">✕</view>
          </view>
        </view>
        
        <view class="description">
          <text class="desc-text">说明：完成与监护人绑定后，便可以使用监护人紧急呼叫功能。</text>
        </view>
      </view>
      
      <view class="toggle-section">
        <text class="toggle-label">健康数据共享</text>
        <switch 
          :checked="isDataShareEnabled" 
          @change="toggleDataShare" 
          color="#6C63FF"
          class="toggle-switch"
        />
      </view>
      
      <view class="description">
        <text class="desc-text">说明：开启健康数据共享功能仅是在每次健康数据更新时提供给监护人，无论开关与否均可在健康数据异常、触发跌倒检测时第一时间通知监护人（已经绑定监护人时生效）</text>
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      phoneNumber: '',
      maskedPhoneNumber: '',
      isBound: false,
      isDataShareEnabled: false
    }
  },
  computed: {
    isValidPhone() {
      return /^1\d{10}$/.test(this.phoneNumber);
    }
  },
  onLoad() {
    // 获取本地存储的绑定信息
    const boundInfo = uni.getStorageSync('boundGuardian');
    if (boundInfo) {
      const info = JSON.parse(boundInfo);
      this.maskedPhoneNumber = info.maskedPhone;
      this.isBound = true;
      this.isDataShareEnabled = info.isDataShareEnabled || false;
    }
  },
  methods: {
    toggleDataShare(e) {
      this.isDataShareEnabled = e.detail.value;
      
      // 如果已经绑定，则更新存储的绑定信息
      if (this.isBound) {
        const boundInfo = uni.getStorageSync('boundGuardian');
        if (boundInfo) {
          const info = JSON.parse(boundInfo);
          info.isDataShareEnabled = this.isDataShareEnabled;
          uni.setStorageSync('boundGuardian', JSON.stringify(info));
        }
      }
    },
    // 生成掩码手机号
    maskPhoneNumber(phone) {
      if (phone && phone.length === 11) {
        return phone.substring(0, 3) + '****' + phone.substring(7);
      }
      return '';
    },
    // 绑定监护人
    bindGuardian() {
      if (!this.isValidPhone) {
        uni.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        });
        return;
      }
      
      // 显示加载中
      uni.showLoading({
        title: '绑定中...'
      });
      
      // 模拟绑定过程
      setTimeout(() => {
        uni.hideLoading();
        
        // 保存手机号及掩码号码
        const maskedPhone = this.maskPhoneNumber(this.phoneNumber);
        
        // 保存到本地存储
        const guardianInfo = {
          phone: this.phoneNumber,
          maskedPhone: maskedPhone,
          isDataShareEnabled: this.isDataShareEnabled,
          bindTime: new Date().getTime()
        };
        
        uni.setStorageSync('boundGuardian', JSON.stringify(guardianInfo));
        
        // 更新状态
        this.maskedPhoneNumber = maskedPhone;
        this.isBound = true;
        
        uni.showToast({
          title: '绑定成功',
          icon: 'success'
        });
      }, 1500);
    },
    // 显示解绑确认框
    showUnbindConfirm() {
      uni.showModal({
        title: '提示',
        content: '确定要解除监护人绑定吗？',
        success: (res) => {
          if (res.confirm) {
            this.unbindGuardian();
          }
        }
      });
    },
    // 解绑监护人
    unbindGuardian() {
      // 显示加载中
      uni.showLoading({
        title: '解绑中...'
      });
      
      // 模拟解绑过程
      setTimeout(() => {
        uni.hideLoading();
        
        // 清除本地存储
        uni.removeStorageSync('boundGuardian');
        
        // 重置状态
        this.phoneNumber = '';
        this.maskedPhoneNumber = '';
        this.isBound = false;
        
        uni.showToast({
          title: '已解除绑定',
          icon: 'success'
        });
      }, 1000);
    }
  }
}
</script>

<style>
.container {
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.section {
  margin-bottom: 20px;
}

.label {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  display: block;
}

.input-field {
  width: 100%;
  height: 50px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 0 15px;
  font-size: 16px;
  box-sizing: border-box;
}

.action-button-area {
  margin-bottom: 20px;
}

.bind-button {
  width: 100%;
  height: 50px;
  background-color: #6C63FF;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
}

.bind-button[disabled] {
  background-color: #cccccc;
}

.description {
  margin: 20px 0;
}

.desc-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.bound-info {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.bound-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
}

.bound-phone {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phone-text {
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.delete-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 20px;
}

.toggle-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.toggle-label {
  font-size: 16px;
  color: #333;
}

.toggle-switch {
  transform: scale(0.9);
}
</style> 