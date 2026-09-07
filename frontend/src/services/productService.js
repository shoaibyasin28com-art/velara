import api from './api.js'

export default {
  list: (params) => api.get('/products', { params }),
  get: (slug) => api.get(`/products/${slug}`),
  related: (slug) => api.get(`/products/${slug}/related`)
}
