<template>
  <view class="container">
    <page-header title="家庭成员"></page-header>
    
    <view class="content">
      <!-- 监护人信息 -->
      <view class="guardian-section" v-if="guardianInfo">
        <view class="section-title">监护人信息</view>
        <view class="guardian-card">
          <view class="guardian-info">
            <text class="guardian-name">{{ guardianInfo.name }}</text>
            <text class="guardian-relation">{{ guardianInfo.relationship }}</text>
            <text class="guardian-phone">{{ guardianInfo.phoneNumber }}</text>
          </view>
          <view class="guardian-actions">
            <button class="action-btn" @click="editGuardian">编辑</button>
            <button class="action-btn danger" @click="unbindGuardian">解绑</button>
          </view>
        </view>
      </view>
      
      <!-- 家庭成员列表 -->
      <view class="family-section">
        <view class="section-header">
          <text class="section-title">家庭成员</text>
          <button class="add-btn" @click="addFamilyMember">添加成员</button>
        </view>
        
        <view class="family-list" v-if="familyMembers.length > 0">
          <view 
            class="family-item" 
            v-for="(member, index) in familyMembers" 
            :key="index"
            @click="viewMemberDetail(member)"
          >
            <view class="member-avatar">
              <text>{{ member.name.charAt(0) }}</text>
            </view>
            <view class="member-info">
              <text class="member-name">{{ member.name }}</text>
              <text class="member-relation">{{ member.relationship }}</text>
            </view>
            <view class="member-actions">
              <button class="action-btn small" @click.stop="editMember(member)">编辑</button>
              <button class="action-btn small danger" @click.stop="deleteMember(member)">删除</button>
            </view>
          </view>
        </view>
        
        <view class="empty-state" v-else>
          <text class="empty-text">暂无家庭成员，点击添加</text>
        </view>
      </view>
      
      <!-- 数据共享设置 -->
      <view class="sharing-section">
        <view class="section-title">数据共享设置</view>
        <view class="sharing-item" v-for="(member, index) in familyMembers" :key="index">
          <view class="sharing-info">
            <text class="member-name">{{ member.name }}</text>
            <text class="sharing-status">{{ member.sharingEnabled ? '已共享' : '未共享' }}</text>
          </view>
          <switch 
            :checked="member.sharingEnabled" 
            @change="toggleSharing(member)"
            color="#6C63FF"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { getFamilyMembers, getGuardianInfo, unbindGuardian, setDataSharing } from '@/api/family.js'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      familyMembers: [],
      guardianInfo: null,
      loading: false
    }
  },
  onLoad() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        // 加载家庭成员列表
        const membersRes = await getFamilyMembers()
        if (membersRes.code === 0) {
          this.familyMembers = membersRes.data
        }
        
        // 加载监护人信息
        const guardianRes = await getGuardianInfo()
        if (guardianRes.code === 0) {
          this.guardianInfo = guardianRes.data
        }
      } catch (error) {
        console.error('加载数据失败:', error)
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },
    
    addFamilyMember() {
      uni.navigateTo({
        url: '/pages/family/add'
      })
    },
    
    editMember(member) {
      uni.navigateTo({
        url: `/pages/family/detail?id=${member.id}`
      })
    },
    
    viewMemberDetail(member) {
      uni.navigateTo({
        url: `/pages/family/detail?id=${member.id}`
      })
    },
    
    async deleteMember(member) {
      uni.showModal({
        title: '确认删除',
        content: `确定要删除家庭成员 ${member.name} 吗？`,
        success: async (res) => {
          if (res.confirm) {
            try {
              // 这里应该调用删除API
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              })
              this.loadData()
            } catch (error) {
              uni.showToast({
                title: '删除失败',
                icon: 'none'
              })
            }
          }
        }
      })
    },
    
    editGuardian() {
      uni.navigateTo({
        url: '/pages/user/guardian'
      })
    },
    
    async unbindGuardian() {
      uni.showModal({
        title: '确认解绑',
        content: '确定要解绑监护人吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              const result = await unbindGuardian(this.guardianInfo.id)
              if (result.code === 0) {
                uni.showToast({
                  title: '解绑成功',
                  icon: 'success'
                })
                this.guardianInfo = null
              }
            } catch (error) {
              uni.showToast({
                title: '解绑失败',
                icon: 'none'
              })
            }
          }
        }
      })
    },
    
    async toggleSharing(member) {
      try {
        const result = await setDataSharing({
          memberId: member.id,
          enabled: !member.sharingEnabled,
          sharedData: ['health', 'medication', 'appointment']
        })
        
        if (result.code === 0) {
          member.sharingEnabled = !member.sharingEnabled
          uni.showToast({
            title: member.sharingEnabled ? '已开启共享' : '已关闭共享',
            icon: 'success'
          })
        }
      } catch (error) {
        uni.showToast({
          title: '设置失败',
          icon: 'none'
        })
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
}

.content {
  padding: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.guardian-section, .family-section, .sharing-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.guardian-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.guardian-info {
  flex: 1;
}

.guardian-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.guardian-relation, .guardian-phone {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 3px;
}

.guardian-actions {
  display: flex;
  gap: 10px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.add-btn {
  background-color: #6C63FF;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
}

.family-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.family-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #6C63FF;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-right: 15px;
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 3px;
}

.member-relation {
  font-size: 14px;
  color: #666;
}

.member-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 6px 12px;
  font-size: 12px;
  color: #333;
}

.action-btn.small {
  padding: 4px 8px;
  font-size: 11px;
}

.action-btn.danger {
  border-color: #ff6b6b;
  color: #ff6b6b;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
}

.empty-text {
  color: #999;
  font-size: 14px;
}

.sharing-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.sharing-item:last-child {
  border-bottom: none;
}

.sharing-info {
  flex: 1;
}

.sharing-status {
  font-size: 12px;
  color: #666;
  margin-left: 10px;
}
</style> 