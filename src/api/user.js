/**
 * 用户相关接口
 */
import request from '@/utils/request';

/**
 * 用户登录
 * @param {Object} data - 登录参数
 * @param {String} data.username - 用户名/手机号
 * @param {String} data.password - 密码
 * @returns {Promise} - 请求结果
 */
export function login(data) {
  return request.post('/api/user/login', data);
}

/**
 * 用户注册
 * @param {Object} data - 注册参数
 * @param {String} data.username - 用户名
 * @param {String} data.password - 密码
 * @param {String} data.phoneNumber - 手机号
 * @param {String} data.verificationCode - 验证码
 * @returns {Promise} - 请求结果
 */
export function register(data) {
  return request.post('/api/user/register', data);
}

/**
 * 发送验证码
 * @param {String} phoneNumber - 手机号
 * @param {String} type - 验证码类型，如：register、reset-password、bind
 * @returns {Promise} - 请求结果
 */
export function sendVerificationCode(phoneNumber, type) {
  return request.post('/api/user/sendVerificationCode', {
    phoneNumber,
    type
  });
}

/**
 * 重置密码
 * @param {Object} data - 重置密码参数
 * @param {String} data.phoneNumber - 手机号
 * @param {String} data.verificationCode - 验证码
 * @param {String} data.newPassword - 新密码
 * @returns {Promise} - 请求结果
 */
export function resetPassword(data) {
  return request.post('/api/user/resetPassword', data);
}

/**
 * 获取用户信息
 * @returns {Promise} - 请求结果
 */
export function getUserInfo() {
  return request.get('/api/user/info');
}

/**
 * 更新用户信息
 * @param {Object} data - 用户信息
 * @param {String} data.nickname - 昵称（可选）
 * @param {String} data.avatar - 头像URL（可选）
 * @param {String} data.gender - 性别（可选）
 * @param {String} data.birthday - 生日（可选）
 * @param {Number} data.height - 身高（可选）
 * @param {Number} data.weight - 体重（可选）
 * @param {Array} data.allergies - 过敏源（可选）
 * @param {Array} data.chronicDiseases - 慢性病（可选）
 * @returns {Promise} - 请求结果
 */
export function updateUserInfo(data) {
  return request.put('/api/user/info', data);
}

/**
 * 上传用户头像
 * @param {File} imageFile - 图片文件
 * @returns {Promise} - 请求结果，包含头像URL
 */
export function uploadAvatar(imageFile) {
  return request.upload('/api/user/avatar', imageFile, 'avatar');
}

/**
 * 修改密码
 * @param {Object} data - 修改密码参数
 * @param {String} data.oldPassword - 旧密码
 * @param {String} data.newPassword - 新密码
 * @returns {Promise} - 请求结果
 */
export function changePassword(data) {
  return request.post('/api/user/changePassword', data);
}

/**
 * 绑定手机号
 * @param {Object} data - 绑定参数
 * @param {String} data.phoneNumber - 手机号
 * @param {String} data.verificationCode - 验证码
 * @returns {Promise} - 请求结果
 */
export function bindPhoneNumber(data) {
  return request.post('/api/user/bindPhone', data);
}

/**
 * 解绑手机号
 * @param {Object} data - 解绑参数
 * @param {String} data.verificationCode - 验证码
 * @returns {Promise} - 请求结果
 */
export function unbindPhoneNumber(data) {
  return request.post('/api/user/unbindPhone', data);
}

/**
 * 退出登录
 * @returns {Promise} - 请求结果
 */
export function logout() {
  return request.post('/api/user/logout');
}

/**
 * 注销账号
 * @param {Object} data - 注销参数
 * @param {String} data.password - 密码
 * @returns {Promise} - 请求结果
 */
export function deleteAccount(data) {
  return request.post('/api/user/deleteAccount', data);
}

/**
 * 获取用户隐私设置
 * @returns {Promise} - 请求结果
 */
export function getPrivacySettings() {
  return request.get('/api/user/privacy');
}

/**
 * 更新用户隐私设置
 * @param {Object} data - 隐私设置
 * @returns {Promise} - 请求结果
 */
export function updatePrivacySettings(data) {
  return request.put('/api/user/privacy', data);
}

export default {
  login,
  register,
  sendVerificationCode,
  resetPassword,
  getUserInfo,
  updateUserInfo,
  uploadAvatar,
  changePassword,
  bindPhoneNumber,
  unbindPhoneNumber,
  logout,
  deleteAccount,
  getPrivacySettings,
  updatePrivacySettings
}; 