<template>
  <view class="container">
    <page-header title="健康报告"></page-header>
    
    <view class="content">
      <!-- 报告选择 -->
      <view class="report-selector">
        <view class="selector-tabs">
          <view 
            class="selector-tab" 
            :class="{ active: activeReport === 'monthly' }"
            @click="switchReport('monthly')"
          >
            <text>月度报告</text>
          </view>
          <view 
            class="selector-tab" 
            :class="{ active: activeReport === 'quarterly' }"
            @click="switchReport('quarterly')"
          >
            <text>季度报告</text>
          </view>
          <view 
            class="selector-tab" 
            :class="{ active: activeReport === 'yearly' }"
            @click="switchReport('yearly')"
          >
            <text>年度报告</text>
          </view>
        </view>
      </view>
      
      <!-- 报告概览 -->
      <view class="report-overview">
        <view class="overview-header">
          <text class="report-title">{{ getReportTitle() }}</text>
          <text class="report-date">{{ getReportDate() }}</text>
        </view>
        
        <view class="overview-stats">
          <view class="stat-item">
            <text class="stat-value">{{ reportData.healthScore }}</text>
            <text class="stat-label">健康评分</text>
          </view>
          <view class="stat-item">
            <text class="stat-value">{{ reportData.recordDays }}</text>
            <text class="stat-label">记录天数</text>
          </view>
          <view class="stat-item">
            <text class="stat-value">{{ reportData.improvement }}</text>
            <text class="stat-label">改善项目</text>
          </view>
        </view>
      </view>
      
      <!-- 健康趋势总结 -->
      <view class="trend-summary">
        <view class="section-title">健康趋势总结</view>
        <view class="trend-items">
          <view class="trend-item" v-for="(trend, index) in reportData.trends" :key="index">
            <view class="trend-header">
              <view class="trend-icon">{{ trend.icon }}</view>
              <text class="trend-name">{{ trend.name }}</text>
              <view class="trend-direction" :class="trend.direction">
                <text>{{ getDirectionText(trend.direction) }}</text>
              </view>
            </view>
            <text class="trend-desc">{{ trend.description }}</text>
          </view>
        </view>
      </view>
      
      <!-- 健康建议 -->
      <view class="health-advice">
        <view class="section-title">健康建议</view>
        <view class="advice-items">
          <view class="advice-item" v-for="(advice, index) in reportData.advice" :key="index">
            <view class="advice-priority" :class="advice.priority">
              <text>{{ getPriorityText(advice.priority) }}</text>
            </view>
            <view class="advice-content">
              <text class="advice-title">{{ advice.title }}</text>
              <text class="advice-desc">{{ advice.description }}</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 目标完成情况 -->
      <view class="goal-completion">
        <view class="section-title">目标完成情况</view>
        <view class="goal-items">
          <view class="goal-item" v-for="(goal, index) in reportData.goals" :key="index">
            <view class="goal-info">
              <text class="goal-name">{{ goal.name }}</text>
              <text class="goal-progress">{{ goal.progress }}%</text>
            </view>
            <view class="goal-bar">
              <view class="goal-progress-bar" :style="{ width: goal.progress + '%' }"></view>
            </view>
            <text class="goal-status">{{ getGoalStatus(goal.progress) }}</text>
          </view>
        </view>
      </view>
      
      <!-- 报告操作 -->
      <view class="report-actions">
        <button class="action-btn primary" @click="downloadReport">
          <text>下载报告</text>
        </button>
        <button class="action-btn secondary" @click="shareReport">
          <text>分享报告</text>
        </button>
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
      activeReport: 'monthly',
      reportData: {
        healthScore: 85,
        recordDays: 28,
        improvement: 3,
        trends: [
          {
            name: '血压控制',
            icon: '🩺',
            direction: 'improving',
            description: '血压控制良好，较上月有所改善'
          },
          {
            name: '运动习惯',
            icon: '🏃‍♂️',
            direction: 'stable',
            description: '运动频率保持稳定，建议增加强度'
          },
          {
            name: '睡眠质量',
            icon: '😴',
            direction: 'declining',
            description: '睡眠质量有所下降，需要关注'
          }
        ],
        advice: [
          {
            priority: 'high',
            title: '改善睡眠',
            description: '建议调整作息时间，保证充足睡眠'
          },
          {
            priority: 'medium',
            title: '增加运动',
            description: '每周至少进行3次有氧运动'
          },
          {
            priority: 'low',
            title: '饮食调整',
            description: '适当减少盐分摄入，增加蔬菜水果'
          }
        ],
        goals: [
          {
            name: '每日步数8000步',
            progress: 85
          },
          {
            name: '每周运动3次',
            progress: 75
          },
          {
            name: '血压控制在正常范围',
            progress: 95
          },
          {
            name: '睡眠时间7-8小时',
            progress: 60
          }
        ]
      }
    }
  },
  methods: {
    switchReport(type) {
      this.activeReport = type
      this.loadReportData(type)
    },
    
    loadReportData(type) {
      // 根据报告类型加载数据
      console.log('加载报告数据:', type)
    },
    
    getReportTitle() {
      const titles = {
        'monthly': '月度健康报告',
        'quarterly': '季度健康报告',
        'yearly': '年度健康报告'
      }
      return titles[this.activeReport]
    },
    
    getReportDate() {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      
      switch (this.activeReport) {
        case 'monthly':
          return `${year}年${month}月`
        case 'quarterly':
          return `${year}年第${Math.ceil(month / 3)}季度`
        case 'yearly':
          return `${year}年`
        default:
          return ''
      }
    },
    
    getDirectionText(direction) {
      const directionMap = {
        'improving': '改善',
        'stable': '稳定',
        'declining': '下降'
      }
      return directionMap[direction] || direction
    },
    
    getPriorityText(priority) {
      const priorityMap = {
        'high': '高',
        'medium': '中',
        'low': '低'
      }
      return priorityMap[priority] || priority
    },
    
    getGoalStatus(progress) {
      if (progress >= 90) return '优秀'
      if (progress >= 80) return '良好'
      if (progress >= 60) return '一般'
      return '需努力'
    },
    
    downloadReport() {
      uni.showToast({
        title: '报告下载中...',
        icon: 'loading'
      })
      
      setTimeout(() => {
        uni.showToast({
          title: '下载成功',
          icon: 'success'
        })
      }, 2000)
    },
    
    shareReport() {
      uni.showActionSheet({
        itemList: ['微信', 'QQ', '邮件'],
        success: (res) => {
          uni.showToast({
            title: '分享成功',
            icon: 'success'
          })
        }
      })
    }
  }
}
</script>

