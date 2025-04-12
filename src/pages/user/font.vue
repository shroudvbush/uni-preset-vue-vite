<template>
  <view class="container">
    <page-header title="字体大小设置"></page-header>
    
    <view class="content">
      <view class="font-preview">
        <text class="preview-text" :style="{ fontSize: fontSize + 'px' }">预览文字大小</text>
      </view>
      
      <view class="size-control">
        <view class="slider-container">
          <view class="size-label">
            <text>A</text>
          </view>
          <slider 
            :value="sliderValue" 
            @change="changeSize" 
            min="12" 
            max="24" 
            show-value
            activeColor="#6C63FF"
          />
          <view class="size-label">
            <text>A</text>
          </view>
        </view>
      </view>
      
      <view class="tip-container">
        <text class="tip-text">提示：向左拖动减小字体，向右拖动增大字体</text>
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
      fontSize: 16,
      sliderValue: 16
    }
  },
  methods: {
    changeSize(e) {
      this.sliderValue = e.detail.value;
      this.fontSize = e.detail.value;
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
  padding: 20px;
}

.font-preview {
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-text {
  color: #333;
  text-align: center;
}

.size-control {
  margin-bottom: 30px;
}

.slider-container {
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.size-label {
  font-size: 16px;
  color: #333;
  margin: 0 10px;
}

.tip-container {
  text-align: center;
  margin-top: 20px;
}

.tip-text {
  font-size: 14px;
  color: #666;
}
</style> 