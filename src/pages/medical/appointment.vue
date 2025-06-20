<template>
  <view class="container">
    <page-header title="预约挂号"></page-header>
    
    <view class="content">
      <!-- 医院信息 -->
      <view class="hospital-info" v-if="hospitalInfo">
        <view class="hospital-header">
          <text class="hospital-name">{{ hospitalInfo.name }}</text>
          <text class="hospital-level">{{ hospitalInfo.level }}</text>
        </view>
        <text class="hospital-address">📍 {{ hospitalInfo.address }}</text>
      </view>
      
      <!-- 科室选择 -->
      <view class="section">
        <view class="section-title">选择科室</view>
        <view class="department-grid">
          <view 
            class="department-item" 
            :class="{ active: selectedDepartment === dept.id }"
            v-for="dept in departments" 
            :key="dept.id"
            @click="selectDepartment(dept)"
          >
            <text class="department-icon">{{ dept.icon }}</text>
            <text class="department-name">{{ dept.name }}</text>
          </view>
        </view>
      </view>
      
      <!-- 医生选择 -->
      <view class="section" v-if="selectedDepartment">
        <view class="section-title">选择医生</view>
        <view class="doctor-list">
          <view 
            class="doctor-item" 
            :class="{ active: selectedDoctor === doctor.id }"
            v-for="doctor in doctors" 
            :key="doctor.id"
            @click="selectDoctor(doctor)"
          >
            <view class="doctor-avatar">
              <text>{{ doctor.name.charAt(0) }}</text>
            </view>
            <view class="doctor-info">
              <view class="doctor-header">
                <text class="doctor-name">{{ doctor.name }}</text>
                <text class="doctor-title">{{ doctor.title }}</text>
              </view>
              <text class="doctor-specialty">{{ doctor.specialty }}</text>
              <view class="doctor-rating">
                <text class="rating-score">{{ doctor.rating }}</text>
                <text class="rating-star">⭐</text>
                <text class="consultation-count">已接诊 {{ doctor.consultationCount }} 人</text>
              </view>
            </view>
            <view class="doctor-fee">
              <text class="fee-amount">¥{{ doctor.fee }}</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 日期选择 -->
      <view class="section" v-if="selectedDoctor">
        <view class="section-title">选择日期</view>
        <view class="date-picker">
          <view 
            class="date-item" 
            :class="{ active: selectedDate === date.value }"
            v-for="date in availableDates" 
            :key="date.value"
            @click="selectDate(date)"
          >
            <text class="date-day">{{ date.day }}</text>
            <text class="date-value">{{ date.value }}</text>
            <text class="date-status">{{ date.status }}</text>
          </view>
        </view>
      </view>
      
      <!-- 时间段选择 -->
      <view class="section" v-if="selectedDate">
        <view class="section-title">选择时间段</view>
        <view class="time-grid">
          <view 
            class="time-item" 
            :class="{ active: selectedTime === time.value, disabled: !time.available }"
            v-for="time in availableTimes" 
            :key="time.value"
            @click="selectTime(time)"
          >
            <text>{{ time.label }}</text>
          </view>
        </view>
      </view>
      
      <!-- 患者信息 -->
      <view class="section">
        <view class="section-title">患者信息</view>
        <view class="patient-form">
          <view class="form-item">
            <text class="form-label">姓名</text>
            <input 
              class="form-input"
              v-model="patientInfo.name"
              placeholder="请输入患者姓名"
            />
          </view>
          <view class="form-item">
            <text class="form-label">身份证号</text>
            <input 
              class="form-input"
              v-model="patientInfo.idCard"
              placeholder="请输入身份证号"
              type="idcard"
            />
          </view>
          <view class="form-item">
            <text class="form-label">手机号</text>
            <input 
              class="form-input"
              v-model="patientInfo.phone"
              placeholder="请输入手机号"
              type="number"
            />
          </view>
        </view>
      </view>
      
      <!-- 预约信息 -->
      <view class="appointment-summary" v-if="isFormComplete">
        <view class="summary-title">预约信息</view>
        <view class="summary-item">
          <text class="summary-label">医院：</text>
          <text class="summary-value">{{ hospitalInfo?.name }}</text>
        </view>
        <view class="summary-item">
          <text class="summary-label">科室：</text>
          <text class="summary-value">{{ selectedDepartmentInfo?.name }}</text>
        </view>
        <view class="summary-item">
          <text class="summary-label">医生：</text>
          <text class="summary-value">{{ selectedDoctorInfo?.name }}</text>
        </view>
        <view class="summary-item">
          <text class="summary-label">时间：</text>
          <text class="summary-value">{{ selectedDate }} {{ selectedTime }}</text>
        </view>
        <view class="summary-item">
          <text class="summary-label">费用：</text>
          <text class="summary-value fee">¥{{ selectedDoctorInfo?.fee || 0 }}</text>
        </view>
      </view>
      
      <!-- 提交按钮 -->
      <view class="submit-section">
        <button 
          class="submit-btn" 
          :disabled="!isFormComplete"
          @click="submitAppointment"
        >
          <text>确认预约</text>
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { makeAppointment } from '@/api/medical.js'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      hospitalId: '',
      hospitalInfo: null,
      departments: [],
      doctors: [],
      availableDates: [],
      availableTimes: [],
      selectedDepartment: '',
      selectedDoctor: '',
      selectedDate: '',
      selectedTime: '',
      patientInfo: {
        name: '',
        idCard: '',
        phone: ''
      }
    }
  },
  computed: {
    selectedDepartmentInfo() {
      return this.departments.find(dept => dept.id === this.selectedDepartment)
    },
    selectedDoctorInfo() {
      return this.doctors.find(doctor => doctor.id === this.selectedDoctor)
    },
    isFormComplete() {
      return this.selectedDepartment && 
             this.selectedDoctor && 
             this.selectedDate && 
             this.selectedTime &&
             this.patientInfo.name &&
             this.patientInfo.idCard &&
             this.patientInfo.phone
    }
  },
  onLoad(options) {
    if (options.hospitalId) {
      this.hospitalId = options.hospitalId
      this.loadHospitalInfo()
      this.loadDepartments()
    }
  },
  methods: {
    async loadHospitalInfo() {
      // 模拟医院信息
      this.hospitalInfo = {
        id: this.hospitalId,
        name: '北京协和医院',
        level: '三甲医院',
        address: '北京市东城区东单帅府园1号'
      }
    },
    
    async loadDepartments() {
      // 模拟科室数据
      this.departments = [
        { id: '1', name: '内科', icon: '🏥' },
        { id: '2', name: '外科', icon: '🔪' },
        { id: '3', name: '妇产科', icon: '👶' },
        { id: '4', name: '儿科', icon: '👶' },
        { id: '5', name: '眼科', icon: '👁️' },
        { id: '6', name: '骨科', icon: '🦴' }
      ]
    },
    
    async selectDepartment(department) {
      this.selectedDepartment = department.id
      this.selectedDoctor = ''
      this.selectedDate = ''
      this.selectedTime = ''
      await this.loadDoctors()
    },
    
    async loadDoctors() {
      // 模拟医生数据
      this.doctors = [
        {
          id: '1',
          name: '张医生',
          title: '主任医师',
          specialty: '心血管疾病',
          rating: 4.8,
          consultationCount: 1250,
          fee: 50
        },
        {
          id: '2',
          name: '李医生',
          title: '副主任医师',
          specialty: '消化系统疾病',
          rating: 4.6,
          consultationCount: 980,
          fee: 40
        },
        {
          id: '3',
          name: '王医生',
          title: '主治医师',
          specialty: '呼吸系统疾病',
          rating: 4.5,
          consultationCount: 750,
          fee: 30
        }
      ]
    },
    
    async selectDoctor(doctor) {
      this.selectedDoctor = doctor.id
      this.selectedDate = ''
      this.selectedTime = ''
      await this.loadAvailableDates()
    },
    
    async loadAvailableDates() {
      // 模拟可用日期
      const today = new Date()
      this.availableDates = []
      
      for (let i = 1; i <= 7; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        
        this.availableDates.push({
          value: this.formatDate(date),
          day: this.getDayName(date.getDay()),
          status: i <= 3 ? '可预约' : '约满'
        })
      }
    },
    
    async selectDate(date) {
      this.selectedDate = date.value
      this.selectedTime = ''
      await this.loadAvailableTimes()
    },
    
    async loadAvailableTimes() {
      // 模拟可用时间段
      this.availableTimes = [
        { value: '09:00', label: '09:00', available: true },
        { value: '09:30', label: '09:30', available: true },
        { value: '10:00', label: '10:00', available: false },
        { value: '10:30', label: '10:30', available: true },
        { value: '14:00', label: '14:00', available: true },
        { value: '14:30', label: '14:30', available: true },
        { value: '15:00', label: '15:00', available: false },
        { value: '15:30', label: '15:30', available: true }
      ]
    },
    
    selectTime(time) {
      if (time.available) {
        this.selectedTime = time.value
      }
    },
    
    formatDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    
    getDayName(day) {
      const days = ['日', '一', '二', '三', '四', '五', '六']
      return `周${days[day]}`
    },
    
    async submitAppointment() {
      if (!this.isFormComplete) {
        uni.showToast({
          title: '请完善预约信息',
          icon: 'none'
        })
        return
      }
      
      try {
        uni.showLoading({
          title: '预约中...'
        })
        
        const appointmentData = {
          hospitalId: this.hospitalId,
          departmentId: this.selectedDepartment,
          doctorId: this.selectedDoctor,
          appointmentDate: this.selectedDate,
          appointmentTime: this.selectedTime,
          patientInfo: this.patientInfo
        }
        
        const result = await makeAppointment(appointmentData)
        
        if (result.code === 0) {
          uni.showToast({
            title: '预约成功',
            icon: 'success'
          })
          
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        } else {
          uni.showToast({
            title: result.message || '预约失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('预约失败:', error)
        uni.showToast({
          title: '预约失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
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

.hospital-info {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.hospital-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.hospital-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

.hospital-level {
  background-color: #6C63FF;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.hospital-address {
  font-size: 14px;
  color: #666;
}

.section {
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

.department-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.department-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.department-item.active {
  border-color: #6C63FF;
  background-color: #f8f9ff;
}

.department-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.department-name {
  font-size: 14px;
  color: #333;
  text-align: center;
}

.doctor-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.doctor-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.doctor-item.active {
  border-color: #6C63FF;
  background-color: #f8f9ff;
}

.doctor-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6C63FF 0%, #8B7CF6 100%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-right: 15px;
}

.doctor-info {
  flex: 1;
}

.doctor-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.doctor-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

.doctor-title {
  background-color: #f0f0f0;
  color: #666;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 12px;
}

.doctor-specialty {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.doctor-rating {
  display: flex;
  align-items: center;
}

.rating-score {
  font-size: 14px;
  font-weight: bold;
  color: #ff6b6b;
  margin-right: 5px;
}

.rating-star {
  font-size: 12px;
  margin-right: 10px;
}

.consultation-count {
  font-size: 12px;
  color: #999;
}

.doctor-fee {
  text-align: right;
}

.fee-amount {
  font-size: 18px;
  font-weight: bold;
  color: #ff6b6b;
}

.date-picker {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.date-item {
  min-width: 80px;
  padding: 15px 10px;
  border: 2px solid #f0f0f0;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
}

.date-item.active {
  border-color: #6C63FF;
  background-color: #f8f9ff;
}

.date-day {
  font-size: 12px;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.date-value {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.date-status {
  font-size: 12px;
  color: #6C63FF;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.time-item {
  padding: 12px 8px;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #333;
  transition: all 0.3s ease;
}

.time-item.active {
  border-color: #6C63FF;
  background-color: #f8f9ff;
  color: #6C63FF;
}

.time-item.disabled {
  border-color: #e0e0e0;
  background-color: #f8f8f8;
  color: #ccc;
}

.patient-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-item {
  display: flex;
  align-items: center;
}

.form-label {
  width: 80px;
  font-size: 16px;
  color: #333;
  font-weight: bold;
}

.form-input {
  flex: 1;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 16px;
}

.appointment-summary {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.summary-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.summary-item {
  display: flex;
  margin-bottom: 10px;
}

.summary-label {
  width: 80px;
  font-size: 14px;
  color: #666;
}

.summary-value {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.summary-value.fee {
  color: #ff6b6b;
  font-weight: bold;
}

.submit-section {
  margin-top: 30px;
}

.submit-btn {
  width: 100%;
  height: 50px;
  background-color: #6C63FF;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
}

.submit-btn:disabled {
  background-color: #ccc;
  color: #999;
}
</style> 