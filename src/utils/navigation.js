/**
 * 导航栏工具函数
 */

const isH5 = process.env.VUE_APP_PLATFORM === 'h5';

// 设置导航栏颜色
export function setNavigationBarColor(options = {}) {
  if (isH5) {
    // H5环境下直接修改CSS变量
    const root = document.documentElement;
    root.style.setProperty('--nav-bg-color', options.backgroundColor || '#F8F8F8');
    root.style.setProperty('--nav-text-color', options.frontColor || '#000000');
    return Promise.resolve();
  }
  
  return new Promise((resolve) => {
    try {
      uni.setNavigationBarColor({
        frontColor: options.frontColor || '#000000',
        backgroundColor: options.backgroundColor || '#F8F8F8',
        animation: {
          duration: 200,
          timingFunc: 'easeIn'
        },
        complete: () => {
          resolve();
        }
      });
    } catch (e) {
      console.warn('设置导航栏颜色失败:', e);
      resolve();
    }
  });
}

// 设置导航栏标题
export function setNavigationBarTitle(title) {
  return new Promise((resolve) => {
    try {
      uni.setNavigationBarTitle({
        title: title || '',
        complete: () => {
          resolve();
        }
      });
    } catch (e) {
      console.warn('设置导航栏标题失败:', e);
      resolve();
    }
  });
}

// 显示导航栏加载动画
export function showNavigationBarLoading() {
  if (isH5) return Promise.resolve();
  
  return new Promise((resolve) => {
    try {
      uni.showNavigationBarLoading();
    } catch (e) {
      console.warn('显示导航栏加载动画失败:', e);
    }
    resolve();
  });
}

// 隐藏导航栏加载动画
export function hideNavigationBarLoading() {
  if (isH5) return Promise.resolve();
  
  return new Promise((resolve) => {
    try {
      uni.hideNavigationBarLoading();
    } catch (e) {
      console.warn('隐藏导航栏加载动画失败:', e);
    }
    resolve();
  });
}

export default {
  setNavigationBarColor,
  setNavigationBarTitle,
  showNavigationBarLoading,
  hideNavigationBarLoading
}; 