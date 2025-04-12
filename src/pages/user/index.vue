<template>
  <view class="container">
    <view class="user-info-card">
      <view class="user-header">
        <view class="avatar-container">
          <text>头像</text>
        </view>
        <view class="user-text">
          <text class="name">名字</text>
          <text class="account">账号</text>
        </view>
      </view>
      
      <view class="button-list">
        <button class="menu-button" @click="navigateTo('/pages/user/guardian')">监护人绑定</button>
        <button class="menu-button" @click="navigateTo('/pages/user/settings')">设置</button>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <tab-bar :currentTab="2"></tab-bar>
  </view>
</template>

<script>
import TabBar from '@/components/TabBar.vue'

export default {
  components: {
    TabBar
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
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 70px; /* 为底部导航栏留出空间 */
}

.user-info-card {
  background-color: #fff;
  border-radius: 16px;
  margin-top: 15px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.user-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.avatar-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.user-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.account {
  font-size: 14px;
  color: #666;
}

.button-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu-button {
  width: 100%;
  height: 50px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  font-size: 16px;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 