<template>
  <view class="container">
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-info">
        <view class="avatar">
          <text>{{ userInfo.name ? userInfo.name.charAt(0) : 'U' }}</text>
        </view>
        <view class="user-details">
          <text class="user-name">{{ userInfo.name || '用户' }}</text>
          <text class="user-status">今日健康状态良好</text>
        </view>
      </view>
      <view class="health-score">
        <text class="score">{{ healthScore }}</text>
        <text class="score-label">健康评分</text>
      </view>
    </view>
    
    <!-- 健康数据卡片 -->
    <view class="health-data-card">
      <view class="card-title">今日健康数据</view>
      <view class="data-grid">
        <view class="data-row">
          <view class="data-item">
            <text class="data-label">血压：</text>
            <text class="data-value">{{ todayData.bloodPressure || '--' }}</text>
          </view>
          <view class="data-item">
            <text class="data-label">血糖：</text>
            <text class="data-value">{{ todayData.bloodSugar || '--' }}</text>
          </view>
        </view>
        
        <view class="data-row">
          <view class="data-item">
            <text class="data-label">心率：</text>
            <text class="data-value">{{ todayData.heartRate || '--' }}</text>
          </view>
          <view class="data-item">
            <text class="data-label">体温：</text>
            <text class="data-value">{{ todayData.temperature || '--' }}</text>
          </view>
        </view>
        
        <view class="data-row">
          <view class="data-item">
            <text class="data-label">步数：</text>
            <text class="data-value">{{ todayData.steps || '--' }}</text>
          </view>
          <view class="data-item">
            <text class="data-label">睡眠：</text>
            <text class="data-value">{{ todayData.sleep || '--' }}</text>
          </view>
        </view>
      </view>
      <view class="data-actions">
        <button class="action-btn" @click="navigateTo('/pages/health-records/index')">记录数据</button>
        <button class="action-btn" @click="navigateTo('/pages/health/analysis')">查看分析</button>
      </view>
    </view>
    
    <!-- 用药提醒卡片 -->
    <view class="medication-card" @click="navigateTo('/pages/medication/index')">
      <view class="card-header">
        <text class="card-title">用药提醒</text>
        <text class="medication-count">{{ medications.length }}个提醒</text>
      </view>
      <view class="medication-list" v-if="medications.length > 0">
        <view class="medication-item" v-for="(item, index) in medications.slice(0, 3)" :key="index">
          <text class="medication-name">{{ item.name }}</text>
          <text class="medication-dosage">{{ item.dosage }}</text>
          <text class="medication-time">{{ item.nextTime }}</text>
        </view>
      </view>
      <view class="empty-medication" v-else>
        <text class="empty-text">暂无用药提醒，点击添加</text>
      </view>
    </view>
    
    <!-- 功能按钮网格 -->
    <view class="function-grid">
      <view class="function-item" @click="navigateTo('/pages/diagnosis/index')">
        <view class="function-icon">🔍</view>
        <text class="function-name">智能诊断</text>
      </view>
      
      <view class="function-item" @click="navigateTo('/pages/companion/index')">
        <view class="function-icon">🤖</view>
        <text class="function-name">智能陪伴</text>
      </view>
      
      <view class="function-item" @click="navigateTo('/pages/medical/index')">
        <view class="function-icon">🏥</view>
        <text class="function-name">医疗服务</text>
      </view>
      
      <view class="function-item" @click="navigateTo('/pages/family/index')">
        <view class="function-icon">👨‍👩‍👧‍👦</view>
        <text class="function-name">家庭成员</text>
      </view>
      
      <view class="function-item" @click="navigateTo('/pages/health/report')">
        <view class="function-icon">📊</view>
        <text class="function-name">健康报告</text>
      </view>
      
      <view class="function-item" @click="navigateTo('/pages/community/index')">
        <view class="function-icon">💬</view>
        <text class="function-name">健康社区</text>
      </view>
    </view>
    
    <!-- 健康提醒 -->
    <view class="reminder-section" v-if="healthReminders.length > 0">
      <view class="section-title">健康提醒</view>
      <view class="reminder-list">
        <view 
          class="reminder-item" 
          v-for="(reminder, index) in healthReminders" 
          :key="index"
          @click="handleReminder(reminder)"
        >
          <view class="reminder-icon">🔔</view>
          <view class="reminder-content">
            <text class="reminder-title">{{ reminder.title }}</text>
            <text class="reminder-desc">{{ reminder.description }}</text>
          </view>
          <view class="reminder-time">{{ reminder.time }}</view>
        </view>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <tab-bar :currentTab="0"></tab-bar>
  </view>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
