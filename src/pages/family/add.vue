<template>
  <view class="container">
    <page-header title="添加家庭成员"></page-header>
    
    <view class="content">
      <view class="form-section">
        <view class="form-item">
          <text class="form-label">姓名 *</text>
          <input 
            class="form-input"
            v-model="formData.name"
            placeholder="请输入姓名"
            maxlength="20"
          />
        </view>
        
        <view class="form-item">
          <text class="form-label">关系 *</text>
          <picker 
            class="form-picker"
            :value="relationIndex"
            :range="relationOptions"
            @change="onRelationChange"
          >
            <view class="picker-text">
              {{ relationOptions[relationIndex] || '请选择关系' }}
            </view>
          </picker>
        </view>
        
        <view class="form-item">
          <text class="form-label">手机号</text>
          <input 
            class="form-input"
            v-model="formData.phoneNumber"
            placeholder="请输入手机号"
            type="number"
            maxlength="11"
          />
        </view>
        
        <view class="form-item">
          <text class="form-label">性别</text>
          <picker 
            class="form-picker"
            :value="genderIndex"
            :range="genderOptions"
            @change="onGenderChange"
          >
            <view class="picker-text">
              {{ genderOptions[genderIndex] || '请选择性别' }}
            </view>
          </picker>
        </view>
        
        <view class="form-item">
          <text class="form-label">生日</text>
          <picker 
            class="form-picker"
            mode="date"
            :value="formData.birthday"
            @change="onBirthdayChange"
          >
            <view class="picker-text">
              {{ formData.birthday || '请选择生日' }}
            </view>
          </picker>
        </view>
        
        <view class="form-item">
          <text class="form-label">头像</text>
          <view class="avatar-upload" @click="chooseAvatar">
            <view class="avatar-preview" v-if="formData.avatar">
              <image :src="formData.avatar" class="avatar-image" />
            </view>
            <view class="avatar-placeholder" v-else>
              <text class="avatar-icon">📷</text>
              <text class="avatar-text">点击上传头像</text>
            </view>
          </view>
        </view>
      </view>
      
      <view class="sharing-section">
        <view class="section-title">数据共享设置</view>
        <view class="sharing-item">
          <text class="sharing-label">健康数据共享</text>
          <switch 
            :checked="formData.sharingEnabled" 
            @change="onSharingChange"
            color="#6C63FF"
          />
        </view>
        <view class="sharing-desc">
          <text>开启后，该家庭成员可以查看您的健康数据</text>
        </view>
      </view>
      
      <view class="action-buttons">
        <button class="action-btn cancel-btn" @click="cancel">取消</button>
        <button class="action-btn confirm-btn" @click="saveMember" :disabled="!isFormValid">
          保存
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { addFamilyMember } from '@/api/family.js'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      formData: {
        name: '',
        relationship: '',
        phoneNumber: '',
        gender: '',
        birthday: '',
        avatar: '',
        sharingEnabled: true
      },
      relationIndex: -1,
      genderIndex: -1,
      relationOptions: ['父亲', '母亲', '儿子', '女儿', '丈夫', '妻子', '祖父', '祖母', '外祖父', '外祖母', '其他'],
      genderOptions: ['男', '女']
    }
  },
  computed: {
    isFormValid() {
      return this.formData.name.trim() && this.formData.relationship
    }
  },
  methods: {
    onRelationChange(e) {
      this.relationIndex = e.detail.value
      this.formData.relationship = this.relationOptions[this.relationIndex]
    },
    
    onGenderChange(e) {
      this.genderIndex = e.detail.value
      this.formData.gender = this.genderOptions[this.genderIndex]
    },
    
    onBirthdayChange(e) {
      this.formData.birthday = e.detail.value
    },
    
    onSharingChange(e) {
      this.formData.sharingEnabled = e.detail.value
    },
    
    chooseAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.formData.avatar = res.tempFilePaths[0]
        }
      })
    },
    
    async saveMember() {
      if (!this.isFormValid) {
        uni.showToast({
          title: '请填写必填项',
          icon: 'none'
        })
        return
      }
      
      try {
        uni.showLoading({
          title: '保存中...'
        })
        
        const result = await addFamilyMember(this.formData)
        
        if (result.code === 0) {
          uni.showToast({
            title: '添加成功',
            icon: 'success'
          })
          
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        } else {
          uni.showToast({
            title: result.message || '添加失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('添加家庭成员失败:', error)
        uni.showToast({
          title: '添加失败',
          icon: 'none'
        })
      } finally {
        uni.hideLoading()
      }
    },
    
    cancel() {
      uni.navigateBack()
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

.form-section {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.form-item {
  margin-bottom: 20px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  height: 50px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 16px;
  background-color: #fff;
  box-sizing: border-box;
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

.avatar-upload {
  width: 100px;
  height: 100px;
  border: 2px dashed #ddd;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}

.avatar-preview {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
}

.avatar-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-icon {
  font-size: 24px;
  margin-bottom: 5px;
}

.avatar-text {
  font-size: 12px;
  color: #666;
}

.sharing-section {
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

.sharing-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.sharing-label {
  font-size: 16px;
  color: #333;
}

.sharing-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.action-btn {
  flex: 1;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  border: none;
}

.cancel-btn {
  background-color: #f8f9fa;
  color: #666;
  border: 1px solid #e0e0e0;
}

.confirm-btn {
  background-color: #6C63FF;
  color: white;
}

.confirm-btn:disabled {
  background-color: #ccc;
  color: #999;
}
</style> 