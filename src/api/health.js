/**
 * 健康数据相关接口
 */
import request from '@/utils/request';

/**
 * 上传健康数据
 * @param {Object} data - 健康数据
 * @param {Object} data.bloodPressure - 血压数据
 * @param {Number} data.bloodPressure.systolic - 收缩压
 * @param {Number} data.bloodPressure.diastolic - 舒张压
 * @param {Number} data.bloodSugar - 血糖
 * @param {Number} data.heartRate - 心率
 * @param {Number} data.temperature - 体温
 * @param {Number} data.steps - 步数
 * @param {Number} data.sleep - 睡眠时间
 * @param {String} data.recordTime - 记录时间，ISO8601格式
 * @returns {Promise} - 请求结果
 */
export function uploadHealthData(data) {
  return request.post('/api/health/upload', data);
}

/**
 * 获取健康数据列表
 * @param {Object} params - 查询参数
 * @param {String} params.startDate - 开始日期，格式：YYYY-MM-DD
 * @param {String} params.endDate - 结束日期，格式：YYYY-MM-DD
 * @param {Number} params.pageSize - 每页数量
 * @param {Number} params.pageNum - 页码
 * @returns {Promise} - 请求结果
 */
export function getHealthDataList(params) {
  return request.get('/api/health/list', params);
}

/**
 * 获取健康数据详情
 * @param {String} recordId - 记录ID
 * @returns {Promise} - 请求结果
 */
export function getHealthDataDetail(recordId) {
  return request.get(`/api/health/detail/${recordId}`);
}

/**
 * 删除健康数据
 * @param {String} id - 数据ID
 * @returns {Promise} - 请求结果
 */
export function deleteHealthData(id) {
  return request.post('/api/health/data/delete', { id });
}

/**
 * 上传健康图片（检查报告等）
 * @param {File} file - 文件对象
 * @returns {Promise} - 请求结果
 */
export function uploadHealthImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  return request.upload('/api/health/image/upload', formData);
}

/**
 * 健康档案相关接口
 */

/**
 * 获取用户健康档案概览
 * @returns {Promise} - 请求结果
 */
export function getHealthSummary() {
  return request.get('/api/health/summary');
}

/**
 * 获取健康记录列表
 * @param {Object} params - 查询参数
 * @param {String} params.type - 记录类型（可选）
 * @param {String} params.startDate - 开始日期（可选）
 * @param {String} params.endDate - 结束日期（可选）
 * @returns {Promise} - 请求结果
 */
export function getHealthRecords(params) {
  return request.get('/api/health/records', params);
}

/**
 * 获取健康记录详情
 * @param {String} recordId - 记录ID
 * @returns {Promise} - 请求结果
 */
export function getHealthRecordDetail(recordId) {
  return request.get(`/api/health/record/${recordId}`);
}

/**
 * 添加健康记录
 * @param {Object} data - 记录数据
 * @param {String} data.type - 记录类型
 * @param {String} data.date - 记录日期
 * @param {Object} data.values - 记录值
 * @returns {Promise} - 请求结果
 */
export function addHealthRecord(data) {
  return request.post('/api/health-records/add', data);
}

/**
 * 更新健康记录
 * @param {String} recordId - 记录ID
 * @param {Object} data - 更新数据
 * @returns {Promise} - 请求结果
 */
export function updateHealthRecord(recordId, data) {
  return request.put(`/api/health/record/${recordId}`, data);
}

/**
 * 删除健康记录
 * @param {String} recordId - 记录ID
 * @returns {Promise} - 请求结果
 */
export function deleteHealthRecord(recordId) {
  return request.delete(`/api/health-records/delete/${recordId}`);
}

/**
 * 上传健康记录相关图片
 * @param {File} imageFile - 图片文件
 * @returns {Promise} - 请求结果，包含图片URL
 */
export function uploadHealthImage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  return request.upload('/api/health/upload/image', formData);
}

