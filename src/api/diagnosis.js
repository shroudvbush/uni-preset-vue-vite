/**
 * 智能诊断相关接口
 */
import request from '@/utils/request';

/**
 * 分析症状
 * @param {Object} data - 诊断参数
 * @param {String} data.symptoms - 症状描述
 * @param {String} data.duration - 持续时间
 * @param {String} data.severity - 严重程度：mild-轻度，moderate-中度，severe-重度
 * @returns {Promise} - 请求结果
 */
export function analyzeDiagnosis(data) {
  return request.post('/api/diagnosis/analyze', data);
}

/**
 * 语音输入症状
 * @param {String} audioData - Base64编码的音频数据
 * @returns {Promise} - 请求结果
 */
export function voiceInput(audioData) {
  return request.post('/api/diagnosis/voice-input', {
    audioData
  });
}

/**
 * 获取诊断历史记录
 * @param {Object} params - 查询参数
 * @param {Number} params.pageSize - 每页数量
 * @param {Number} params.pageNum - 页码
 * @returns {Promise} - 请求结果
 */
export function getDiagnosisHistory(params) {
  return request.get('/api/diagnosis/history', params);
}

/**
 * 获取诊断详情
 * @param {String} diagnosisId - 诊断ID
 * @returns {Promise} - 请求结果
 */
export function getDiagnosisDetail(diagnosisId) {
  return request.get(`/api/diagnosis/detail/${diagnosisId}`);
}

/**
 * 上传诊断相关图片
 * @param {File} imageFile - 图片文件
 * @returns {Promise} - 请求结果，包含图片URL
 */
export function uploadDiagnosisImage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  return request.upload('/api/diagnosis/upload/image', formData);
}

/**
 * 上传诊断语音
 * @param {File} audioFile - 语音文件
 * @returns {Promise} - 请求结果，包含语音URL和转写文本
 */
export function uploadDiagnosisVoice(audioFile) {
  const formData = new FormData();
  formData.append('audio', audioFile);
  return request.upload('/api/diagnosis/upload/voice', formData);
}

/**
 * 获取常见症状列表
 * @param {Object} params - 查询参数
 * @param {String} params.keyword - 搜索关键词（可选）
 * @param {String} params.category - 症状分类（可选）
 * @returns {Promise} - 请求结果
 */
export function getCommonSymptoms(params) {
  return request.get('/api/diagnosis/common-symptoms', params);
}

/**
 * 获取诊断建议
 * @param {String} diagnosisId - 诊断ID
 * @returns {Promise} - 请求结果
 */
export function getDiagnosisSuggestion(diagnosisId) {
  return request.get(`/api/diagnosis/suggestion/${diagnosisId}`);
}

/**
 * 评价诊断结果
 * @param {String} diagnosisId - 诊断ID
 * @param {Object} data - 评价数据
 * @param {Number} data.rating - 评分(1-5)
 * @param {String} data.comment - 评价内容（可选）
 * @returns {Promise} - 请求结果
 */
export function rateDiagnosis(diagnosisId, data) {
  return request.post(`/api/diagnosis/rate/${diagnosisId}`, data);
}

/**
 * 获取附近医院列表
 * @param {Object} params - 查询参数
 * @param {Number} params.latitude - 纬度
 * @param {Number} params.longitude - 经度
 * @param {Number} params.radius - 搜索半径（单位：千米，可选）
 * @param {String} params.department - 科室（可选）
 * @returns {Promise} - 请求结果
 */
export function getNearbyHospitals(params) {
  return request.get('/api/diagnosis/nearby-hospitals', params);
}

/**
 * 获取常见疾病信息
 * @param {Object} params - 查询参数
 * @param {String} params.keyword - 搜索关键词（可选）
 * @param {String} params.category - 疾病分类（可选）
 * @returns {Promise} - 请求结果
 */
export function getCommonDiseases(params) {
  return request.get('/api/diagnosis/common-diseases', params);
}

/**
 * 获取疾病详情
 * @param {String} diseaseId - 疾病ID
 * @returns {Promise} - 请求结果
 */
export function getDiseaseDetail(diseaseId) {
  return request.get(`/api/diagnosis/disease/${diseaseId}`);
}

export default {
  analyzeDiagnosis,
  voiceInput,
  getDiagnosisHistory,
  getDiagnosisDetail,
  uploadDiagnosisImage,
  uploadDiagnosisVoice,
  getCommonSymptoms,
  getDiagnosisSuggestion,
  rateDiagnosis,
  getNearbyHospitals,
  getCommonDiseases,
  getDiseaseDetail
}; 