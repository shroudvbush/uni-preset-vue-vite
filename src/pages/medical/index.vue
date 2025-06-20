<template>
  <view class="container">
    <page-header title="医疗服务"></page-header>
    
    <view class="content">
      <!-- 快速服务 -->
      <view class="quick-services">
        <view class="service-grid">
          <view class="service-item" @click="navigateTo('/pages/medical/hospital')">
            <view class="service-icon">🏥</view>
            <text class="service-name">医院挂号</text>
          </view>
          
          <view class="service-item" @click="navigateTo('/pages/medical/consultation')">
            <view class="service-icon">👨‍⚕️</view>
            <text class="service-name">在线问诊</text>
          </view>
          
          <view class="service-item" @click="navigateTo('/pages/medical/reports')">
            <view class="service-icon">📋</view>
            <text class="service-name">检查报告</text>
          </view>
          
          <view class="service-item" @click="navigateTo('/pages/medical/appointment')">
            <view class="service-icon">📅</view>
            <text class="service-name">我的预约</text>
          </view>
        </view>
      </view>
      
      <!-- 最近预约 -->
      <view class="recent-section" v-if="recentAppointments.length > 0">
        <view class="section-title">最近预约</view>
        <view class="appointment-list">
          <view 
            class="appointment-item" 
            v-for="(appointment, index) in recentAppointments" 
            :key="index"
            @click="viewAppointmentDetail(appointment)"
          >
            <view class="appointment-info">
              <text class="hospital-name">{{ appointment.hospitalName }}</text>
              <text class="department-name">{{ appointment.departmentName }}</text>
              <text class="doctor-name">{{ appointment.doctorName }}</text>
              <text class="appointment-time">{{ appointment.appointmentDate }} {{ appointment.appointmentTime }}</text>
            </view>
            <view class="appointment-status" :class="appointment.status">
              <text>{{ getStatusText(appointment.status) }}</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 推荐医院 -->
      <view class="recommend-section">
        <view class="section-title">推荐医院</view>
        <view class="hospital-list">
          <view 
            class="hospital-item" 
            v-for="(hospital, index) in recommendHospitals" 
            :key="index"
            @click="viewHospitalDetail(hospital)"
          >
            <view class="hospital-info">
              <text class="hospital-name">{{ hospital.name }}</text>
              <text class="hospital-address">{{ hospital.address }}</text>
              <text class="hospital-rating">评分: {{ hospital.rating }}分</text>
            </view>
            <view class="hospital-distance">
              <text>{{ hospital.distance }}km</text>
            </view>
          </view>
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
          >
            <view class="reminder-icon">🔔</view>
            <view class="reminder-content">
              <text class="reminder-title">{{ reminder.title }}</text>
              <text class="reminder-time">{{ reminder.time }}</text>
            </view>
            <view class="reminder-action">
              <button class="action-btn" @click="handleReminder(reminder)">处理</button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { getAppointmentList, getHospitalList } from '@/api/medical.js'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      recentAppointments: [],
      recommendHospitals: [],
      healthReminders: [],
      loading: false
    }
  },
  onLoad() {
    this.loadData()
  },
  onShow() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        // 加载最近预约
        const appointmentRes = await getAppointmentList({
          status: 'all',
          limit: 3
        })
        if (appointmentRes.code === 0) {
          this.recentAppointments = appointmentRes.data.slice(0, 3)
        }
        
        // 加载推荐医院
        const hospitalRes = await getHospitalList({
          recommend: true,
          limit: 5
        })
        if (hospitalRes.code === 0) {
          this.recommendHospitals = hospitalRes.data
        }
        
        // 模拟健康提醒数据
        this.healthReminders = [
          {
            id: 1,
            title: '血压检查提醒',
            time: '今天 14:00',
            type: 'blood_pressure'
          },
          {
            id: 2,
            title: '复诊提醒',
            time: '明天 09:30',
            type: 'follow_up'
          }
        ]
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
      uni.navigateTo({ url })
    },
    
    viewAppointmentDetail(appointment) {
      uni.navigateTo({
        url: `/pages/medical/appointment?id=${appointment.id}`
      })
    },
    
    viewHospitalDetail(hospital) {
      uni.navigateTo({
        url: `/pages/medical/hospital?id=${hospital.id}`
      })
    },
    
    getStatusText(status) {
      const statusMap = {
        'pending': '待确认',
        'confirmed': '已确认',
        'completed': '已完成',
        'cancelled': '已取消'
      }
      return statusMap[status] || status
    },
    
    handleReminder(reminder) {
      switch (reminder.type) {
        case 'blood_pressure':
          uni.navigateTo({
            url: '/pages/health-records/index'
          })
          break
        case 'follow_up':
          uni.navigateTo({
            url: '/pages/medical/appointment'
          })
          break
        default:
          uni.showToast({
            title: '已处理',
            icon: 'success'
          })
      }
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

.quick-services {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.service-item:active {
  background-color: #e9ecef;
  transform: scale(0.98);
}

.service-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.service-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.recent-section, .recommend-section, .reminder-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.appointment-list, .hospital-list, .reminder-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.appointment-item, .hospital-item, .reminder-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.appointment-info, .hospital-info, .reminder-content {
  flex: 1;
}

.hospital-name, .appointment-info .hospital-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.department-name, .doctor-name, .appointment-time {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 3px;
}

.hospital-address, .hospital-rating {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 3px;
}

.appointment-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
}

.appointment-status.pending {
  background-color: #ffc107;
}

.appointment-status.confirmed {
  background-color: #28a745;
}

.appointment-status.completed {
  background-color: #6c757d;
}

.appointment-status.cancelled {
  background-color: #dc3545;
}

.hospital-distance {
  font-size: 14px;
  color: #666;
}

.reminder-item {
  align-items: flex-start;
}

.reminder-icon {
  font-size: 20px;
  margin-right: 15px;
  margin-top: 2px;
}

.reminder-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.reminder-time {
  font-size: 14px;
  color: #666;
}

.action-btn {
  background-color: #6C63FF;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 6px 12px;
  font-size: 12px;
}
</style> 