/**
 * 获取健康指标类型列表
 * @returns {Promise} - 请求结果
 */
export function getHealthMetricTypes() {
  return request.get('/api/health/metric-types');
}

/**
 * 获取用户健康指标趋势
 * @param {Object} params - 查询参数
 * @param {String} params.metricType - 指标类型
 * @param {String} params.period - 时间段（week/month/year）
 * @returns {Promise} - 请求结果
 */
export function getHealthTrend(params) {
  return request.get('/api/health/trend', params);
}

/**
 * 获取健康建议
 * @param {Object} params - 查询参数
 * @param {String} params.metricType - 指标类型（可选）
 * @returns {Promise} - 请求结果
 */
export function getHealthAdvice(params) {
  return request.get('/api/health/advice', params);
}

/**
 * 设置健康目标
 * @param {Object} data - 目标数据
 * @param {String} data.metricType - 指标类型
 * @param {Number} data.targetValue - 目标值
 * @param {String} data.endDate - 目标日期
 * @returns {Promise} - 请求结果
 */
export function setHealthGoal(data) {
  return request.post('/api/health/goal', data);
}

/**
 * 获取健康目标列表
 * @returns {Promise} - 请求结果
 */
export function getHealthGoals() {
  return request.get('/api/health/goals');
}

/**
 * 更新健康目标
 * @param {String} goalId - 目标ID
 * @param {Object} data - 更新数据
 * @returns {Promise} - 请求结果
 */
export function updateHealthGoal(goalId, data) {
  return request.put(`/api/health/goal/${goalId}`, data);
}

/**
 * 删除健康目标
 * @param {String} goalId - 目标ID
 * @returns {Promise} - 请求结果
 */
export function deleteHealthGoal(goalId) {
  return request.delete(`/api/health/goal/${goalId}`);
}

/**
 * 获取健康指标统计数据
 * @param {Object} params - 查询参数
 * @param {String} params.type - 指标类型(血压/血糖/体重等)
 * @param {String} params.timeRange - 时间范围(week/month/year)
 * @param {String} params.startDate - 开始日期(可选)
 * @param {String} params.endDate - 结束日期(可选)
 * @returns {Promise} - 请求结果
 */
export function getHealthStats(params) {
  return request.get('/api/health/stats', params);
}

/**
 * 获取健康档案类型列表
 * @returns {Promise} - 请求结果
 */
export function getHealthRecordTypes() {
  return request.get('/api/health/record-types');
}

/**
 * 设置健康提醒
 * @param {Object} data - 提醒数据
 * @param {String} data.type - 提醒类型(用药/复诊/体检等)
 * @param {String} data.time - 提醒时间
 * @param {String} data.repeat - 重复(once/daily/weekly/monthly)
 * @param {String} data.content - 提醒内容
 * @returns {Promise} - 请求结果
 */
export function setHealthReminder(data) {
  return request.post('/api/health/reminder', data);
}

/**
 * 获取健康提醒列表
 * @param {Object} params - 查询参数
 * @param {String} params.type - 提醒类型(可选)
 * @param {Boolean} params.active - 是否仅查询激活的提醒(可选)
 * @returns {Promise} - 请求结果
 */
export function getHealthReminders(params) {
  return request.get('/api/health/reminders', params);
}

/**
 * 删除健康提醒
 * @param {String} reminderId - 提醒ID
 * @returns {Promise} - 请求结果
 */
export function deleteHealthReminder(reminderId) {
  return request.delete(`/api/health/reminder/${reminderId}`);
}

/**
 * 上传健康报告图片
 * @param {File} imageFile - 图片文件
 * @param {Object} params - 附加参数
 * @param {String} params.recordId - 关联的档案ID(可选)
 * @returns {Promise} - 请求结果
 */
export function uploadHealthReport(imageFile, params = {}) {
  const formData = new FormData();
  formData.append('report', imageFile);
  
  if (params.recordId) {
    formData.append('recordId', params.recordId);
  }
  
  return request.upload('/api/health/report/upload', formData);
}

