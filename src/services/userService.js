import HttpClient from './api/httpClient.js'
import BaseService from './api/baseService.js'

/**
 * Service for managing user-related API operations
 * Extends BaseService to provide common CRUD operations
 */
class UserService extends BaseService {
  constructor() {
    const httpClient = new HttpClient('https://jsonplaceholder.typicode.com')
    super(httpClient, '/users')
  }

  /**
   * Fetch posts for a specific user with pagination
   * @param {number|string} userId - The user ID
   * @param {number} start - Starting index for pagination
   * @param {number} limit - Number of posts to fetch
   * @returns {Promise<Array>} Array of user posts
   */
  async getUserPosts(userId, start = 0, limit = 3) {
    return this.httpClient.get(`/posts?userId=${userId}&_start=${start}&_limit=${limit}`)
  }
}

export default new UserService()