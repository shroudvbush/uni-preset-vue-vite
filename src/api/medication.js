/**
 * 用药管理相关接口
 */
import request from '@/utils/request';

/**
 * 获取用药提醒列表
 * @returns {Promise} - 请求结果
 */
export function getMedicationList() {
  return request.get('/api/medication/list');
}

/**
 * 添加用药提醒
 * @param {Object} data - 用药信息
 * @param {String} data.name - 药品名称
 * @param {String} data.dosage - 用量
 * @param {String} data.frequency - 服用频率
 * @param {Array} data.reminderTimes - 提醒时间
 * @param {String} data.startDate - 开始日期
 * @param {String} data.endDate - 结束日期
 * @returns {Promise} - 请求结果
 */
export function addMedication(data) {
  return request.post('/api/medication/add', data);
}

/**
 * 更新用药提醒
 * @param {String} id - 用药提醒ID
 * @param {Object} data - 用药信息
 * @returns {Promise} - 请求结果
 */
export function updateMedication(id, data) {
  return request.put(`/api/medication/${id}`, data);
}

/**
 * 删除用药提醒
 * @param {String} id - 用药提醒ID
 * @returns {Promise} - 请求结果
 */
export function deleteMedication(id) {
  return request.delete(`/api/medication/${id}`);
}

/**
 * 获取用药记录
 * @param {Object} params - 查询参数
 * @param {String} params.startDate - 开始日期
 * @param {String} params.endDate - 结束日期
 * @returns {Promise} - 请求结果
 */
export function getMedicationRecords(params) {
  return request.get('/api/medication/records', { params });
}

/**
 * 添加用药记录
 * @param {Object} data - 用药记录
 * @param {String} data.medicationId - 药品ID
 * @param {String} data.takenTime - 服用时间
 * @param {String} data.dosage - 实际服用量
 * @param {String} data.notes - 备注
 * @returns {Promise} - 请求结果
 */
export function addMedicationRecord(data) {
  return request.post('/api/medication/record', data);
}

/**
 * 获取药品信息
 * @param {String} keyword - 搜索关键词
 * @returns {Promise} - 请求结果
 */
export function searchMedication(keyword) {
  return request.get('/api/medication/search', { params: { keyword } });
}

/**
 * 获取药物相互作用
 * @param {Array} medicationIds - 药品ID数组
 * @returns {Promise} - 请求结果
 */
export function getDrugInteractions(medicationIds) {
  return request.post('/api/medication/interactions', { medicationIds });
}

export default {
  getMedicationList,
  addMedication,
  updateMedication,
  deleteMedication,
  getMedicationRecords,
  addMedicationRecord,
  searchMedication,
  getDrugInteractions
}; 