/**
 * 社区相关接口
 */
import request from '@/utils/request';

/**
 * 获取文章列表
 * @param {Object} params - 查询参数
 * @param {String} params.category - 文章分类，可选：all-全部，tips-健康小贴士，disease-疾病知识，lifestyle-生活方式
 * @param {Number} params.pageSize - 每页数量
 * @param {Number} params.pageNum - 页码
 * @returns {Promise} - 请求结果
 */
export function getArticleList(params) {
  return request.get('/api/community/articles', params);
}

/**
 * 获取文章详情
 * @param {String} articleId - 文章ID
 * @returns {Promise} - 请求结果
 */
export function getArticleDetail(articleId) {
  return request.get(`/api/community/article/${articleId}`);
}

/**
 * 搜索文章
 * @param {Object} params - 搜索参数
 * @param {String} params.keyword - 搜索关键词
 * @param {Number} params.pageSize - 每页数量
 * @param {Number} params.pageNum - 页码
 * @returns {Promise} - 请求结果
 */
export function searchArticles(params) {
  return request.get('/api/community/search', params);
}

export default {
  getArticleList,
  getArticleDetail,
  searchArticles
}; 