<template>
  <view class="container">
    <page-header title="健康分析"></page-header>
    
    <view class="content">
      <!-- 健康评分 -->
      <view class="score-section">
        <view class="score-card">
          <view class="score-circle">
            <text class="score-value">{{ healthScore }}</text>
            <text class="score-label">健康评分</text>
          </view>
          <view class="score-details">
            <text class="score-title">综合健康评估</text>
            <text class="score-desc">{{ getScoreDescription(healthScore) }}</text>
          </view>
        </view>
      </view>
      
      <!-- 健康趋势 -->
      <view class="trend-section">
        <view class="section-title">健康趋势</view>
        <view class="trend-tabs">
          <view 
            class="trend-tab" 
            :class="{ active: activeTab === 'week' }"
            @click="switchTab('week')"
          >
            <text>本周</text>
          </view>
          <view 
            class="trend-tab" 
            :class="{ active: activeTab === 'month' }"
            @click="switchTab('month')"
          >
            <text>本月</text>
          </view>
          <view 
            class="trend-tab" 
            :class="{ active: activeTab === 'year' }"
            @click="switchTab('year')"
          >
            <text>本年</text>
          </view>
        </view>
        
        <view class="trend-chart">
          <view class="chart-placeholder">
            <text class="chart-text">健康数据趋势图表</text>
            <text class="chart-desc">血压、血糖、心率等指标变化趋势</text>
          </view>
        </view>
      </view>
      
      <!-- 健康指标分析 -->
      <view class="metrics-section">
        <view class="section-title">健康指标分析</view>
        <view class="metrics-list">
          <view class="metric-item" v-for="(metric, index) in healthMetrics" :key="index">
            <view class="metric-header">
              <view class="metric-icon">{{ metric.icon }}</view>
              <view class="metric-info">
                <text class="metric-name">{{ metric.name }}</text>
                <text class="metric-value">{{ metric.value }}</text>
              </view>
              <view class="metric-status" :class="metric.status">
                <text>{{ getStatusText(metric.status) }}</text>
              </view>
            </view>
            <view class="metric-desc">
              <text>{{ metric.description }}</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 健康建议 -->
      <view class="advice-section">
        <view class="section-title">健康建议</view>
        <view class="advice-list">
          <view class="advice-item" v-for="(advice, index) in healthAdvice" :key="index">
            <view class="advice-icon">{{ advice.icon }}</view>
            <view class="advice-content">
              <text class="advice-title">{{ advice.title }}</text>
              <text class="advice-desc">{{ advice.description }}</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 风险评估 -->
      <view class="risk-section">
        <view class="section-title">健康风险评估</view>
        <view class="risk-list">
          <view class="risk-item" v-for="(risk, index) in healthRisks" :key="index">
            <view class="risk-header">
              <text class="risk-name">{{ risk.name }}</text>
              <view class="risk-level" :class="risk.level">
                <text>{{ getRiskLevelText(risk.level) }}</text>
              </view>
            </view>
            <text class="risk-desc">{{ risk.description }}</text>
          </view>
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
      healthScore: 85,
      activeTab: 'week',
      healthMetrics: [
        {
          name: '血压',
          value: '120/80 mmHg',
          status: 'normal',
          icon: '🩺',
          description: '血压在正常范围内，建议继续保持健康生活方式'
        },
        {
          name: '血糖',
          value: '5.5 mmol/L',
          status: 'normal',
          icon: '🩸',
          description: '血糖水平正常，注意控制饮食和规律运动'
        },
        {
          name: '心率',
          value: '75 次/分',
          status: 'normal',
          icon: '💓',
          description: '心率正常，建议保持适度运动'
        },
        {
          name: 'BMI',
          value: '22.5',
          status: 'normal',
          icon: '⚖️',
          description: '体重指数正常，继续保持健康体重'
        }
      ],
      healthAdvice: [
        {
          icon: '🏃‍♂️',
          title: '增加运动量',
          description: '建议每天进行30分钟中等强度有氧运动'
        },
        {
          icon: '🥗',
          title: '改善饮食',
          description: '增加蔬菜水果摄入，减少高盐高脂食物'
        },
        {
          icon: '😴',
          title: '保证睡眠',
          description: '建议每晚保证7-8小时优质睡眠'
        },
        {
          icon: '💧',
          title: '多喝水',
          description: '每天至少喝8杯水，保持身体水分'
        }
      ],
      healthRisks: [
        {
          name: '高血压风险',
          level: 'low',
          description: '当前血压正常，但需要定期监测'
        },
        {
          name: '糖尿病风险',
          level: 'low',
          description: '血糖水平正常，继续保持健康饮食'
        },
        {
          name: '心血管疾病风险',
          level: 'medium',
          description: '建议定期体检，注意心脏健康'
        }
      ]
    }
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab
      // 这里可以根据tab加载不同的数据
    },
    
    getScoreDescription(score) {
      if (score >= 90) return '优秀 - 健康状况非常好'
      if (score >= 80) return '良好 - 健康状况良好'
      if (score >= 70) return '一般 - 需要关注健康'
      if (score >= 60) return '较差 - 建议改善生活方式'
      return '差 - 需要及时就医'
    },
    
    getStatusText(status) {
      const statusMap = {
        'normal': '正常',
        'warning': '注意',
        'danger': '异常'
      }
      return statusMap[status] || status
    },
    
    getRiskLevelText(level) {
      const levelMap = {
        'low': '低风险',
        'medium': '中风险',
        'high': '高风险'
      }
      return levelMap[level] || level
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

.score-section {
  margin-bottom: 20px;
}

.score-card {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.score-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6C63FF 0%, #8B7CF6 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  margin-right: 20px;
}

.score-value {
  font-size: 24px;
  font-weight: bold;
  display: block;
}

.score-label {
  font-size: 12px;
  opacity: 0.9;
}

.score-details {
  flex: 1;
}

.score-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.score-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.trend-section, .metrics-section, .advice-section, .risk-section {
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

.trend-tabs {
  display: flex;
  background-color: #f8f9fa;
  border-radius: 20px;
  padding: 4px;
  margin-bottom: 20px;
}

.trend-tab {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  border-radius: 16px;
  font-size: 14px;
  color: #666;
  transition: all 0.3s ease;
}

.trend-tab.active {
  background-color: #6C63FF;
  color: white;
}

.trend-chart {
  height: 200px;
  background-color: #f8f9fa;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chart-text {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.chart-desc {
  font-size: 14px;
  color: #666;
}

.metrics-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.metric-item {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.metric-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.metric-icon {
  font-size: 20px;
  margin-right: 12px;
}

.metric-info {
  flex: 1;
}

.metric-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 3px;
}

.metric-value {
  font-size: 14px;
  color: #666;
}

.metric-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
}

.metric-status.normal {
  background-color: #28a745;
}

.metric-status.warning {
  background-color: #ffc107;
}

.metric-status.danger {
  background-color: #dc3545;
}

.metric-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.advice-list {
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

.advice-icon {
  font-size: 24px;
  margin-right: 15px;
  margin-top: 2px;
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

.risk-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.risk-item {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.risk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.risk-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.risk-level {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
}

.risk-level.low {
  background-color: #28a745;
}

.risk-level.medium {
  background-color: #ffc107;
}

.risk-level.high {
  background-color: #dc3545;
}

.risk-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}
</style> 