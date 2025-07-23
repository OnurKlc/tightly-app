import axios from 'axios'

class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  setupInterceptors() {
    this.client.interceptors.response.use(
      response => response.data,
      error => {
        console.error('API Error:', error)
        
        let errorMessage = 'An unexpected error occurred'
        
        if (error.code === 'ECONNABORTED') {
          errorMessage = 'Request timeout. Please check your connection.'
        } else if (error.response) {
          errorMessage = `Server error: ${error.response.status}`
        } else if (error.request) {
          errorMessage = 'Network error. Please check your connection.'
        }
        
        error.userMessage = errorMessage
        return Promise.reject(error)
      }
    )
  }

  async get(url, config = {}) {
    return this.client.get(url, config)
  }

  async post(url, data, config = {}) {
    return this.client.post(url, data, config)
  }

  async put(url, data, config = {}) {
    return this.client.put(url, data, config)
  }

  async delete(url, config = {}) {
    return this.client.delete(url, config)
  }
}

export default HttpClient