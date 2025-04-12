<template>
  <view class="container">
    <view class="header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">通知设置</text>
      <view class="header-placeholder"></view>
    </view>
    
    <view class="content">
      <view class="option-list">
        <view class="option-item">
          <text class="option-text">健康异常提醒</text>
          <switch :checked="healthAlert" @change="toggleHealthAlert" color="#6C63FF"/>
        </view>
        
        <view class="option-item">
          <text class="option-text">服药提醒</text>
          <switch :checked="medicineAlert" @change="toggleMedicineAlert" color="#6C63FF"/>
        </view>
        
        <view class="option-item">
          <text class="option-text">跌倒检测提醒</text>
          <switch :checked="fallAlert" @change="toggleFallAlert" color="#6C63FF"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      healthAlert: true,
      medicineAlert: true,
      fallAlert: true
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    toggleHealthAlert(e) {
      this.healthAlert = e.detail.value;
    },
    toggleMedicineAlert(e) {
      this.medicineAlert = e.detail.value;
    },
    toggleFallAlert(e) {
      this.fallAlert = e.detail.value;
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

.option-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.option-text {
  font-size: 16px;
  color: #333;
}
</style> 