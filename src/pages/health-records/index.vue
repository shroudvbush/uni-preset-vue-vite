<template>
  <view class="container">
    <page-header title="健康档案"></page-header>
    
    <view class="content">
      <view class="record-list">
        <view class="record-item" v-for="(record, index) in healthRecords" :key="index" @click="viewRecord(record)">
          <view class="record-card">
            <text class="record-date">{{ record.date }}</text>
            <text class="record-title">健康状况</text>
          </view>
        </view>
      </view>
      
      <view class="empty-state" v-if="healthRecords.length === 0">
        <text class="empty-text">暂无健康记录</text>
      </view>
      
      <view class="action-buttons">
        <button class="action-button add-button" @click="addRecord">
          <text>添加</text>
        </button>
        <button class="action-button delete-button" @click="deleteRecord" :disabled="!selectedRecord">
          <text>删除</text>
        </button>
      </view>
      
      <!-- 记录详情弹窗 -->
      <view class="record-detail-modal" v-if="showRecordDetail">
        <view class="modal-overlay" @click="closeDetail"></view>
        <view class="modal-content">
          <view class="modal-header">
            <text class="modal-title">{{ selectedRecord.date }} 健康状况</text>
            <text class="close-button" @click="closeDetail">×</text>
          </view>
          <view class="modal-body">
            <view class="detail-item">
              <text class="detail-label">血压：</text>
              <text class="detail-value">{{ selectedRecord.bloodPressure }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">血糖：</text>
              <text class="detail-value">{{ selectedRecord.bloodSugar }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">心率：</text>
              <text class="detail-value">{{ selectedRecord.heartRate }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">体温：</text>
              <text class="detail-value">{{ selectedRecord.temperature }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">步数：</text>
              <text class="detail-value">{{ selectedRecord.steps }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">睡眠：</text>
              <text class="detail-value">{{ selectedRecord.sleep }}</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 添加记录弹窗 -->
      <view class="add-record-modal" v-if="showAddRecord">
        <view class="modal-overlay" @click="cancelAddRecord"></view>
        <view class="modal-content">
          <view class="modal-header">
            <text class="modal-title">添加健康记录</text>
            <text class="close-button" @click="cancelAddRecord">×</text>
          </view>
          <view class="modal-body">
            <view class="form-item">
              <text class="form-label">日期</text>
              <input class="form-input" type="text" v-model="newRecord.date" placeholder="YYYY年MM月DD日"/>
            </view>
            <view class="form-item">
              <text class="form-label">血压</text>
              <input class="form-input" type="text" v-model="newRecord.bloodPressure" placeholder="例如: 120/80 mmHg"/>
            </view>
            <view class="form-item">
              <text class="form-label">血糖</text>
              <input class="form-input" type="text" v-model="newRecord.bloodSugar" placeholder="例如: 5.5 mmol/L"/>
            </view>
            <view class="form-item">
              <text class="form-label">心率</text>
              <input class="form-input" type="text" v-model="newRecord.heartRate" placeholder="例如: 75 次/分"/>
            </view>
            <view class="form-item">
              <text class="form-label">体温</text>
              <input class="form-input" type="text" v-model="newRecord.temperature" placeholder="例如: 36.5 °C"/>
            </view>
            <view class="form-item">
              <text class="form-label">步数</text>
              <input class="form-input" type="text" v-model="newRecord.steps" placeholder="例如: 8000 步"/>
            </view>
            <view class="form-item">
              <text class="form-label">睡眠</text>
              <input class="form-input" type="text" v-model="newRecord.sleep" placeholder="例如: 7.5 小时"/>
            </view>
            <view class="form-buttons">
              <button class="form-button cancel-button" @click="cancelAddRecord">取消</button>
              <button class="form-button save-button" @click="saveRecord">保存</button>
            </view>
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
      healthRecords: [
        {
          date: '2025年1月1日',
          bloodPressure: '120/80 mmHg',
          bloodSugar: '5.5 mmol/L',
          heartRate: '75 次/分',
          temperature: '36.5 °C',
          steps: '8000 步',
          sleep: '7.5 小时'
        },
        {
          date: '2025年1月2日',
          bloodPressure: '118/78 mmHg',
          bloodSugar: '5.3 mmol/L',
          heartRate: '72 次/分',
          temperature: '36.6 °C',
          steps: '10000 步',
          sleep: '8 小时'
        }
      ],
      selectedRecord: null,
      showRecordDetail: false,
      showAddRecord: false,
      newRecord: {
        date: '',
        bloodPressure: '',
        bloodSugar: '',
        heartRate: '',
        temperature: '',
        steps: '',
        sleep: ''
      }
    }
  },
  methods: {
    viewRecord(record) {
      this.selectedRecord = record;
      this.showRecordDetail = true;
    },
    closeDetail() {
      this.showRecordDetail = false;
      this.selectedRecord = null;
    },
    addRecord() {
      // 初始化新记录表单
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      
      this.newRecord = {
        date: `${year}年${month}月${day}日`,
        bloodPressure: '',
        bloodSugar: '',
        heartRate: '',
        temperature: '',
        steps: '',
        sleep: ''
      };
      
      this.showAddRecord = true;
    },
    cancelAddRecord() {
      this.showAddRecord = false;
    },
    saveRecord() {
      // 验证必填字段
      if (!this.newRecord.date) {
        uni.showToast({
          title: '请输入日期',
          icon: 'none'
        });
        return;
      }
      
      // 添加新记录
      this.healthRecords.push({...this.newRecord});
      
      // 关闭添加记录弹窗
      this.showAddRecord = false;
      
      uni.showToast({
        title: '记录已保存',
        icon: 'success'
      });
    },
    deleteRecord() {
      if (!this.selectedRecord) return;
      
      uni.showModal({
        title: '确认删除',
        content: `确定要删除 ${this.selectedRecord.date} 的健康记录吗？`,
        success: (res) => {
          if (res.confirm) {
            // 找到并删除选中的记录
            const index = this.healthRecords.findIndex(r => r.date === this.selectedRecord.date);
            if (index !== -1) {
              this.healthRecords.splice(index, 1);
            }
            
            this.closeDetail();
            
            uni.showToast({
              title: '记录已删除',
              icon: 'success'
            });
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
  background-color: #f5f7fa;
  box-sizing: border-box;
}

.content {
  padding: 20px;
}

.record-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
}

.record-item {
  width: 48%;
  margin-bottom: 15px;
}

.record-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  justify-content: center;
}

.record-date {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.record-title {
  font-size: 14px;
  color: #666;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.empty-text {
  font-size: 16px;
  color: #999;
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}

.action-button {
  width: 120px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  will-change: auto;
  transform: translateZ(0);
}

.add-button {
  background-color: #6C63FF;
  color: white;
  border: none;
}

.delete-button {
  background-color: #fff;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
}

.delete-button[disabled] {
  opacity: 0.5;
  color: #999;
  border-color: #ccc;
}

/* 记录详情弹窗样式 */
.record-detail-modal, .add-record-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: 85%;
  background-color: #fff;
  border-radius: 12px;
  position: relative;
  z-index: 1001;
  overflow: hidden;
}

.modal-header {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.close-button {
  font-size: 24px;
  color: #999;
  padding: 0 5px;
}

.modal-body {
  padding: 15px;
  max-height: 70vh;
  overflow-y: auto;
}

.detail-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-label {
  width: 80px;
  font-size: 16px;
  color: #666;
}

.detail-value {
  flex: 1;
  font-size: 16px;
  color: #333;
}

/* 表单样式 */
.form-item {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 16px;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
}

.form-button {
  width: 100px;
  height: 40px;
  border-radius: 4px;
  font-size: 16px;
  will-change: auto;
  transform: translateZ(0);
}

.cancel-button {
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
}

.save-button {
  background-color: #6C63FF;
  color: white;
  border: none;
}
</style> 