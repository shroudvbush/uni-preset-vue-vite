<template>
  <view class="container">
    <view class="health-data-card">
      <view class="card-title">健康数据</view>
      <view class="data-grid">
        <view class="data-row">
          <view class="data-item">
            <text class="data-label">血压：</text>
          </view>
          <view class="data-item">
            <text class="data-label">血糖：</text>
          </view>
        </view>
        
        <view class="data-row">
          <view class="data-item">
            <text class="data-label">心率：</text>
          </view>
          <view class="data-item">
            <text class="data-label">体温：</text>
          </view>
        </view>
        
        <view class="data-row">
          <view class="data-item">
            <text class="data-label">步数：</text>
          </view>
          <view class="data-item">
            <text class="data-label">睡眠：</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 用药提醒卡片 -->
    <view class="medication-card" @click="navigateTo('/pages/medication/index')">
      <view class="card-title">用药提醒</view>
      <view class="medication-list" v-if="medications.length > 0">
        <view class="medication-item" v-for="(item, index) in medications" :key="index">
          <text class="medication-name">{{ item.name }}</text>
          <text class="medication-dosage">{{ item.dosage }}</text>
        </view>
      </view>
      <view class="empty-medication" v-else>
        <text class="empty-text">暂无用药提醒，点击添加</text>
      </view>
    </view>
    
    <view class="function-buttons">
      <view class="function-button" @click="navigateTo('/pages/diagnosis/index')">
        <text class="button-text">智能诊断</text>
      </view>
      
      <view class="function-button" @click="navigateTo('/pages/companion/index')">
        <text class="button-text">智能陪伴</text>
      </view>
      
      <view class="function-button" @click="navigateTo('/pages/health-records/index')">
        <text class="button-text">健康档案</text>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <tab-bar :currentTab="0"></tab-bar>
  </view>
</template>

<script>
import TabBar from '@/components/TabBar.vue'

export default {
  components: {
    TabBar
  },
  data() {
    return {
      medications: []
    }
  },
  onShow() {
    // 每次显示页面时刷新用药提醒数据
    this.loadMedications();
  },
  methods: {
    navigateTo(url) {
      uni.navigateTo({
        url: url
      });
    },
    loadMedications() {
      const savedMedications = uni.getStorageSync('medications');
      if (savedMedications) {
        this.medications = JSON.parse(savedMedications);
      }
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 70px; /* 为底部导航栏留出空间 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.health-data-card {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px 15px;
  margin-bottom: 15px;
  margin-top: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.medication-card {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}

.medication-list {
  display: flex;
  flex-direction: column;
}

.medication-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 5px;
  border-bottom: 1px solid #f0f0f0;
}

.medication-item:last-child {
  border-bottom: none;
}

.medication-name {
  font-size: 16px;
  color: #1e88e5;
}

.medication-dosage {
  font-size: 16px;
  color: #1e88e5;
}

.empty-medication {
  padding: 10px 0;
  display: flex;
  justify-content: center;
}

.empty-text {
  font-size: 14px;
  color: #999;
}

.data-grid {
  width: 110%;
}

.data-row {
  display: flex;
  margin-bottom: 15px;
  justify-content: space-between;
}

.data-item {
  flex: 1;
  display: flex;
  align-items: center;
}

.data-label {
  font-size: 16px;
  color: #1e88e5;
}

.function-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  flex: 1;
}

.function-button {
  width: 100%;
  height: 75px;
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.function-button:active {
  transform: scale(0.98);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.button-text {
  font-size: 17px;
  color: #1e88e5;
  font-weight: 500;
}

@media screen and (max-height: 700px) {
  .health-data-card, .medication-card {
    padding: 15px 12px;
    margin-bottom: 15px;
  }
  
  .function-buttons {
    gap: 10px;
  }
  
  .function-button {
    height: 55px;
  }
  
  .button-text {
    font-size: 16px;
  }
  
  .data-row {
    margin-bottom: 12px;
  }
}

@media screen and (min-height: 800px) {
  .function-button {
    height: 70px;
  }
}
</style>
