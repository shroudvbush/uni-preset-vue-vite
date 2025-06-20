/**
 * 医疗服务相关接口
 */
import request from '@/utils/request';

/**
 * 获取医院列表
 * @param {Object} params - 查询参数
 * @param {String} params.city - 城市
 * @param {String} params.department - 科室
 * @param {String} params.keyword - 搜索关键词
 * @returns {Promise} - 请求结果
 */
export function getHospitalList(params) {
  return request.get('/api/medical/hospitals', { params });
}

/**
 * 获取医院详情
 * @param {String} hospitalId - 医院ID
 * @returns {Promise} - 请求结果
 */
export function getHospitalDetail(hospitalId) {
  return request.get(`/api/medical/hospital/${hospitalId}`);
}

/**
 * 获取科室列表
 * @param {String} hospitalId - 医院ID
 * @returns {Promise} - 请求结果
 */
export function getDepartmentList(hospitalId) {
  return request.get(`/api/medical/departments/${hospitalId}`);
}

/**
 * 获取医生列表
 * @param {Object} params - 查询参数
 * @param {String} params.hospitalId - 医院ID
 * @param {String} params.departmentId - 科室ID
 * @param {String} params.keyword - 搜索关键词
 * @returns {Promise} - 请求结果
 */
export function getDoctorList(params) {
  return request.get('/api/medical/doctors', { params });
}

/**
 * 获取医生详情
 * @param {String} doctorId - 医生ID
 * @returns {Promise} - 请求结果
 */
export function getDoctorDetail(doctorId) {
  return request.get(`/api/medical/doctor/${doctorId}`);
}

/**
 * 预约挂号
 * @param {Object} data - 预约信息
 * @param {String} data.hospitalId - 医院ID
 * @param {String} data.departmentId - 科室ID
 * @param {String} data.doctorId - 医生ID
 * @param {String} data.appointmentDate - 预约日期
 * @param {String} data.appointmentTime - 预约时间
 * @param {String} data.patientName - 患者姓名
 * @param {String} data.patientPhone - 患者手机号
 * @param {String} data.symptoms - 症状描述
 * @returns {Promise} - 请求结果
 */
export function makeAppointment(data) {
  return request.post('/api/medical/appointment', data);
}

/**
 * 获取预约记录
 * @param {Object} params - 查询参数
 * @param {String} params.status - 预约状态
 * @param {String} params.startDate - 开始日期
 * @param {String} params.endDate - 结束日期
 * @returns {Promise} - 请求结果
 */
export function getAppointmentList(params) {
  return request.get('/api/medical/appointments', { params });
}

/**
 * 取消预约
 * @param {String} appointmentId - 预约ID
 * @returns {Promise} - 请求结果
 */
export function cancelAppointment(appointmentId) {
  return request.post(`/api/medical/appointment/${appointmentId}/cancel`);
}

/**
 * 在线问诊
 * @param {Object} data - 问诊信息
 * @param {String} data.doctorId - 医生ID
 * @param {String} data.symptoms - 症状描述
 * @param {Array} data.images - 图片列表
 * @param {String} data.questionType - 问题类型
 * @returns {Promise} - 请求结果
 */
export function createConsultation(data) {
  return request.post('/api/medical/consultation', data);
}

/**
 * 获取问诊记录
 * @param {Object} params - 查询参数
 * @param {String} params.status - 问诊状态
 * @returns {Promise} - 请求结果
 */
export function getConsultationList(params) {
  return request.get('/api/medical/consultations', { params });
}

/**
 * 发送问诊消息
 * @param {Object} data - 消息信息
 * @param {String} data.consultationId - 问诊ID
 * @param {String} data.content - 消息内容
 * @param {Array} data.images - 图片列表
 * @returns {Promise} - 请求结果
 */
export function sendConsultationMessage(data) {
  return request.post('/api/medical/consultation/message', data);
}

/**
 * 获取问诊消息
 * @param {String} consultationId - 问诊ID
 * @returns {Promise} - 请求结果
 */
export function getConsultationMessages(consultationId) {
  return request.get(`/api/medical/consultation/${consultationId}/messages`);
}

/**
 * 上传检查报告
 * @param {Object} data - 报告信息
 * @param {String} data.title - 报告标题
 * @param {String} data.hospital - 医院名称
 * @param {String} data.examinationDate - 检查日期
 * @param {Array} data.images - 报告图片
 * @param {String} data.notes - 备注
 * @returns {Promise} - 请求结果
 */
export function uploadMedicalReport(data) {
  return request.post('/api/medical/report', data);
}

/**
 * 获取检查报告列表
 * @param {Object} params - 查询参数
 * @param {String} params.startDate - 开始日期
 * @param {String} params.endDate - 结束日期
 * @returns {Promise} - 请求结果
 */
export function getMedicalReportList(params) {
  return request.get('/api/medical/reports', { params });
}

/**
 * 获取检查报告详情
 * @param {String} reportId - 报告ID
 * @returns {Promise} - 请求结果
 */
export function getMedicalReportDetail(reportId) {
  return request.get(`/api/medical/report/${reportId}`);
}

export default {
  getHospitalList,
  getHospitalDetail,
  getDepartmentList,
  getDoctorList,
  getDoctorDetail,
  makeAppointment,
  getAppointmentList,
  cancelAppointment,
  createConsultation,
  getConsultationList,
  sendConsultationMessage,
  getConsultationMessages,
  uploadMedicalReport,
  getMedicalReportList,
  getMedicalReportDetail
}; 