<style>
.container {
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  box-sizing: border-box;
}

.content {
  padding: 20px;
}

.report-selector {
  margin-bottom: 20px;
}

.selector-tabs {
  display: flex;
  background-color: #fff;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.selector-tab {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  transition: all 0.3s ease;
}

.selector-tab.active {
  background-color: #6C63FF;
  color: white;
}

.report-overview {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.overview-header {
  text-align: center;
  margin-bottom: 20px;
}

.report-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.report-date {
  font-size: 14px;
  color: #666;
}

.overview-stats {
  display: flex;
  justify-content: space-around;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #6C63FF;
  display: block;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.trend-summary, .health-advice, .goal-completion {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.trend-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.trend-item {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.trend-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.trend-icon {
  font-size: 20px;
  margin-right: 10px;
}

.trend-name {
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.trend-direction {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
}

.trend-direction.improving {
  background-color: #28a745;
}

.trend-direction.stable {
  background-color: #6c757d;
}

.trend-direction.declining {
  background-color: #dc3545;
}

.trend-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.advice-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.advice-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.advice-priority {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
  margin-right: 15px;
  margin-top: 2px;
}

.advice-priority.high {
  background-color: #dc3545;
}

.advice-priority.medium {
  background-color: #ffc107;
}

.advice-priority.low {
  background-color: #28a745;
}

.advice-content {
  flex: 1;
}

.advice-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.advice-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.goal-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.goal-item {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.goal-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.goal-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.goal-progress {
  font-size: 16px;
  font-weight: bold;
  color: #6C63FF;
}

.goal-bar {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-bottom: 8px;
  overflow: hidden;
}

.goal-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #6C63FF 0%, #8B7CF6 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.goal-status {
  font-size: 12px;
  color: #666;
}

.report-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.action-btn {
  flex: 1;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  border: none;
}

.action-btn.primary {
  background-color: #6C63FF;
  color: white;
}

.action-btn.secondary {
  background-color: #fff;
  color: #6C63FF;
  border: 2px solid #6C63FF;
}
</style> 