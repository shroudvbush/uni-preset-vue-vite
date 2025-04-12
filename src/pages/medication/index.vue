<template>
  <view class="container">
    <view class="header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">用药提醒</text>
      <view class="header-placeholder"></view>
    </view>
    
    <view class="content">
      <view class="medication-list" v-if="medications.length > 0">
        <view class="medication-item" v-for="(item, index) in medications" :key="index">
          <view class="medication-info">
            <text class="medication-name">{{ item.name }}</text>
            <text class="medication-dosage">{{ item.dosage }}</text>
          </view>
          <view class="delete-button" @click="deleteMedication(index)">
            <text class="delete-icon">×</text>
          </view>
        </view>
      </view>
      
      <view class="empty-state" v-else>
        <text class="empty-text">暂无用药提醒，请添加</text>
      </view>
      
      <view class="input-form">
        <view class="form-row">
          <view class="input-group">
            <text class="input-label">药名</text>
            <input 
              class="input-field"
              v-model="newMedication.name"
              placeholder="请输入药品名称"
            />
          </view>
          
          <view class="input-group">
            <text class="input-label">用量</text>
            <input 
              class="input-field"
              v-model="newMedication.dosage"
              placeholder="如：2粒/次"
            />
          </view>
        </view>
      </view>
      
      <view class="action-buttons">
        <button class="add-button" @click="addMedication">添加用药</button>
        <button class="delete-all-button" @click="deleteAllMedications" v-if="medications.length > 0">删除用药</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      medications: [],
      newMedication: {
        name: '',
        dosage: ''
      }
    }
  },
  onLoad() {
    // 加载已保存的用药提醒数据
    const savedMedications = uni.getStorageSync('medications');
    if (savedMedications) {
      this.medications = JSON.parse(savedMedications);
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    addMedication() {
      if (!this.newMedication.name || !this.newMedication.dosage) {
        uni.showToast({
          title: '请填写药品名称和用量',
          icon: 'none'
        });
        return;
      }
      
      this.medications.push({
        name: this.newMedication.name,
        dosage: this.newMedication.dosage
      });
      
      // 保存到本地存储
      uni.setStorageSync('medications', JSON.stringify(this.medications));
      
      // 清空输入
      this.newMedication.name = '';
      this.newMedication.dosage = '';
      
      uni.showToast({
        title: '添加成功',
        icon: 'success'
      });
    },
    deleteMedication(index) {
      uni.showModal({
        title: '提示',
        content: '确定要删除这条用药提醒吗？',
        success: res => {
          if (res.confirm) {
            this.medications.splice(index, 1);
            // 保存到本地存储
            uni.setStorageSync('medications', JSON.stringify(this.medications));
          }
        }
      });
    },
    deleteAllMedications() {
      uni.showModal({
        title: '提示',
        content: '确定要删除所有用药提醒吗？',
        success: res => {
          if (res.confirm) {
            this.medications = [];
            // 保存到本地存储
            uni.setStorageSync('medications', JSON.stringify(this.medications));
          }
        }
      });
    }
  }
}
</script>

<style>
.container {
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #fff;
  position: relative;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  width: 100%;
  box-sizing: border-box;
}

.back-button {
  width: 30px;
  display: flex;
  align-items: center;
}

.back-icon {
  font-size: 24px;
  color: #333;
}

.page-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

.header-placeholder {
  width: 30px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.medication-list {
  margin-bottom: 20px;
}

.medication-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 10px;
}

.medication-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding-right: 15px;
}

.medication-name {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.medication-dosage {
  font-size: 16px;
  color: #666;
}

.delete-button {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff5252;
  border-radius: 50%;
}

.delete-icon {
  color: #fff;
  font-size: 20px;
  line-height: 20px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
}

.empty-text {
  font-size: 16px;
  color: #999;
}

.input-form {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.input-group {
  flex: 1;
  margin: 0 5px;
}

.input-label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  height: 45px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0 10px;
  background-color: #fff;
  box-sizing: border-box;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.add-button {
  height: 45px;
  background-color: #1e88e5;
  color: #fff;
  border-radius: 22.5px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-all-button {
  height: 45px;
  background-color: #f5f5f5;
  color: #ff5252;
  border-radius: 22.5px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 