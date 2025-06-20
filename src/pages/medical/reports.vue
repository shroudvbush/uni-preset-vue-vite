<template>
  <view class="container">
    <page-header title="检查报告"></page-header>
    
    <view class="content">
      <!-- 筛选条件 -->
      <view class="filter-section">
        <view class="filter-tabs">
          <view 
            class="filter-tab" 
            :class="{ active: activeFilter === 'all' }"
            @click="setFilter('all')"
          >
            <text>全部</text>
          </view>
          <view 
            class="filter-tab" 
            :class="{ active: activeFilter === 'recent' }"
            @click="setFilter('recent')"
          >
            <text>最近</text>
          </view>
          <view 
            class="filter-tab" 
            :class="{ active: activeFilter === 'abnormal' }"
            @click="setFilter('abnormal')"
          >
            <text>异常</text>
          </view>
        </view>
      </view>
      
      <!-- 报告列表 -->
      <view class="report-list">
        <view 
          class="report-item" 
          v-for="(report, index) in filteredReports" 
          :key="index"
          @click="viewReportDetail(report)"
        >
          <view class="report-header">
            <view class="report-info">
              <text class="report-title">{{ report.title }}</text>
              <text class="report-date">{{ report.date }}</text>
            </view>
            <view class="report-status" :class="report.status">
              <text>{{ getStatusText(report.status) }}</text>
            </view>
          </view>
          
          <view class="report-details">
            <text class="hospital-name">🏥 {{ report.hospital }}</text>
            <text class="department-name">📋 {{ report.department }}</text>
          </view>
          
          <view class="report-summary">
            <view class="summary-item" v-for="(item, itemIndex) in report.summary" :key="itemIndex">
              <text class="item-label">{{ item.label }}：</text>
              <text class="item-value" :class="{ abnormal: item.abnormal }">{{ item.value }}</text>
            </view>
          </view>
          
          <view class="report-actions">
            <button class="action-btn view-btn" @click.stop="viewReportDetail(report)">
              <text>查看详情</text>
            </button>
            <button class="action-btn share-btn" @click.stop="shareReport(report)">
              <text>分享</text>
            </button>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="filteredReports.length === 0">
        <text class="empty-icon">📋</text>
        <text class="empty-text">暂无检查报告</text>
      </view>
      
      <!-- 添加报告按钮 -->
      <view class="add-report-section">
        <button class="add-report-btn" @click="addReport">
          <text>+ 添加检查报告</text>
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { getMedicalReports, shareMedicalReport } from '@/api/medical.js'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      activeFilter: 'all',
      reports: [],
      filteredReports: [],
      loading: false
    }
  },
  onLoad() {
    this.loadReports()
  },
  methods: {
    async loadReports() {
      this.loading = true
      try {
        // 模拟报告数据
        this.reports = [
          {
            id: '1',
            title: '血常规检查',
            date: '2024-01-15',
            hospital: '北京协和医院',
            department: '检验科',
            status: 'normal',
            summary: [
              { label: '白细胞', value: '6.5×10⁹/L', abnormal: false },
              { label: '红细胞', value: '4.2×10¹²/L', abnormal: false },
              { label: '血红蛋白', value: '135g/L', abnormal: false },
              { label: '血小板', value: '180×10⁹/L', abnormal: false }
            ]
          },
          {
            id: '2',
            title: '肝功能检查',
            date: '2024-01-10',
            hospital: '北京大学第一医院',
            department: '检验科',
            status: 'abnormal',
            summary: [
              { label: 'ALT', value: '85U/L', abnormal: true },
              { label: 'AST', value: '65U/L', abnormal: true },
              { label: '总胆红素', value: '15μmol/L', abnormal: false },
              { label: '白蛋白', value: '42g/L', abnormal: false }
            ]
          },
          {
            id: '3',
            title: '心电图检查',
            date: '2024-01-05',
            hospital: '清华大学附属医院',
            department: '心内科',
            status: 'normal',
            summary: [
              { label: '心率', value: '72次/分', abnormal: false },
              { label: '心律', value: '窦性心律', abnormal: false },
              { label: 'PR间期', value: '0.16s', abnormal: false },
              { label: 'QT间期', value: '0.42s', abnormal: false }
            ]
          },
          {
            id: '4',
            title: '胸部X线检查',
            date: '2023-12-20',
            hospital: '北京协和医院',
            department: '放射科',
            status: 'normal',
            summary: [
              { label: '肺部', value: '未见异常', abnormal: false },
              { label: '心脏', value: '大小正常', abnormal: false },
              { label: '纵隔', value: '无异常', abnormal: false },
              { label: '胸膜', value: '无积液', abnormal: false }
            ]
          }
        ]
        
        this.filteredReports = [...this.reports]
      } catch (error) {
        console.error('加载报告失败:', error)
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    setFilter(filter) {
      this.activeFilter = filter
      this.filterReports()
    },
    
    filterReports() {
      let filtered = [...this.reports]
      
      switch (this.activeFilter) {
        case 'recent':
          // 最近30天
          const thirtyDaysAgo = new Date()
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          filtered = filtered.filter(report => new Date(report.date) >= thirtyDaysAgo)
          break
        case 'abnormal':
          filtered = filtered.filter(report => report.status === 'abnormal')
          break
        default:
          break
      }
      
      this.filteredReports = filtered
    },
    
    getStatusText(status) {
      const statusMap = {
        normal: '正常',
        abnormal: '异常',
        pending: '待审核'
      }
      return statusMap[status] || '未知'
    },
    
    viewReportDetail(report) {
      uni.navigateTo({
        url: `/pages/medical/report-detail?id=${report.id}`
      })
    },
    
    shareReport(report) {
      uni.showActionSheet({
        itemList: ['分享给医生', '分享给家人', '导出PDF'],
        success: (res) => {
          const actions = ['shareToDoctor', 'shareToFamily', 'exportPDF']
          const action = actions[res.tapIndex]
          
          switch (action) {
            case 'shareToDoctor':
              this.shareToDoctor(report)
              break
            case 'shareToFamily':
              this.shareToFamily(report)
              break
            case 'exportPDF':
              this.exportPDF(report)
              break
          }
        }
      })
    },
    
    async shareToDoctor(report) {
      try {
        const result = await shareMedicalReport({
          reportId: report.id,
          shareType: 'doctor',
          shareTarget: 'all'
        })
        
        if (result.code === 0) {
          uni.showToast({
            title: '分享成功',
            icon: 'success'
          })
        }
      } catch (error) {
        uni.showToast({
          title: '分享失败',
          icon: 'none'
        })
      }
    },
    
    async shareToFamily(report) {
      try {
        const result = await shareMedicalReport({
          reportId: report.id,
          shareType: 'family',
          shareTarget: 'all'
        })
        
        if (result.code === 0) {
          uni.showToast({
            title: '分享成功',
            icon: 'success'
          })
        }
      } catch (error) {
        uni.showToast({
          title: '分享失败',
          icon: 'none'
        })
      }
    },
    
    exportPDF(report) {
      uni.showLoading({
        title: '导出中...'
      })
      
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '导出成功',
          icon: 'success'
        })
      }, 2000)
    },
    
    addReport() {
      uni.navigateTo({
        url: '/pages/medical/add-report'
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

.filter-section {
  margin-bottom: 20px;
}

.filter-tabs {
  display: flex;
  background-color: #fff;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-tab {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  transition: all 0.3s ease;
}

.filter-tab.active {
  background-color: #6C63FF;
  color: white;
}

.report-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.report-item {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.report-info {
  flex: 1;
}

.report-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.report-date {
  font-size: 14px;
  color: #666;
}

.report-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.report-status.normal {
  background-color: #e8f5e8;
  color: #52c41a;
}

.report-status.abnormal {
  background-color: #fff2f0;
  color: #ff4d4f;
}

.report-status.pending {
  background-color: #fff7e6;
  color: #fa8c16;
}

.report-details {
  margin-bottom: 15px;
}

.hospital-name, .department-name {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.report-summary {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.summary-item {
  display: flex;
  margin-bottom: 8px;
}

.summary-item:last-child {
  margin-bottom: 0;
}

.item-label {
  width: 80px;
  font-size: 14px;
  color: #666;
}

.item-value {
  flex: 1;
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.item-value.abnormal {
  color: #ff4d4f;
}

.report-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  height: 40px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  border: none;
}

.view-btn {
  background-color: #6C63FF;
  color: white;
}

.share-btn {
  background-color: #fff;
  color: #6C63FF;
  border: 1px solid #6C63FF;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 15px;
}

.empty-text {
  font-size: 16px;
  color: #999;
}

.add-report-section {
  position: fixed;
  bottom: 30px;
  left: 20px;
  right: 20px;
}

.add-report-btn {
  width: 100%;
  height: 50px;
  background-color: #6C63FF;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
}
</style> 