import { getUserInfo } from '@/api/user.js'
import { getMedicationList } from '@/api/medication.js'

export default {
  components: {
    TabBar
  },
  data() {
    return {
      userInfo: {},
      healthScore: 85,
      todayData: {},
      medications: [],
      healthReminders: [],
      loading: false
    }
  },
  onShow() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        // 加载用户信息
        const userRes = await getUserInfo()
        if (userRes.code === 0) {
          this.userInfo = userRes.data
        }
        
        // 加载用药提醒
        const medicationRes = await getMedicationList()
        if (medicationRes.code === 0) {
          this.medications = medicationRes.data
        }
        
        // 模拟今日健康数据
        this.todayData = {
          bloodPressure: '120/80',
          bloodSugar: '5.5',
          heartRate: '75',
          temperature: '36.5',
          steps: '8000',
          sleep: '7.5h'
        }
        
        // 模拟健康提醒
        this.healthReminders = [
          {
            id: 1,
            title: '血压检查',
            description: '请测量今日血压',
            time: '14:00',
            type: 'blood_pressure'
          },
          {
            id: 2,
            title: '运动提醒',
            description: '建议进行30分钟有氧运动',
            time: '18:00',
            type: 'exercise'
          }
        ]
      } catch (error) {
        console.error('加载数据失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    navigateTo(url) {
      uni.navigateTo({
        url: url
      })
    },
    
    handleReminder(reminder) {
      switch (reminder.type) {
        case 'blood_pressure':
          this.navigateTo('/pages/health-records/index')
          break
        case 'exercise':
          uni.showToast({
            title: '运动提醒已处理',
            icon: 'success'
          })
          break
        default:
          uni.showToast({
            title: '提醒已处理',
            icon: 'success'
          })
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
  padding-bottom: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.user-card {
  background: linear-gradient(135deg, #6C63FF 0%, #8B7CF6 100%);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-right: 15px;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.user-status {
  font-size: 14px;
  opacity: 0.9;
}

.health-score {
  text-align: center;
}

.score {
  font-size: 24px;
  font-weight: bold;
  display: block;
}

.score-label {
  font-size: 12px;
  opacity: 0.9;
}

.health-data-card, .medication-card {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.medication-count {
  font-size: 12px;
  color: #666;
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 10px;
}

.data-grid {
  width: 100%;
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
  justify-content: space-between;
}

.data-label {
  font-size: 16px;
  color: #666;
}

.data-value {
  font-size: 16px;
  color: #1e88e5;
  font-weight: bold;
}

.data-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.action-btn {
  flex: 1;
  background-color: #6C63FF;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 0;
  font-size: 14px;
}

.medication-list {
  display: flex;
  flex-direction: column;
}

.medication-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 5px;
  border-bottom: 1px solid #f0f0f0;
}

.medication-item:last-child {
  border-bottom: none;
}

.medication-name {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.medication-dosage {
  font-size: 14px;
  color: #666;
}

.medication-time {
  font-size: 12px;
  color: #999;
}

.empty-medication {
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.empty-text {
  font-size: 14px;
  color: #999;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.function-item:active {
  transform: scale(0.95);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.function-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.function-name {
  font-size: 12px;
  color: #333;
  text-align: center;
}

.reminder-section {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.reminder-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reminder-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.reminder-icon {
  font-size: 18px;
  margin-right: 12px;
}

.reminder-content {
  flex: 1;
}

.reminder-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 3px;
}

.reminder-desc {
  font-size: 12px;
  color: #666;
}

.reminder-time {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
}
</style>
