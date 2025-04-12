<template>
  <view class="container">
    <view class="header">
      <view class="back-button" @click="goBack">
        <text class="back-icon"></text>
      </view>
      <text class="page-title"></text>
      <view class="header-placeholder"></view>
    </view>
    
    <view class="content">
      <view class="chat-container">
        <view class="ai-message-box">
          <view class="ai-message">
            <text>我是您的AI生活小助手，请问有什么需要帮助的</text>
          </view>
        </view>
        
        <view class="message-list">
          <block v-for="(message, index) in messages" :key="index">
            <view class="message-item" :class="{'user-message': message.isUser, 'ai-message': !message.isUser}">
              <view class="message-content">
                <text>{{ message.content }}</text>
              </view>
            </view>
          </block>
        </view>
      </view>
      
      <view class="input-area">
        <view class="input-container">
          <input 
            class="message-input" 
            type="text" 
            placeholder="请输入问题..." 
            v-model="inputText"
            @confirm="sendMessage"
          />
          <view class="send-button" @click="sendMessage" :class="{'active': inputText.trim()}">
            <text class="send-icon">发送</text>
          </view>
        </view>
        
        <view class="voice-container" @click="handleVoiceInput">
          <text class="voice-text">语音输入</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      messages: [],
      isRecording: false
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    sendMessage() {
      if (!this.inputText.trim()) return;
      
      // 添加用户消息
      this.messages.push({
        content: this.inputText,
        isUser: true
      });
      
      const userQuestion = this.inputText;
      this.inputText = '';
      
      // 模拟AI回复
      setTimeout(() => {
        let aiResponse = '';
        
        if (userQuestion.includes('天气')) {
          aiResponse = '今天天气晴朗，温度25-30度，适合户外活动。';
        } else if (userQuestion.includes('吃')) {
          aiResponse = '根据您的健康档案，建议您今天可以多吃蔬菜水果，少吃油腻食物。';
        } else if (userQuestion.includes('药')) {
          aiResponse = '请详细描述您的症状，我可以给您一些用药建议。但重要的医疗决定请咨询医生。';
        } else {
          aiResponse = '感谢您的提问。我会尽力为您提供帮助和支持。请问还有其他问题吗？';
        }
        
        this.messages.push({
          content: aiResponse,
          isUser: false
        });
      }, 1000);
    },
    handleVoiceInput() {
      if (this.isRecording) {
        // 如果正在录音，则停止录音
        this.isRecording = false;
        uni.showToast({
          title: '录音已结束',
          icon: 'none'
        });
        
        // 模拟语音识别结果
        setTimeout(() => {
          this.inputText = '今天天气怎么样？';
          this.sendMessage();
        }, 1000);
      } else {
        // 开始录音
        this.isRecording = true;
        uni.showToast({
          title: '正在聆听...',
          icon: 'none',
          duration: 2000
        });
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
  display: flex;
  flex-direction: column;
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
  padding: 15px;
  height: calc(100vh - 58px);
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 15px;
}

.ai-message-box {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f2f5;
  border-radius: 18px;
}

.ai-message {
  background-color: #fff;
  padding: 15px;
  border-radius: 18px;
  max-width: 80%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.message-list {
  display: flex;
  flex-direction: column;
}

.message-item {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.user-message {
  align-items: flex-end;
}

.ai-message {
  align-items: flex-start;
}

.message-content {
  padding: 12px 15px;
  border-radius: 18px;
  max-width: 80%;
  font-size: 16px;
  line-height: 1.4;
}

.user-message .message-content {
  background-color: #6C63FF;
  color: #fff;
  border-bottom-right-radius: 5px;
}

.ai-message .message-content {
  background-color: #fff;
  color: #333;
  border-bottom-left-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.input-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.input-container {
  display: flex;
  height: 50px;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  overflow: hidden;
  padding-left: 15px;
  align-items: center;
}

.message-input {
  flex: 1;
  height: 100%;
  font-size: 16px;
  border: none;
}

.send-button {
  width: 60px;
  height: 36px;
  background-color: #f0f0f0;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  will-change: auto;
  transform: translateZ(0);
}

.send-icon {
  color: #999;
  font-size: 14px;
}

.send-button.active {
  background-color: #1e88e5;
}

.send-button.active .send-icon {
  color: #fff;
}

.voice-container {
  height: 50px;
  background-color: #fff;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.voice-text {
  font-size: 14px;
  color: #666;
  will-change: auto;
  transform: translateZ(0);
}
</style> 