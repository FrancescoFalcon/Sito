import { computed, reactive } from 'vue'
import {
  apiClient,
  setAuthToken,
  registerUser,
  loginUser,
  fetchProfile
} from '../services/api'

const storageKey = 'lotm_auth_token'

const state = reactive({
  user: null,
  token: localStorage.getItem(storageKey) || null,
  loading: false,
  error: ''
})

let profilePromise = null

if (state.token) {
  setAuthToken(state.token)
  ensureProfile()
}

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      clearSession()
    }
    return Promise.reject(error)
  }
)

function setSession (token, user) {
  state.token = token
  state.user = user
  state.error = ''
  localStorage.setItem(storageKey, token)
  setAuthToken(token)
}

function clearSession () {
  state.token = null
  state.user = null
  state.error = ''
  localStorage.removeItem(storageKey)
  setAuthToken(null)
}

async function ensureProfile () {
  if (!state.token || state.user) {
    return state.user
  }

  if (!profilePromise) {
    state.loading = true
    profilePromise = fetchProfile()
      .then((response) => {
        state.user = response.user
        return state.user
      })
      .catch((error) => {
        clearSession()
        throw error
      })
      .finally(() => {
        state.loading = false
        profilePromise = null
      })
  }

  return profilePromise
}

async function handleAuthResponse (request) {
  state.loading = true
  state.error = ''
  try {
    const { token, user } = await request
    setSession(token, user)
    return user
  } catch (error) {
  state.error = error.response?.data?.message || 'Authentication failed'
    throw error
  } finally {
    state.loading = false
  }
}

async function registerAccount (payload) {
  return handleAuthResponse(registerUser(payload))
}

async function loginAccount (payload) {
  return handleAuthResponse(loginUser(payload))
}

function logout () {
  clearSession()
}

export function useAuth () {
  const isAuthenticated = computed(() => Boolean(state.user && state.token))

  return {
    state,
    user: computed(() => state.user),
    token: computed(() => state.token),
    loading: computed(() => state.loading),
    error: computed(() => state.error),
    isAuthenticated,
    registerAccount,
    loginAccount,
    logout,
    ensureProfile
  }
}

export function getAuthState () {
  return state
}
