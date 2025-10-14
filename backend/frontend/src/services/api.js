import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000
})

export function setAuthToken (token) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete apiClient.defaults.headers.common.Authorization
  }
}

export const fetchPaths = () => apiClient.get('/paths').then(r => r.data)
export const fetchPath = (slug) => apiClient.get(`/paths/${slug}`).then(r => r.data)
export const fetchCharacters = () => apiClient.get('/characters').then(r => r.data)
export const fetchNotes = () => apiClient.get('/notes').then(r => r.data)
export const createNote = (payload) => apiClient.post('/notes', payload).then(r => r.data)
export const fetchThreads = () => apiClient.get('/community/threads').then(r => r.data)
export const createThread = (payload) => apiClient.post('/community/threads', payload).then(r => r.data)
export const replyToThread = (slug, payload) => apiClient.post(`/community/threads/${slug}/replies`, payload).then(r => r.data)
export const reactToThread = (slug, payload) => apiClient.patch(`/community/threads/${slug}/react`, payload).then(r => r.data)
export const reactToThreadReply = (slug, replyId, payload) => apiClient.patch(`/community/threads/${slug}/replies/${replyId}/react`, payload).then(r => r.data)
export const registerUser = (payload) => apiClient.post('/auth/register', payload).then(r => r.data)
export const loginUser = (payload) => apiClient.post('/auth/login', payload).then(r => r.data)
export const fetchProfile = () => apiClient.get('/auth/me').then(r => r.data)
