/**
 * 通知设置相关接口
 */
import request from '@/utils/request';

/**
 * 获取通知设置
 * @returns {Promise} - 请求结果
 */
export function getNotificationSettings() {
  return request.get('/api/notification/settings');
}

/**
 * 更新通知设置
 * @param {Object} data - 设置参数
 * @param {Boolean} data.healthAlert - 健康提醒
 * @param {Boolean} data.medicineAlert - 用药提醒
 * @param {Boolean} data.fallAlert - 跌倒提醒
 * @param {Boolean} data.newsAlert - 新闻提醒
 * @returns {Promise} - 请求结果
 */
export function updateNotificationSettings(data) {
  return request.post('/api/notification/update', data);
}

/**
 * 获取通知列表
 * @param {Object} params - 查询参数
 * @param {Number} params.pageSize - 每页数量
 * @param {Number} params.pageNum - 页码
 * @returns {Promise} - 请求结果
 */
export function getNotificationList(params) {
  return request.get('/api/notification/list', params);
}

/**
 * 标记通知为已读
 * @param {String} notificationId - 通知ID
 * @returns {Promise} - 请求结果
 */
export function markNotificationRead(notificationId) {
  return request.post(`/api/notification/read/${notificationId}`);
}

/**
 * 标记所有通知为已读
 * @returns {Promise} - 请求结果
 */
export function markAllNotificationsRead() {
  return request.post('/api/notification/readAll');
}

export default {
  getNotificationSettings,
  updateNotificationSettings,
  getNotificationList,
  markNotificationRead,
  markAllNotificationsRead
}; 