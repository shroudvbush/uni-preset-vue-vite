<template>
  <view class="tab-bar">
    <view class="tab-item" :class="{'tab-active': currentTab === 0}" @click="switchTab(0)">
      <view class="tab-icon home-icon"></view>
      <text>首页</text>
    </view>
    <view class="tab-item" :class="{'tab-active': currentTab === 1}" @click="switchTab(1)">
      <view class="tab-icon community-icon"></view>
      <text>社区</text>
    </view>
    <view class="tab-item" :class="{'tab-active': currentTab === 2}" @click="switchTab(2)">
      <view class="tab-icon user-icon"></view>
      <text>个人中心</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    // 当前激活的tab索引
    currentTab: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchTab(index) {
      // 如果点击的是当前tab，不做任何操作
      if (index === this.currentTab) return;
      
      // 根据索引跳转到不同页面
      const pages = ['/pages/index/index', '/pages/community/index', '/pages/user/index'];
      uni.switchTab({
        url: pages[index]
      });
    }
  }
}
</script>

<style>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55px;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
  z-index: 999;
  width: 100%;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #333;
  padding: 5px 0;
}

.tab-active {
  color: #6C63FF;
}

.tab-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  border-radius: 50%;
  border: 2px solid transparent;
  position: relative;
}

.tab-active .tab-icon {
  border-color: #f0f0f0;
  background-color: #f5f5ff;
}

.home-icon:before,
.community-icon:before,
.user-icon:before {
  content: '';
  display: block;
  width: 14px;
  height: 14px;
  margin: 3px auto;
}

.home-icon:before {
  border: 2px solid currentColor;
  border-top: none;
  border-radius: 0 0 2px 2px;
  width: 12px;
  position: relative;
}

.home-icon:after {
  content: '';
  display: block;
  width: 8px;
  height: 6px;
  border: 2px solid currentColor;
  border-bottom: none;
  border-radius: 2px 2px 0 0;
  position: absolute;
  top: -3px;
  left: 6px;
}

.community-icon:before {
  border: 2px solid currentColor;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  position: relative;
  margin-top: 2px;
}

.community-icon:after {
  content: '';
  display: block;
  width: 12px;
  height: 8px;
  border: 2px solid currentColor;
  border-radius: 6px 6px 0 0;
  border-bottom: none;
  position: absolute;
  bottom: 1px;
  left: 4px;
}

.user-icon:before {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid currentColor;
  margin-bottom: 1px;
}

.user-icon:after {
  content: '';
  display: block;
  width: 12px;
  height: 6px;
  border-radius: 6px 6px 0 0;
  border: 2px solid currentColor;
  border-bottom: none;
  margin: 0 auto;
}
</style> 