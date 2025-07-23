class BaseService {
  constructor(httpClient, baseEndpoint) {
    this.httpClient = httpClient
    this.baseEndpoint = baseEndpoint
  }

  async getAll() {
    return this.httpClient.get(this.baseEndpoint)
  }

  async getById(id) {
    return this.httpClient.get(`${this.baseEndpoint}/${id}`)
  }

  async create(data) {
    return this.httpClient.post(this.baseEndpoint, data)
  }

  async update(id, data) {
    return this.httpClient.put(`${this.baseEndpoint}/${id}`, data)
  }

  async delete(id) {
    return this.httpClient.delete(`${this.baseEndpoint}/${id}`)
  }
}

export default BaseService