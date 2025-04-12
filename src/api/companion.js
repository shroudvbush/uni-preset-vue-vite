/**
 * 智能陪伴相关接口
 */
import request from '@/utils/request';

/**
 * 发送消息
 * @param {Object} data - 消息数据
 * @param {String} data.message - 用户消息
 * @param {String} data.sessionId - 会话ID（可选，首次聊天可不传）
 * @returns {Promise} - 请求结果
 */
export function sendMessage(data) {
  return request.post('/api/companion/chat', data);
}

/**
 * 语音输入消息
 * @param {String} audioData - Base64编码的音频数据
 * @param {String} sessionId - 会话ID（可选）
 * @returns {Promise} - 请求结果
 */
export function voiceInput(audioData, sessionId) {
  return request.post('/api/companion/voice-input', {
    audioData,
    sessionId
  });
}

/**
 * 获取聊天历史记录
 * @param {Object} params - 查询参数
 * @param {Number} params.pageSize - 每页数量
 * @param {Number} params.pageNum - 页码
 * @returns {Promise} - 请求结果
 */
export function getChatHistory(params) {
  return request.get('/api/companion/history', params);
}

/**
 * 获取会话列表
 * @param {Object} params - 查询参数
 * @param {Number} params.pageSize - 每页数量
 * @param {Number} params.pageNum - 页码
 * @returns {Promise} - 请求结果
 */
export function getSessionList(params) {
  return request.get('/api/companion/sessions', params);
}

/**
 * 创建新会话
 * @param {Object} data - 会话数据
 * @param {String} data.title - 会话标题（可选）
 * @returns {Promise} - 请求结果
 */
export function createSession(data) {
  return request.post('/api/companion/session', data);
}

/**
 * 更新会话信息
 * @param {String} sessionId - 会话ID
 * @param {Object} data - 会话数据
 * @param {String} data.title - 会话标题
 * @returns {Promise} - 请求结果
 */
export function updateSession(sessionId, data) {
  return request.put(`/api/companion/session/${sessionId}`, data);
}

/**
 * 删除会话
 * @param {String} sessionId - 会话ID
 * @returns {Promise} - 请求结果
 */
export function deleteSession(sessionId) {
  return request.delete(`/api/companion/session/${sessionId}`);
}

/**
 * 获取智能陪伴推荐话题
 * @param {Object} params - 查询参数
 * @param {String} params.category - 话题分类（可选）
 * @returns {Promise} - 请求结果
 */
export function getRecommendedTopics(params) {
  return request.get('/api/companion/topics', params);
}

/**
 * 给消息添加收藏
 * @param {String} messageId - 消息ID
 * @returns {Promise} - 请求结果
 */
export function favoriteMessage(messageId) {
  return request.post(`/api/companion/favorite/${messageId}`);
}

/**
 * 取消消息收藏
 * @param {String} messageId - 消息ID
 * @returns {Promise} - 请求结果
 */
export function unfavoriteMessage(messageId) {
  return request.delete(`/api/companion/favorite/${messageId}`);
}

/**
 * 获取收藏消息列表
 * @param {Object} params - 查询参数
 * @param {Number} params.pageSize - 每页数量
 * @param {Number} params.pageNum - 页码
 * @returns {Promise} - 请求结果
 */
export function getFavoriteMessages(params) {
  return request.get('/api/companion/favorites', params);
}

/**
 * 反馈消息
 * @param {String} messageId - 消息ID
 * @param {Object} data - 反馈数据
 * @param {Boolean} data.isHelpful - 是否有帮助
 * @param {String} data.feedback - 反馈内容（可选）
 * @returns {Promise} - 请求结果
 */
export function feedbackMessage(messageId, data) {
  return request.post(`/api/companion/feedback/${messageId}`, data);
}

export default {
  sendMessage,
  voiceInput,
  getChatHistory,
  getSessionList,
  createSession,
  updateSession,
  deleteSession,
  getRecommendedTopics,
  favoriteMessage,
  unfavoriteMessage,
  getFavoriteMessages,
  feedbackMessage
}; 