import { httpService } from './http.service'

export function createCrudService(endpoint) {
  return {
    query: (filterBy = {}) => httpService.get(endpoint, filterBy),
    getById: (id) => httpService.get(`${endpoint}/${id}`),
    add: (item) => httpService.post(endpoint, item),
    update: (id, item) => httpService.put(`${endpoint}/${id}`, item),
    remove: (id) => httpService.delete(`${endpoint}/${id}`),
  }
} 