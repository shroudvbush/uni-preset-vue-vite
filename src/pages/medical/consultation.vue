<template>
  <view class="container">
    <page-header title="在线问诊"></page-header>
    
    <view class="content">
      <!-- 问诊类型选择 -->
      <view class="consultation-types">
        <view class="type-item" :class="{ active: selectedType === 'text' }" @click="selectType('text')">
          <text class="type-icon">💬</text>
          <text class="type-name">图文问诊</text>
          <text class="type-desc">文字描述症状</text>
        </view>
        <view class="type-item" :class="{ active: selectedType === 'voice' }" @click="selectType('voice')">
          <text class="type-icon">🎤</text>
          <text class="type-name">语音问诊</text>
          <text class="type-desc">语音描述症状</text>
        </view>
        <view class="type-item" :class="{ active: selectedType === 'video' }" @click="selectType('video')">
          <text class="type-icon">📹</text>
          <text class="type-name">视频问诊</text>
          <text class="type-desc">面对面交流</text>
        </view>
      </view>
      
      <!-- 科室选择 -->
      <view class="section">
        <view class="section-title">选择科室</view>
        <view class="department-list">
          <view 
            class="department-item" 
            :class="{ active: selectedDepartment === dept.id }"
            v-for="dept in departments" 
            :key="dept.id"
            @click="selectDepartment(dept)"
          >
            <text class="department-icon">{{ dept.icon }}</text>
            <text class="department-name">{{ dept.name }}</text>
            <text class="department-desc">{{ dept.desc }}</text>
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
              <text class="doctor-hospital">{{ doctor.hospital }}</text>
              <text class="doctor-specialty">{{ doctor.specialty }}</text>
              <view class="doctor-stats">
                <text class="stat-item">评分 {{ doctor.rating }}</text>
                <text class="stat-item">接诊 {{ doctor.consultationCount }}</text>
                <text class="stat-item">回复率 {{ doctor.responseRate }}%</text>
              </view>
            </view>
            <view class="doctor-fee">
              <text class="fee-amount">¥{{ doctor.fee }}</text>
              <text class="fee-unit">/次</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 症状描述 -->
      <view class="section" v-if="selectedDoctor">
        <view class="section-title">症状描述</view>
        <view class="symptom-form">
          <view class="form-item">
            <text class="form-label">主要症状</text>
            <textarea 
              class="form-textarea"
              v-model="symptomInfo.mainSymptom"
              placeholder="请详细描述您的主要症状..."
              maxlength="500"
            />
            <text class="char-count">{{ symptomInfo.mainSymptom.length }}/500</text>
          </view>
          
          <view class="form-item">
            <text class="form-label">症状持续时间</text>
            <picker 
              class="form-picker"
              :value="durationIndex"
              :range="durationOptions"
              @change="onDurationChange"
            >
              <view class="picker-text">
                {{ durationOptions[durationIndex] || '请选择持续时间' }}
              </view>
            </picker>
          </view>
          
          <view class="form-item">
            <text class="form-label">是否有过敏史</text>
            <switch 
              :checked="symptomInfo.hasAllergy" 
              @change="onAllergyChange"
              color="#6C63FF"
            />
          </view>
          
          <view class="form-item" v-if="symptomInfo.hasAllergy">
            <text class="form-label">过敏史详情</text>
            <textarea 
              class="form-textarea"
              v-model="symptomInfo.allergyDetails"
              placeholder="请描述您的过敏史..."
              maxlength="200"
            />
          </view>
        </view>
      </view>
      
      <!-- 图片上传 -->
      <view class="section" v-if="selectedDoctor">
        <view class="section-title">上传图片（可选）</view>
        <view class="image-upload">
          <view class="upload-grid">
            <view 
              class="upload-item" 
              v-for="(image, index) in symptomInfo.images" 
              :key="index"
            >
              <image :src="image" class="uploaded-image" />
              <view class="delete-btn" @click="deleteImage(index)">×</view>
            </view>
            <view class="upload-btn" @click="chooseImage" v-if="symptomInfo.images.length < 6">
              <text class="upload-icon">+</text>
              <text class="upload-text">添加图片</text>
            </view>
          </view>
          <text class="upload-tip">最多可上传6张图片，支持jpg、png格式</text>
        </view>
      </view>
      
      <!-- 问诊费用 -->
      <view class="fee-section" v-if="selectedDoctor">
        <view class="fee-info">
          <text class="fee-label">问诊费用</text>
          <text class="fee-amount">¥{{ selectedDoctorInfo?.fee || 0 }}</text>
        </view>
        <text class="fee-desc">包含医生回复和后续3天内免费追问</text>
      </view>
      
      <!-- 提交按钮 -->
      <view class="submit-section">
        <button 
          class="submit-btn" 
          :disabled="!isFormComplete"
          @click="submitConsultation"
        >
          <text>提交问诊</text>
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
      selectedType: 'text',
      selectedDepartment: '',
      selectedDoctor: '',
      departments: [],
      doctors: [],
      durationIndex: -1,
      durationOptions: ['1-3天', '3-7天', '1-2周', '2-4周', '1-3个月', '3个月以上'],
      symptomInfo: {
        mainSymptom: '',
        duration: '',
        hasAllergy: false,
        allergyDetails: '',
        images: []
      }
    }
  },
  computed: {
    selectedDoctorInfo() {
      return this.doctors.find(doctor => doctor.id === this.selectedDoctor)
    },
    isFormComplete() {
      return this.selectedDepartment && 
             this.selectedDoctor && 
             this.symptomInfo.mainSymptom.trim()
    }
  },
  onLoad() {
    this.loadDepartments()
  },
  methods: {
    selectType(type) {
      this.selectedType = type
    },
    
    async loadDepartments() {
      // 模拟科室数据
      this.departments = [
        { id: '1', name: '内科', icon: '🏥', desc: '内科疾病' },
        { id: '2', name: '外科', icon: '🔪', desc: '外科疾病' },
        { id: '3', name: '妇产科', icon: '👶', desc: '妇科产科' },
        { id: '4', name: '儿科', icon: '👶', desc: '儿童疾病' },
        { id: '5', name: '皮肤科', icon: '🦠', desc: '皮肤病' },
        { id: '6', name: '眼科', icon: '👁️', desc: '眼部疾病' },
        { id: '7', name: '骨科', icon: '🦴', desc: '骨科疾病' },
        { id: '8', name: '心理科', icon: '🧠', desc: '心理健康' }
      ]
    },
    
    async selectDepartment(department) {
      this.selectedDepartment = department.id
      this.selectedDoctor = ''
      await this.loadDoctors()
    },
    
    async loadDoctors() {
      // 模拟医生数据
      this.doctors = [
        {
          id: '1',
          name: '张医生',
          title: '主任医师',
          hospital: '北京协和医院',
          specialty: '心血管疾病',
          rating: 4.8,
          consultationCount: 1250,
          responseRate: 98,
          fee: 50
        },
        {
          id: '2',
          name: '李医生',
          title: '副主任医师',
          hospital: '北京大学第一医院',
          specialty: '消化系统疾病',
          rating: 4.6,
          consultationCount: 980,
          responseRate: 95,
          fee: 40
        },
        {
          id: '3',
          name: '王医生',
          title: '主治医师',
          hospital: '清华大学附属医院',
          specialty: '呼吸系统疾病',
          rating: 4.5,
          consultationCount: 750,
          responseRate: 92,
          fee: 30
        }
      ]
    },
    
    selectDoctor(doctor) {
      this.selectedDoctor = doctor.id
    },
    
    onDurationChange(e) {
      this.durationIndex = e.detail.value
      this.symptomInfo.duration = this.durationOptions[this.durationIndex]
    },
    
    onAllergyChange(e) {
      this.symptomInfo.hasAllergy = e.detail.value
      if (!this.symptomInfo.hasAllergy) {
        this.symptomInfo.allergyDetails = ''
      }
    },
    
    chooseImage() {
      uni.chooseImage({
        count: 6 - this.symptomInfo.images.length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.symptomInfo.images = [...this.symptomInfo.images, ...res.tempFilePaths]
        }
      })
    },
    
    deleteImage(index) {
      this.symptomInfo.images.splice(index, 1)
    },
    
    async submitConsultation() {
      if (!this.isFormComplete) {
        uni.showToast({
          title: '请完善问诊信息',
          icon: 'none'
        })
        return
      }
      
      try {
        uni.showLoading({
          title: '提交中...'
        })
        
        const consultationData = {
          type: this.selectedType,
          departmentId: this.selectedDepartment,
          doctorId: this.selectedDoctor,
          symptomInfo: this.symptomInfo
        }
        
        // 这里需要根据实际情况实现提交逻辑
        // 这里只是一个示例，实际提交逻辑需要根据后端接口来实现
        uni.showToast({
          title: '提交成功',
          icon: 'success'
        })
        
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      } catch (error) {
        console.error('提交问诊失败:', error)
        uni.showToast({
          title: '提交失败',
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

.consultation-types {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.type-item {
  flex: 1;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.type-item.active {
  background-color: #6C63FF;
  color: white;
}

.type-icon {
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
}

.type-name {
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.type-desc {
  font-size: 12px;
  opacity: 0.8;
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

.department-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.department-desc {
  font-size: 12px;
  color: #666;
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

.doctor-hospital {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.doctor-specialty {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.doctor-stats {
  display: flex;
  gap: 15px;
}

.stat-item {
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

.fee-unit {
  font-size: 12px;
  color: #999;
}

.symptom-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  position: relative;
}

.form-label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10px;
}

.form-textarea {
  width: 100%;
  min-height: 100px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  box-sizing: border-box;
}

.char-count {
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 12px;
  color: #999;
}

.form-picker {
  width: 100%;
  height: 50px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
}

.picker-text {
  font-size: 16px;
  color: #333;
}

.image-upload {
  margin-top: 10px;
}

.upload-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 10px;
}

.upload-item {
  position: relative;
  width: 100%;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.uploaded-image {
  width: 100%;
  height: 100%;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.upload-btn {
  width: 100%;
  height: 80px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}

.upload-icon {
  font-size: 24px;
  color: #999;
  margin-bottom: 5px;
}

.upload-text {
  font-size: 12px;
  color: #999;
}

.upload-tip {
  font-size: 12px;
  color: #999;
}

.fee-section {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.fee-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.fee-label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.fee-amount {
  font-size: 20px;
  font-weight: bold;
  color: #ff6b6b;
}

.fee-desc {
  font-size: 12px;
  color: #666;
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