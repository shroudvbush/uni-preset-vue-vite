/**
 * 全局配置文件
 */

// API基础地址
export const baseURL = 'https://enzkmpypbsrx.sealoshzh.site';

// API版本
export const apiVersion = 'v1';

// 请求超时时间
export const timeout = 60000;

// 默认分页大小
export const defaultPageSize = 10;

// 最大上传文件大小（单位：MB）
export const maxUploadSize = 10;

// 允许上传的文件类型
export const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

// 导航栏配置
export const navBarConfig = {
  backgroundColor: '#F8F8F8',
  titleText: '医影随护',
  titleColor: '#000000'
};

export default {
  baseURL,
  apiVersion,
  timeout,
  defaultPageSize,
  maxUploadSize,
  allowedFileTypes,
  navBarConfig
}; 