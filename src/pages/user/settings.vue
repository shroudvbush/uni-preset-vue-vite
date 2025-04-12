<template>
  <view class="container">
    <page-header title="设置"></page-header>
    
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
import TabBar from '@/components/TabBar.vue'
import PageHeader from '@/components/PageHeader.vue'

export default {
  components: {
    TabBar,
    PageHeader
  },
  data() {
    return {}
  },
  methods: {
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
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 70px; /* 为底部导航栏留出空间 */
  display: flex;
  flex-direction: column;
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