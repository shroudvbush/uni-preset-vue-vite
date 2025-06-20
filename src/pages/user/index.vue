<template>
  <view class="container">
    <!-- 用户信息卡片 -->
    <view class="user-info-card">
      <view class="user-header">
        <view class="avatar-container">
          <text>{{ userInfo.name ? userInfo.name.charAt(0) : 'U' }}</text>
        </view>
        <view class="user-text">
          <text class="name">{{ userInfo.name || '用户名' }}</text>
          <text class="account">{{ userInfo.phoneNumber || '未绑定手机号' }}</text>
        </view>
      </view>
      
      <!-- 健康概览 -->
      <view class="health-overview">
        <view class="overview-item">
          <text class="overview-value">{{ healthScore }}</text>
          <text class="overview-label">健康评分</text>
        </view>
        <view class="overview-item">
          <text class="overview-value">{{ familyMembers.length }}</text>
          <text class="overview-label">家庭成员</text>
        </view>
        <view class="overview-item">
          <text class="overview-value">{{ medications.length }}</text>
          <text class="overview-label">用药提醒</text>
        </view>
      </view>
    </view>
    
    <!-- 功能菜单 -->
    <view class="menu-section">
      <view class="menu-group">
        <view class="menu-item" @click="navigateTo('/pages/family/index')">
          <view class="menu-icon">👨‍👩‍👧‍👦</view>
          <text class="menu-text">家庭成员</text>
          <text class="menu-arrow">></text>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/user/guardian')">
          <view class="menu-icon">👤</view>
          <text class="menu-text">监护人绑定</text>
          <text class="menu-arrow">></text>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/health-records/index')">
          <view class="menu-icon">📊</view>
          <text class="menu-text">健康档案</text>
          <text class="menu-arrow">></text>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/medication/index')">
          <view class="menu-icon">💊</view>
          <text class="menu-text">用药管理</text>
          <text class="menu-arrow">></text>
        </view>
      </view>
      
      <view class="menu-group">
        <view class="menu-item" @click="navigateTo('/pages/health/analysis')">
          <view class="menu-icon">📈</view>
          <text class="menu-text">健康分析</text>
          <text class="menu-arrow">></text>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/health/report')">
          <view class="menu-icon">📋</view>
          <text class="menu-text">健康报告</text>
          <text class="menu-arrow">></text>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/medical/index')">
          <view class="menu-icon">🏥</view>
          <text class="menu-text">医疗服务</text>
          <text class="menu-arrow">></text>
        </view>
      </view>
      
      <view class="menu-group">
        <view class="menu-item" @click="navigateTo('/pages/user/notification')">
          <view class="menu-icon">🔔</view>
          <text class="menu-text">通知设置</text>
          <text class="menu-arrow">></text>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/user/font')">
          <view class="menu-icon">🔤</view>
          <text class="menu-text">字体大小</text>
          <text class="menu-arrow">></text>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/user/account')">
          <view class="menu-icon">⚙️</view>
          <text class="menu-text">账号设置</text>
          <text class="menu-arrow">></text>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/user/settings')">
          <view class="menu-icon">🔧</view>
          <text class="menu-text">系统设置</text>
          <text class="menu-arrow">></text>
        </view>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <tab-bar :currentTab="2"></tab-bar>
  </view>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
import { getUserInfo } from '@/api/user.js'
import { getFamilyMembers } from '@/api/family.js'
import { getMedicationList } from '@/api/medication.js'

export default {
  components: {
    TabBar
  },
  data() {
    return {
      userInfo: {},
      healthScore: 85,
      familyMembers: [],
      medications: [],
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
        
        // 加载家庭成员
        const familyRes = await getFamilyMembers()
        if (familyRes.code === 0) {
          this.familyMembers = familyRes.data
        }
        
        // 加载用药提醒
        const medicationRes = await getMedicationList()
        if (medicationRes.code === 0) {
          this.medications = medicationRes.data
        }
      } catch (error) {
        console.error('加载数据失败:', error)
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    navigateTo(url) {
      uni.navigateTo({
        url: url
      })
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 70px;
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
  margin-bottom: 20px;
}

.avatar-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6C63FF 0%, #8B7CF6 100%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
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

.health-overview {
  display: flex;
  justify-content: space-around;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.overview-item {
  text-align: center;
}

.overview-value {
  font-size: 20px;
  font-weight: bold;
  color: #6C63FF;
  display: block;
  margin-bottom: 5px;
}

.overview-label {
  font-size: 12px;
  color: #666;
}

.menu-section {
  margin-top: 20px;
}

.menu-group {
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background-color: #f8f9fa;
}

.menu-icon {
  font-size: 20px;
  margin-right: 15px;
  width: 24px;
  text-align: center;
}

.menu-text {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.menu-arrow {
  font-size: 16px;
  color: #ccc;
}
</style> 