<!-- 通用页面头部组件 -->
<template>
  <view class="header">
    <view class="back-button" @click="goBack">
      <text class="back-icon">←</text>
    </view>
    <text class="page-title">{{ title }}</text>
    <view class="header-placeholder"></view>
  </view>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    }
  }
}
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #fff;
  position: relative;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  width: 100%;
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
</style> 