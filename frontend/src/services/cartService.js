import api from './api.js'

export default {
  get: () => api.get('/cart'),
  addItem: (payload) => api.post('/cart/items', payload),
  updateItem: (id, payload) => api.put(`/cart/items/${id}`, payload),
  removeItem: (id) => api.delete(`/cart/items/${id}`)
}
