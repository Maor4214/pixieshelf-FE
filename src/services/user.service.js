import { httpService } from './http.service'

export const userService = {
  query,
  getById,
  add,
  update,
  remove,
}

async function query(filterBy = {}) {
  return httpService.get('user', filterBy)
}

function getById(userId) {
  return httpService.get(`user/${userId}`)
}

function add(user) {
  return httpService.post('user', user)
}

function update(userId, user) {
  return httpService.put(`user/${userId}`, user)
}

function remove(userId) {
  return httpService.delete(`user/${userId}`)
} 