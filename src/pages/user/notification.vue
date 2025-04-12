<template>
  <view class="container">
    <page-header title="通知设置"></page-header>
    
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
import PageHeader from '@/components/PageHeader.vue'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      healthAlert: true,
      medicineAlert: true,
      fallAlert: true
    }
  },
  methods: {
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