<template>
  <view class="container">
    <page-header title="智能诊断"></page-header>
    
    <view class="content">
      <view class="input-label">请输入你可能有的症状</view>
      
      <view class="symptom-input">
        <textarea 
          class="symptom-textarea" 
          placeholder="例如：头痛、发热、咳嗽..." 
          v-model="symptomText"
          auto-height
        ></textarea>
      </view>
      
      <view class="action-buttons">
        <button class="action-button voice-input" @click="handleVoiceInput">
          <text>语音输入</text>
        </button>
        
        <button class="action-button add-image" @click="handleAddImage">
          <text>添加图片</text>
        </button>
      </view>
      
      <button 
        class="submit-button" 
        :disabled="!symptomText" 
        :class="{'active': symptomText}" 
        @click="handleSubmit"
      >
        开始诊断
      </button>
      
      <view class="result-area" v-if="diagnosisResult">
        <view class="result-title">诊断结果</view>
        <view class="result-content">
          <text>{{ diagnosisResult }}</text>
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
      symptomText: '',
      diagnosisResult: ''
    }
  },
  methods: {
    handleVoiceInput() {
      uni.showToast({
        title: '启动语音输入...',
        icon: 'none'
      });
      // 这里可以接入实际的语音输入API
      setTimeout(() => {
        this.symptomText += '头痛、轻微发热';
      }, 1000);
    },
    handleAddImage() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          uni.showToast({
            title: '图片已添加',
            icon: 'success'
          });
          // 实际项目中这里应该上传图片并分析
        }
      });
    },
    handleSubmit() {
      if (!this.symptomText) return;
      
      uni.showLoading({
        title: '正在诊断...'
      });
      
      // 模拟诊断过程
      setTimeout(() => {
        uni.hideLoading();
        this.diagnosisResult = '根据您的症状描述，您可能是普通感冒。建议多休息，多喝水，必要时服用感冒药。如症状加重或持续时间超过3天，请及时就医。';
      }, 2000);
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

.input-label {
  font-size: 16px;
  margin-bottom: 15px;
  color: #333;
}

.symptom-input {
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  min-height: 150px;
}

.symptom-textarea {
  width: 100%;
  min-height: 120px;
  font-size: 16px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.action-button {
  width: 48%;
  height: 50px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  font-size: 16px;
  color: #333;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  will-change: auto;
  transform: translateZ(0);
}

.submit-button {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cccccc;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px;
  border: none;
  will-change: auto;
  transform: translateZ(0);
}

.submit-button.active {
  background-color: #6C63FF;
  box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
}

.result-area {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.result-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.result-content {
  font-size: 16px;
  line-height: 1.6;
  color: #444;
}
</style> 