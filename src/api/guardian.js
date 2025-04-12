/**
 * 监护人管理相关接口
 */
import request from '@/utils/request';

/**
 * 绑定监护人
 * @param {Object} data - 绑定参数
 * @param {String} data.guardianPhone - 监护人手机号
 * @param {Boolean} data.shareHealthData - 是否共享健康数据
 * @returns {Promise} - 请求结果
 */
export function bindGuardian(data) {
  return request.post('/api/guardian/bind', data);
}

/**
 * 解绑监护人
 * @returns {Promise} - 请求结果
 */
export function unbindGuardian() {
  return request.post('/api/guardian/unbind');
}

/**
 * 获取绑定状态
 * @returns {Promise} - 请求结果
 */
export function getGuardianStatus() {
  return request.get('/api/guardian/status');
}

/**
 * 更新共享设置
 * @param {Object} data - 更新参数
 * @param {Boolean} data.shareHealthData - 是否共享健康数据
 * @returns {Promise} - 请求结果
 */
export function updateSharingSettings(data) {
  return request.post('/api/guardian/updateSharing', data);
}

export default {
  bindGuardian,
  unbindGuardian,
  getGuardianStatus,
  updateSharingSettings
}; 