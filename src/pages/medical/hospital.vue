<template>
  <view class="container">
    <page-header title="医院列表"></page-header>
    
    <view class="content">
      <!-- 搜索栏 -->
      <view class="search-section">
        <view class="search-bar">
          <view class="search-icon">🔍</view>
          <input 
            class="search-input"
            v-model="searchKeyword"
            placeholder="搜索医院名称"
            @input="onSearch"
          />
        </view>
      </view>
      
      <!-- 筛选条件 -->
      <view class="filter-section">
        <view class="filter-tabs">
          <view 
            class="filter-tab" 
            :class="{ active: activeFilter === 'all' }"
            @click="setFilter('all')"
          >
            <text>全部</text>
          </view>
          <view 
            class="filter-tab" 
            :class="{ active: activeFilter === 'nearby' }"
            @click="setFilter('nearby')"
          >
            <text>附近</text>
          </view>
          <view 
            class="filter-tab" 
            :class="{ active: activeFilter === 'recommend' }"
            @click="setFilter('recommend')"
          >
            <text>推荐</text>
          </view>
        </view>
      </view>
      
      <!-- 医院列表 -->
      <view class="hospital-list">
        <view 
          class="hospital-item" 
          v-for="(hospital, index) in filteredHospitals" 
          :key="index"
          @click="viewHospitalDetail(hospital)"
        >
          <view class="hospital-info">
            <view class="hospital-header">
              <text class="hospital-name">{{ hospital.name }}</text>
              <view class="hospital-rating">
                <text class="rating-score">{{ hospital.rating }}</text>
                <text class="rating-star">⭐</text>
              </view>
            </view>
            
            <view class="hospital-details">
              <text class="hospital-address">📍 {{ hospital.address }}</text>
              <text class="hospital-distance">距离 {{ hospital.distance }}km</text>
            </view>
            
            <view class="hospital-tags">
              <view class="tag" v-for="(tag, tagIndex) in hospital.tags" :key="tagIndex">
                <text>{{ tag }}</text>
              </view>
            </view>
            
            <view class="hospital-departments">
              <text class="department-label">主要科室：</text>
              <text class="department-list">{{ hospital.departments.join('、') }}</text>
            </view>
          </view>
          
          <view class="hospital-actions">
            <button class="action-btn primary" @click.stop="makeAppointment(hospital)">
              <text>预约挂号</text>
            </button>
            <button class="action-btn secondary" @click.stop="viewMap(hospital)">
              <text>查看地图</text>
            </button>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-state" v-if="filteredHospitals.length === 0">
        <text class="empty-icon">🏥</text>
        <text class="empty-text">暂无相关医院</text>
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { getHospitalList } from '@/api/medical.js'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      searchKeyword: '',
      activeFilter: 'all',
      hospitals: [],
      filteredHospitals: [],
      loading: false
    }
  },
  onLoad() {
    this.loadHospitals()
  },
  methods: {
    async loadHospitals() {
      this.loading = true
      try {
        // 模拟医院数据
        this.hospitals = [
          {
            id: '1',
            name: '北京协和医院',
            address: '北京市东城区东单帅府园1号',
            distance: 2.5,
            rating: 4.8,
            tags: ['三甲医院', '综合医院'],
            departments: ['内科', '外科', '妇产科', '儿科', '眼科']
          },
          {
            id: '2',
            name: '北京大学第一医院',
            address: '北京市西城区西什库大街8号',
            distance: 3.2,
            rating: 4.6,
            tags: ['三甲医院', '综合医院'],
            departments: ['内科', '外科', '神经科', '皮肤科']
          },
          {
            id: '3',
            name: '清华大学附属北京清华长庚医院',
            address: '北京市昌平区立汤路168号',
            distance: 8.5,
            rating: 4.4,
            tags: ['三甲医院', '综合医院'],
            departments: ['内科', '外科', '骨科', '心内科']
          }
        ]
        
        this.filteredHospitals = [...this.hospitals]
      } catch (error) {
        console.error('加载医院列表失败:', error)
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    onSearch() {
      this.filterHospitals()
    },
    
    setFilter(filter) {
      this.activeFilter = filter
      this.filterHospitals()
    },
    
    filterHospitals() {
      let filtered = [...this.hospitals]
      
      // 按关键词搜索
      if (this.searchKeyword.trim()) {
        filtered = filtered.filter(hospital => 
          hospital.name.includes(this.searchKeyword) ||
          hospital.address.includes(this.searchKeyword)
        )
      }
      
      // 按筛选条件过滤
      switch (this.activeFilter) {
        case 'nearby':
          filtered = filtered.filter(hospital => hospital.distance <= 5)
          break
        case 'recommend':
          filtered = filtered.filter(hospital => hospital.rating >= 4.5)
          break
        default:
          break
      }
      
      this.filteredHospitals = filtered
    },
    
    viewHospitalDetail(hospital) {
      uni.navigateTo({
        url: `/pages/medical/hospital-detail?id=${hospital.id}`
      })
    },
    
    makeAppointment(hospital) {
      uni.navigateTo({
        url: `/pages/medical/appointment?hospitalId=${hospital.id}`
      })
    },
    
    viewMap(hospital) {
      uni.showToast({
        title: '打开地图功能',
        icon: 'none'
      })
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

.search-section {
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 25px;
  padding: 12px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-icon {
  font-size: 18px;
  margin-right: 10px;
  color: #666;
}

.search-input {
  flex: 1;
  font-size: 16px;
  color: #333;
  border: none;
  outline: none;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-tabs {
  display: flex;
  background-color: #fff;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-tab {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  transition: all 0.3s ease;
}

.filter-tab.active {
  background-color: #6C63FF;
  color: white;
}

.hospital-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hospital-item {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.hospital-info {
  margin-bottom: 15px;
}

.hospital-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.hospital-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.hospital-rating {
  display: flex;
  align-items: center;
}

.rating-score {
  font-size: 16px;
  font-weight: bold;
  color: #ff6b6b;
  margin-right: 5px;
}

.rating-star {
  font-size: 14px;
}

.hospital-details {
  margin-bottom: 10px;
}

.hospital-address {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.hospital-distance {
  font-size: 12px;
  color: #999;
}

.hospital-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.tag {
  background-color: #f0f0f0;
  color: #666;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.hospital-departments {
  font-size: 14px;
  color: #666;
}

.department-label {
  color: #999;
}

.department-list {
  color: #333;
}

.hospital-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  height: 40px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  border: none;
}

.action-btn.primary {
  background-color: #6C63FF;
  color: white;
}

.action-btn.secondary {
  background-color: #fff;
  color: #6C63FF;
  border: 1px solid #6C63FF;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 15px;
}

.empty-text {
  font-size: 16px;
  color: #999;
}
</style> 