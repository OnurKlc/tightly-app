import HttpClient from './api/httpClient.js'
import BaseService from './api/baseService.js'

class PostService extends BaseService {
  constructor() {
    const httpClient = new HttpClient('https://jsonplaceholder.typicode.com')
    super(httpClient, '/posts')
  }

  async getPostsByUser(userId, start = 0, limit = 3) {
    return this.httpClient.get(`/posts?userId=${userId}&_start=${start}&_limit=${limit}`)
  }

  async createPost(postData) {
    return this.httpClient.post('/posts', postData)
  }

  async deletePost(postId) {
    return this.httpClient.delete(`/posts/${postId}`)
  }
}

export default new PostService()