import api from './api.js'

export default {
  create: (payload) => api.post('/orders', payload),
  list: () => api.get('/orders'),
  get: (id) => api.get(`/orders/${id}`)
}
