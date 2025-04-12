<template>
  <view class="container">
    <view class="header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <view class="search-container">
        <input 
          class="search-input" 
          type="text" 
          v-model="searchText" 
          placeholder="请输入搜索关键词"
          confirm-type="search"
          @confirm="handleSearch"
        />
      </view>
      <view class="search-button" @click="handleSearch">
        <text class="search-text">搜索</text>
      </view>
    </view>
    
    <view class="content">
      <view class="search-result-container" v-if="searchResults.length > 0">
        <view class="result-item" v-for="(item, index) in searchResults" :key="index" @click="viewDetail(item)">
          <text class="result-text">{{ item.title }}</text>
        </view>
      </view>
      
      <view class="empty-state" v-else-if="hasSearched">
        <text class="empty-text">暂无搜索结果</text>
      </view>
      
      <view class="voice-input-section">
        <button class="voice-button" @click="startVoiceInput">
          <text class="voice-btn-text">语音输入</text>
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      searchResults: [],
      hasSearched: false
    }
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    handleSearch() {
      this.hasSearched = true;
      
      if (!this.searchText.trim()) {
        uni.showToast({
          title: '请输入搜索内容',
          icon: 'none'
        });
        this.searchResults = [];
        return;
      }
      
      // 模拟搜索结果
      this.searchResults = [
        { id: 1, title: '搜索结果1：' + this.searchText },
        { id: 2, title: '搜索结果2：' + this.searchText },
        { id: 3, title: '搜索结果3：' + this.searchText }
      ];
    },
    viewDetail(item) {
      // 查看详情
      uni.showToast({
        title: '查看详情：' + item.title,
        icon: 'none'
      });
    },
    startVoiceInput() {
      // 模拟语音输入，实际应该调用原生API
      uni.showToast({
        title: '语音输入功能',
        icon: 'none'
      });
      
      // 模拟语音识别结果
      setTimeout(() => {
        this.searchText = '语音识别的内容';
      }, 1000);
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
  padding: 15px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  box-sizing: border-box;
}

.back-button {
  width: 30px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.back-icon {
  font-size: 24px;
  color: #333;
}

.search-container {
  flex: 1;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-right: 10px;
}

.search-input {
  width: 100%;
  height: 100%;
  font-size: 14px;
}

.search-button {
  width: 60px;
  height: 36px;
  background-color: #1e88e5;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-text {
  color: #fff;
  font-size: 14px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.search-result-container {
  margin-bottom: 20px;
}

.result-item {
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.result-text {
  font-size: 16px;
  color: #333;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
}

.empty-text {
  font-size: 14px;
  color: #999;
}

.voice-input-section {
  margin-top: auto;
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.voice-button {
  width: 200px;
  height: 50px;
  background-color: #f5f5f5;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.voice-btn-text {
  font-size: 16px;
  color: #333;
}
</style> 