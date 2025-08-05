import { httpService } from './http.service'

export const productService = {
  query,
  getById,
  add,
  update,
  remove,
}

async function query(filterBy = {}) {
  return httpService.get('product', filterBy)
}

function getById(productId) {
  return httpService.get(`product/${productId}`)
}

function add(product) {
  return httpService.post('product', product)
}

function update(productId, product) {
  return httpService.put(`product/${productId}`, product)
}

function remove(productId) {
  return httpService.delete(`product/${productId}`)
}
