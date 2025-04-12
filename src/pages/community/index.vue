<template>
  <view class="container">
    <view class="search-bar" @click="navigateToSearch">
      <view class="search-icon">
        <text class="icon-search"></text>
      </view>
      <text class="search-placeholder">搜索</text>
    </view>
    
    <view class="section">
      <view class="section-title">今日头条</view>
      <view class="news-item" @click="viewNewsDetail(1)">
        <text class="news-text">头条1</text>
      </view>
      <view class="news-item" @click="viewNewsDetail(2)">
        <text class="news-text">头条2</text>
      </view>
      <view class="news-item" @click="viewNewsDetail(3)">
        <text class="news-text">头条3</text>
      </view>
      <view class="more-button" @click="viewMoreNews">
        <text class="more-text">更多</text>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">居家生活小技巧</view>
      <view class="tips-item" @click="viewTipDetail('打车')">
        <text class="tips-text">学会打车</text>
      </view>
      <view class="tips-item" @click="viewTipDetail('缴费')">
        <text class="tips-text">学会生活缴费</text>
      </view>
      <view class="tips-item" @click="viewTipDetail('网购')">
        <text class="tips-text">学会网购</text>
      </view>
      <view class="more-button" @click="viewMoreTips">
        <text class="more-text">更多</text>
      </view>
    </view>
    
    <view class="section">
      <view class="section-title">健康饮食推荐</view>
      <view class="diet-item" @click="viewDietDetail('高血压')">
        <text class="diet-text">高血压饮食推荐</text>
      </view>
      <view class="diet-item" @click="viewDietDetail('高血糖')">
        <text class="diet-text">高血糖饮食推荐</text>
      </view>
      <view class="diet-item" @click="viewDietDetail('高血脂')">
        <text class="diet-text">高血脂饮食推荐</text>
      </view>
      <view class="more-button" @click="viewMoreDiets">
        <text class="more-text">更多</text>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <tab-bar :currentTab="1"></tab-bar>
  </view>
</template>

<script>
import TabBar from '@/components/TabBar.vue'

export default {
  components: {
    TabBar
  },
  data() {
    return {}
  },
  methods: {
    navigateToSearch() {
      uni.navigateTo({
        url: '/pages/community/search'
      });
    },
    viewNewsDetail(id) {
      uni.showToast({
        title: '查看头条' + id,
        icon: 'none'
      });
    },
    viewMoreNews() {
      uni.showToast({
        title: '查看更多头条',
        icon: 'none'
      });
    },
    viewTipDetail(type) {
      uni.showToast({
        title: '查看' + type + '技巧',
        icon: 'none'
      });
    },
    viewMoreTips() {
      uni.showToast({
        title: '查看更多技巧',
        icon: 'none'
      });
    },
    viewDietDetail(condition) {
      uni.showToast({
        title: '查看' + condition + '饮食',
        icon: 'none'
      });
    },
    viewMoreDiets() {
      uni.showToast({
        title: '查看更多饮食推荐',
        icon: 'none'
      });
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 70px; /* 为底部导航栏留出空间 */
  box-sizing: border-box;
}

.search-bar {
  height: 40px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  margin-top: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding: 0 15px;
}

.search-icon {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.icon-search {
  font-size: 20px;
}

.search-placeholder {
  font-size: 14px;
  color: #999;
}

.section {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.news-item, .tips-item, .diet-item {
  height: 50px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.news-text, .tips-text, .diet-text {
  font-size: 16px;
  color: #1e88e5;
  will-change: auto;
  transform: translateZ(0);
}

.more-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.more-text {
  font-size: 14px;
  color: #666;
  padding: 5px 15px;
  background-color: #f0f0f0;
  border-radius: 15px;
  will-change: auto;
  transform: translateZ(0);
}
</style> 