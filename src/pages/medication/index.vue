<template>
  <view class="container">
    <page-header title="用药提醒"></page-header>
    
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
import PageHeader from '@/components/PageHeader.vue'

export default {
  components: {
    PageHeader
  },
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
  background-color: #f8f8f8;
  border-radius: 12px;
  margin-bottom: 10px;
}

.medication-info {
  flex: 1;
}

.medication-name {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}

.medication-dosage {
  font-size: 14px;
  color: #666;
}

.delete-button {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
}

.delete-icon {
  font-size: 20px;
  color: #ff6b6b;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.empty-text {
  font-size: 14px;
  color: #999;
}

.input-form {
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.input-group {
  flex: 1;
}

.input-label {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

.input-field {
  width: 100%;
  height: 40px;
  background-color: #fff;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.add-button, .delete-all-button {
  flex: 1;
  height: 45px;
  border-radius: 22.5px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-button {
  background-color: #6C63FF;
  color: white;
  border: none;
}

.delete-all-button {
  background-color: #fff;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
}
</style> 