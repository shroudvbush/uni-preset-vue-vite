/**
 * 家庭成员管理相关接口
 */
import request from '@/utils/request';

/**
 * 获取家庭成员列表
 * @returns {Promise} - 请求结果
 */
export function getFamilyMembers() {
  return request.get('/api/family/members');
}

/**
 * 添加家庭成员
 * @param {Object} data - 家庭成员信息
 * @param {String} data.name - 姓名
 * @param {String} data.relationship - 关系
 * @param {String} data.phoneNumber - 手机号
 * @param {String} data.avatar - 头像
 * @param {String} data.birthday - 生日
 * @param {String} data.gender - 性别
 * @returns {Promise} - 请求结果
 */
export function addFamilyMember(data) {
  return request.post('/api/family/member', data);
}

/**
 * 更新家庭成员信息
 * @param {String} id - 家庭成员ID
 * @param {Object} data - 家庭成员信息
 * @returns {Promise} - 请求结果
 */
export function updateFamilyMember(id, data) {
  return request.put(`/api/family/member/${id}`, data);
}

/**
 * 删除家庭成员
 * @param {String} id - 家庭成员ID
 * @returns {Promise} - 请求结果
 */
export function deleteFamilyMember(id) {
  return request.delete(`/api/family/member/${id}`);
}

/**
 * 绑定监护人
 * @param {Object} data - 监护人信息
 * @param {String} data.name - 监护人姓名
 * @param {String} data.phoneNumber - 监护人手机号
 * @param {String} data.relationship - 关系
 * @param {String} data.verificationCode - 验证码
 * @returns {Promise} - 请求结果
 */
export function bindGuardian(data) {
  return request.post('/api/family/guardian/bind', data);
}

/**
 * 解绑监护人
 * @param {String} guardianId - 监护人ID
 * @returns {Promise} - 请求结果
 */
export function unbindGuardian(guardianId) {
  return request.post('/api/family/guardian/unbind', { guardianId });
}

/**
 * 获取监护人信息
 * @returns {Promise} - 请求结果
 */
export function getGuardianInfo() {
  return request.get('/api/family/guardian');
}

/**
 * 设置健康数据共享权限
 * @param {Object} data - 共享设置
 * @param {String} data.memberId - 家庭成员ID
 * @param {Array} data.sharedData - 共享的数据类型
 * @param {Boolean} data.enabled - 是否启用共享
 * @returns {Promise} - 请求结果
 */
export function setDataSharing(data) {
  return request.post('/api/family/sharing', data);
}

/**
 * 获取共享的健康数据
 * @param {String} memberId - 家庭成员ID
 * @returns {Promise} - 请求结果
 */
export function getSharedHealthData(memberId) {
  return request.get(`/api/family/shared-data/${memberId}`);
}

/**
 * 发送紧急通知
 * @param {Object} data - 通知信息
 * @param {String} data.type - 通知类型
 * @param {String} data.message - 通知内容
 * @param {Array} data.recipients - 接收者ID列表
 * @returns {Promise} - 请求结果
 */
export function sendEmergencyNotification(data) {
  return request.post('/api/family/emergency', data);
}

export default {
  getFamilyMembers,
  addFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  bindGuardian,
  unbindGuardian,
  getGuardianInfo,
  setDataSharing,
  getSharedHealthData,
  sendEmergencyNotification
}; 