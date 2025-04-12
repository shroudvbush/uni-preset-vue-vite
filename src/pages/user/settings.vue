<template>
  <view class="container">
    <view class="header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">设置</text>
      <view class="header-placeholder"></view>
    </view>
    
    <view class="content">
      <view class="menu-list">
        <view class="menu-item" @click="navigateTo('/pages/user/notification')">
          <text class="menu-text">通知设置</text>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/user/font')">
          <text class="menu-text">字体大小设置</text>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/user/account')">
          <text class="menu-text">账号设置</text>
        </view>
      </view>
      
      <view class="version-info">
        <text class="version-text">版本号：1.0.0.1</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    navigateTo(url) {
      uni.navigateTo({
        url: url
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

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #fff;
  position: relative;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.back-button {
  width: 30px;
  display: flex;
  align-items: center;
}

.back-icon {
  font-size: 24px;
  color: #333;
}

.page-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

.header-placeholder {
  width: 30px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.menu-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

.menu-item {
  height: 60px;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
}

.menu-text {
  font-size: 16px;
  color: #333;
  will-change: auto;
  transform: translateZ(0);
}

.version-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding: 20px 0;
}

.version-text {
  font-size: 14px;
  color: #999;
  will-change: auto;
  transform: translateZ(0);
}
</style> 