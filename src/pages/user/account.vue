<template>
  <view class="container">
    <page-header title="账号设置"></page-header>
    
    <view class="content">
      <view class="section">
        <view class="section-item" @click="editProfile">
          <text class="item-text">修改个人资料</text>
          <text class="item-arrow">›</text>
        </view>
        
        <view class="section-item" @click="changePassword">
          <text class="item-text">修改密码</text>
          <text class="item-arrow">›</text>
        </view>
        
        <view class="section-item" @click="bindPhone">
          <text class="item-text">绑定手机号</text>
          <text class="item-arrow">›</text>
        </view>
      </view>
      
      <view class="button-section">
        <button class="logout-button" @click="logout">退出登录</button>
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
    return {}
  },
  methods: {
    editProfile() {
      // 实现修改个人资料逻辑
      uni.showToast({
        title: '修改个人资料',
        icon: 'none'
      });
    },
    changePassword() {
      // 实现修改密码逻辑
      uni.showToast({
        title: '修改密码',
        icon: 'none'
      });
    },
    bindPhone() {
      // 实现绑定手机号逻辑
      uni.showToast({
        title: '绑定手机号',
        icon: 'none'
      });
    },
    logout() {
      // 实现退出登录逻辑
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: function(res) {
          if (res.confirm) {
            // 清除登录信息
            uni.reLaunch({
              url: '/pages/login/index'
            });
          }
        }
      });
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
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.section-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.section-item:last-child {
  border-bottom: none;
}

.item-text {
  font-size: 16px;
  color: #333;
}

.item-arrow {
  font-size: 20px;
  color: #999;
}

.button-section {
  margin-top: 30px;
}

.logout-button {
  width: 100%;
  height: 50px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
}
</style> 