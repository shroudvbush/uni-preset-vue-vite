<template>
  <view class="app-container">
    <view class="content">
      <router-view></router-view>
    </view>
  </view>
</template>

<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
@import './static/styles/tabbar.css';
@import './static/styles/common.css';

/* 全局CSS变量 */
:root {
  --nav-bg-color: #F8F8F8;
  --nav-text-color: #000000;
}

/* 导航栏样式 */
.uni-page-head {
  background-color: var(--nav-bg-color) !important;
}

.uni-page-head-bd {
  color: var(--nav-text-color) !important;
}

.uni-page-head__title {
  color: var(--nav-text-color) !important;
}

/* 全局样式 */
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

/* 修复H5环境下的一些样式问题 */
page {
  min-height: 100vh;
  background-color: #F8F8F8;
}

/* 统一按钮样式 */
.uni-btn {
  border-radius: 4px;
  font-size: 14px;
  padding: 8px 16px;
}

/* 统一输入框样式 */
.uni-input {
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
  background-color: #FFFFFF;
  border-radius: 4px;
}

/* 预设字体样式，避免文字闪动 */
text, view, button, input, textarea {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* 改善按钮的默认样式 */
button {
  overflow: visible;
  font-weight: normal;
  background-color: transparent;
  margin: 0;
  padding: 0;
  position: relative;
}

button::after {
  border: none;
}

/* 添加页面过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* 清除浮动 */
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

/* 全局容器样式 */
.container {
  width: 100%;
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;
}

/* 卡片通用样式 */
.card {
  width: 100%;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 15px;
  box-sizing: border-box;
}
</style>
