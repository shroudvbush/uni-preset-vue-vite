<template>
  <view class="container">
    <page-header title="家庭成员详情"></page-header>
    
    <view class="content">
      <!-- 成员信息 -->
      <view class="member-info-section">
        <view class="member-header">
          <view class="member-avatar">
            <text v-if="!memberInfo.avatar">{{ memberInfo.name ? memberInfo.name.charAt(0) : 'M' }}</text>
            <image v-else :src="memberInfo.avatar" class="avatar-image" />
          </view>
          <view class="member-details">
            <text class="member-name">{{ memberInfo.name }}</text>
            <text class="member-relation">{{ memberInfo.relationship }}</text>
            <text class="member-phone" v-if="memberInfo.phoneNumber">{{ memberInfo.phoneNumber }}</text>
          </view>
        </view>
        
        <view class="member-stats">
          <view class="stat-item">
            <text class="stat-value">{{ memberInfo.age || '--' }}</text>
            <text class="stat-label">年龄</text>
          </view>
          <view class="stat-item">
            <text class="stat-value">{{ memberInfo.gender || '--' }}</text>
            <text class="stat-label">性别</text>
          </view>
          <view class="stat-item">
            <text class="stat-value">{{ memberInfo.birthday || '--' }}</text>
            <text class="stat-label">生日</text>
          </view>
        </view>
      </view>
      
      <!-- 健康数据 -->
      <view class="health-data-section">
        <view class="section-title">健康数据</view>
        <view class="health-grid">
          <view class="health-item">
            <text class="health-label">血压</text>
            <text class="health-value">{{ healthData.bloodPressure || '--' }}</text>
          </view>
          <view class="health-item">
            <text class="health-label">血糖</text>
            <text class="health-value">{{ healthData.bloodSugar || '--' }}</text>
          </view>
          <view class="health-item">
            <text class="health-label">心率</text>
            <text class="health-value">{{ healthData.heartRate || '--' }}</text>
          </view>
          <view class="health-item">
            <text class="health-label">体温</text>
            <text class="health-value">{{ healthData.temperature || '--' }}</text>
          </view>
        </view>
      </view>
      
      <!-- 共享设置 -->
      <view class="sharing-section">
        <view class="section-title">数据共享设置</view>
        <view class="sharing-item">
          <text class="sharing-label">健康数据共享</text>
          <switch 
            :checked="memberInfo.sharingEnabled" 
            @change="toggleSharing"
            color="#6C63FF"
          />
        </view>
        <view class="sharing-desc">
          <text>{{ memberInfo.sharingEnabled ? '已开启数据共享' : '未开启数据共享' }}</text>
        </view>
      </view>
      
      <!-- 操作按钮 -->
      <view class="action-section">
        <button class="action-btn edit-btn" @click="editMember">
          <text>编辑信息</text>
        </button>
        <button class="action-btn delete-btn" @click="deleteMember">
          <text>删除成员</text>
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { updateFamilyMember, deleteFamilyMember, setDataSharing } from '@/api/family.js'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      memberId: '',
      memberInfo: {},
      healthData: {},
      loading: false
    }
  },
  onLoad(options) {
    if (options.id) {
      this.memberId = options.id
      this.loadMemberInfo()
    }
  },
  methods: {
    async loadMemberInfo() {
      this.loading = true
      try {
        // 模拟加载成员信息
        this.memberInfo = {
          id: this.memberId,
          name: '张三',
          relationship: '父亲',
          phoneNumber: '13800138000',
          gender: '男',
          age: '55',
          birthday: '1969-01-01',
          avatar: '',
          sharingEnabled: true
        }
        
        // 模拟健康数据
        this.healthData = {
          bloodPressure: '130/85',
          bloodSugar: '6.2',
          heartRate: '78',
          temperature: '36.8'
        }
      } catch (error) {
        console.error('加载成员信息失败:', error)
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    async toggleSharing(e) {
      try {
        const result = await setDataSharing({
          memberId: this.memberId,
          enabled: e.detail.value,
          sharedData: ['health', 'medication', 'appointment']
        })
        
        if (result.code === 0) {
          this.memberInfo.sharingEnabled = e.detail.value
          uni.showToast({
            title: this.memberInfo.sharingEnabled ? '已开启共享' : '已关闭共享',
            icon: 'success'
          })
        }
      } catch (error) {
        uni.showToast({
          title: '设置失败',
          icon: 'none'
        })
      }
    },
    
    editMember() {
      uni.navigateTo({
        url: `/pages/family/add?id=${this.memberId}`
      })
    },
    
    deleteMember() {
      uni.showModal({
        title: '确认删除',
        content: `确定要删除家庭成员 ${this.memberInfo.name} 吗？此操作不可恢复。`,
        confirmColor: '#ff6b6b',
        success: async (res) => {
          if (res.confirm) {
            try {
              uni.showLoading({
                title: '删除中...'
              })
              
              const result = await deleteFamilyMember(this.memberId)
              
              if (result.code === 0) {
                uni.showToast({
                  title: '删除成功',
                  icon: 'success'
                })
                
                setTimeout(() => {
                  uni.navigateBack()
                }, 1500)
              } else {
                uni.showToast({
                  title: result.message || '删除失败',
                  icon: 'none'
                })
              }
            } catch (error) {
              console.error('删除成员失败:', error)
              uni.showToast({
                title: '删除失败',
                icon: 'none'
              })
            } finally {
              uni.hideLoading()
            }
          }
        }
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

.member-info-section {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.member-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6C63FF 0%, #8B7CF6 100%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  margin-right: 20px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.member-details {
  flex: 1;
}

.member-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.member-relation {
  font-size: 16px;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.member-phone {
  font-size: 14px;
  color: #999;
}

.member-stats {
  display: flex;
  justify-content: space-around;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #6C63FF;
  display: block;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.health-data-section, .sharing-section {
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.health-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.health-item {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 12px;
  text-align: center;
}

.health-label {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.health-value {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.sharing-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.sharing-label {
  font-size: 16px;
  color: #333;
}

.sharing-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.action-section {
  display: flex;
  gap: 15px;
}

.action-btn {
  flex: 1;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  border: none;
}

.edit-btn {
  background-color: #6C63FF;
  color: white;
}

.delete-btn {
  background-color: #fff;
  color: #ff6b6b;
  border: 2px solid #ff6b6b;
}
</style> 