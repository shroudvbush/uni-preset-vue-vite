<template>
  <view class="container">
    <page-header title="智能陪伴"></page-header>
    
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
import PageHeader from '@/components/PageHeader.vue'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      inputText: '',
      messages: [],
      isRecording: false
    }
  },
  methods: {
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

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-bottom: 100px;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-item {
  display: flex;
  margin-bottom: 10px;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
}

.user-message {
  justify-content: flex-end;
}

.user-message .message-content {
  background-color: #6C63FF;
  color: white;
  border-radius: 12px 12px 0 12px;
}

.ai-message {
  justify-content: flex-start;
}

.ai-message .message-content {
  background-color: white;
  color: #333;
  border-radius: 12px 12px 12px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 15px 20px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}

.input-container {
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 24px;
  padding: 8px 15px;
  margin-bottom: 10px;
}

.message-input {
  flex: 1;
  height: 36px;
  font-size: 14px;
  background: transparent;
}

.send-button {
  padding: 6px 12px;
  border-radius: 18px;
  background-color: #e0e0e0;
  margin-left: 10px;
}

.send-button.active {
  background-color: #6C63FF;
}

.send-icon {
  font-size: 14px;
  color: #fff;
}

.voice-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  background-color: #f5f7fa;
  border-radius: 18px;
}

.voice-text {
  font-size: 14px;
  color: #666;
}
</style> 