/**
 * 获取健康指标历史数据
 * @param {Object} params - 查询参数
 * @param {String} params.type - 指标类型
 * @param {String} params.startDate - 开始日期
 * @param {String} params.endDate - 结束日期
 * @returns {Promise} - 请求结果
 */
export function getHealthMetrics(params) {
  return request.get('/api/health/metrics', params);
}

/**
 * 添加健康指标数据
 * @param {Object} data - 指标数据
 * @param {String} data.type - 指标类型
 * @param {Number} data.value - 指标值
 * @param {String} data.date - 记录日期
 * @param {String} data.remark - 备注(可选)
 * @returns {Promise} - 请求结果
 */
export function addHealthMetric(data) {
  return request.post('/api/health/metric', data);
}

/**
 * 获取常见健康指标参考范围
 * @returns {Promise} - 请求结果
 */
export function getHealthMetricReferences() {
  return request.get('/api/health/metric/references');
}

/**
 * 获取健康档案列表
 * @param {Object} params - 查询参数
 * @param {String} params.type - 档案类型（可选）
 * @param {Number} params.pageSize - 每页数量
 * @param {Number} params.pageNum - 页码
 * @returns {Promise} - 请求结果
 */
export function getHealthRecordList(params) {
  return request.get('/api/health-records/list', params);
}

/**
 * 添加用药提醒
 * @param {Object} data - 提醒数据
 * @param {String} data.name - 药品名称
 * @param {String} data.dosage - 剂量
 * @param {String} data.frequency - 频率：daily-每天，weekly-每周，monthly-每月，custom-自定义
 * @param {String} data.customFrequency - 自定义频率，当frequency为custom时必填
 * @param {String} data.startDate - 开始日期，格式：YYYY-MM-DD
 * @param {String} data.endDate - 结束日期，格式：YYYY-MM-DD（可选）
 * @param {Array} data.alertTimes - 提醒时间，格式：HH:mm
 * @returns {Promise} - 请求结果
 */
export function addMedicationReminder(data) {
  return request.post('/api/medication/add', data);
}

/**
 * 获取用药提醒列表
 * @returns {Promise} - 请求结果
 */
export function getMedicationReminderList() {
  return request.get('/api/medication/list');
}

/**
 * 获取用药提醒详情
 * @param {String} medicationId - 提醒ID
 * @returns {Promise} - 请求结果
 */
export function getMedicationReminderDetail(medicationId) {
  return request.get(`/api/medication/detail/${medicationId}`);
}

/**
 * 更新用药提醒
 * @param {String} medicationId - 提醒ID
 * @param {Object} data - 更新数据
 * @returns {Promise} - 请求结果
 */
export function updateMedicationReminder(medicationId, data) {
  return request.put(`/api/medication/update/${medicationId}`, data);
}

/**
 * 删除用药提醒
 * @param {String} medicationId - 提醒ID
 * @returns {Promise} - 请求结果
 */
export function deleteMedicationReminder(medicationId) {
  return request.delete(`/api/medication/delete/${medicationId}`);
}

export default {
  uploadHealthData,
  getHealthDataList,
  getHealthDataDetail,
  deleteHealthData,
  uploadHealthImage,
  getHealthSummary,
  getHealthRecords,
  getHealthRecordDetail,
  addHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
  getHealthMetricTypes,
  getHealthTrend,
  getHealthAdvice,
  setHealthGoal,
  getHealthGoals,
  updateHealthGoal,
  deleteHealthGoal,
  getHealthStats,
  getHealthRecordTypes,
  setHealthReminder,
  getHealthReminders,
  deleteHealthReminder,
  uploadHealthReport,
  getHealthMetrics,
  addHealthMetric,
  getHealthMetricReferences,
  getHealthRecordList,
  addMedicationReminder,
  getMedicationReminderList,
  getMedicationReminderDetail,
  updateMedicationReminder,
  deleteMedicationReminder
}; 