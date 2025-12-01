<template>
  <header>
    <nav
      class="navbar navbar-expand-lg navbar-dark header-transparent px-3"
    >
      <RouterLink
        class="navbar-brand fw-bold"
        to="/"
      >
        LOTM Explorer
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarNav"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav ms-auto gap-2">
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              active-class="active"
              to="/"
            >
              Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              active-class="active"
              to="/paths"
            >
              Paths
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              active-class="active"
              to="/characters"
            >
              Characters
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              active-class="active"
              to="/community"
            >
              Community
            </RouterLink>
          </li>
        </ul>
        <div class="account-actions ms-lg-3 d-flex align-items-center gap-2">
          <template v-if="isAuthenticated">
            <span class="text-light small">
              Hello, <strong>{{ user?.username }}</strong>
            </span>
            <button
              type="button"
              class="btn btn-outline-warning btn-sm"
              @click="onLogout"
            >
              Log out
            </button>
          </template>
          <template v-else>
            <button
              type="button"
              class="btn btn-outline-light btn-sm"
              @click="openModal('login')"
            >
              Sign in
            </button>
            <button
              type="button"
              class="btn btn-warning btn-sm text-dark"
              @click="openModal('register')"
            >
              Sign up
            </button>
          </template>
        </div>
      </div>
    </nav>

    <transition name="fade">
      <div
        v-if="showModal"
        class="auth-backdrop"
      >
        <div class="auth-dialog card text-light shadow-lg">
          <button
            type="button"
            class="auth-close-btn"
            aria-label="Close"
            @click="closeModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="card-body">
            <h5 class="card-title mb-3 text-center">
              {{ isLoginMode ? 'Sign in to the community' : 'Create an account' }}
            </h5>
            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input
                  v-model.trim="form.username"
                  class="form-control"
                  required
                  maxlength="40"
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  required
                  minlength="6"
                >
              </div>
              <p
                v-if="authError"
                class="text-danger small mb-3"
              >
                {{ authError }}
              </p>
              <button
                type="submit"
                class="btn btn-warning text-dark w-100"
                :disabled="authLoading"
              >
                {{ authLoading ? 'Verifying credentials…' : (isLoginMode ? 'Sign in' : 'Create account') }}
              </button>
            </form>
            <p class="text-center mt-3 small">
              <button
                type="button"
                class="btn btn-link text-warning p-0"
                @click="toggleMode"
              >
                {{ isLoginMode ? "Don't have an account? Sign up" : 'Already have an account? Sign in' }}
              </button>
            </p>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuth } from '../../stores/auth'

const {
  user,
  isAuthenticated,
  loading: authLoadingRef,
  error: authErrorRef,
  loginAccount,
  registerAccount,
  logout
} = useAuth()

const showModal = ref(false)
const authMode = ref('login')
const form = reactive({
  username: '',
  password: ''
})

const authLoading = computed(() => authLoadingRef.value)
const authError = computed(() => authErrorRef.value)
const isLoginMode = computed(() => authMode.value === 'login')

const route = useRoute()
const router = useRouter()

function resetForm () {
  form.username = ''
  form.password = ''
}

function openModal (mode = 'login') {
  authMode.value = mode
  resetForm()
  showModal.value = true
}

function closeModal () {
  showModal.value = false
  resetForm()
}

async function onSubmit () {
  const payload = isLoginMode.value
    ? {
        username: form.username,
        password: form.password
      }
    : {
        username: form.username,
        password: form.password
      }

  try {
    if (isLoginMode.value) {
      await loginAccount(payload)
    } else {
      await registerAccount(payload)
    }
    closeModal()
  } catch (error) {
    console.error('Auth error', error)
  }
}

function toggleMode () {
  authMode.value = isLoginMode.value ? 'register' : 'login'
  resetForm()
}

function onLogout () {
  logout()
  router.push({ name: 'home' })
}

watch(
  () => route.query.login,
  async (value) => {
    if (value === 'required' && !isAuthenticated.value) {
      openModal('login')
      const nextQuery = { ...route.query }
      delete nextQuery.login
      await router.replace({ query: nextQuery })
    }
  },
  { immediate: true }
)
</script>

<style scoped>
header {
  position: relative;
  z-index: 5;
  background: transparent;
  isolation: isolate;
}

header::before,
header::after {
  content: none;
}

.navbar {
  position: relative;
  z-index: 2;
  backdrop-filter: blur(4px);
  background: linear-gradient(180deg, rgba(6, 7, 18, 0.35) 0%, rgba(6, 7, 18, 0.25) 100%);
  border-radius: 16px;
  margin: 0.4rem auto;
  padding-inline: clamp(1rem, 3vw, 1.9rem) !important;
  width: min(1140px, 100%);
}

.navbar::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid rgba(236, 196, 94, 0.12);
  opacity: 0.65;
  pointer-events: none;
}

.navbar-brand {
  text-shadow: 0 0 6px rgba(6, 7, 18, 0.8);
}

.nav-link {
  text-shadow: 0 0 8px rgba(6, 7, 18, 0.65);
}

.navbar-toggler {
  background-color: rgba(236, 196, 94, 0.15);
  border: 1px solid rgba(236, 196, 94, 0.35);
}

.account-actions {
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

.auth-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(4, 9, 15, 0.8);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 4.5rem 1.5rem 1.5rem;
  z-index: 1050;
  overflow-y: auto;
}

.auth-dialog {
  max-width: 420px;
  width: 100%;
  border-radius: 1rem;
  position: relative;
  background: linear-gradient(160deg, rgba(11, 21, 32, 0.96), rgba(23, 37, 55, 0.96));
  border: 1px solid rgba(236, 196, 94, 0.45);
  box-shadow: 0 28px 60px rgba(2, 7, 12, 0.65);
  backdrop-filter: blur(18px);
}

.auth-close-btn {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  border: 1px solid rgba(236, 196, 94, 0.65);
  background: radial-gradient(circle at 30% 30%, rgba(236, 196, 94, 0.25), rgba(8, 12, 20, 0.95));
  color: #fff4d1;
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
}

.auth-close-btn span {
  transform: translateY(-2px);
}

.auth-close-btn:hover {
  transform: scale(1.08);
  border-color: rgba(236, 196, 94, 0.95);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.55);
  background: radial-gradient(circle at 30% 30%, rgba(236, 196, 94, 0.4), rgba(8, 12, 20, 0.95));
}

.auth-close-btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.65);
  outline-offset: 2px;
}

.auth-dialog .card-body {
  padding: 2.25rem;
}

.auth-dialog .form-label {
  color: rgba(248, 249, 250, 0.85);
  font-weight: 600;
}

.auth-dialog .form-control {
  background-color: rgba(6, 15, 24, 0.8);
  border-color: rgba(236, 196, 94, 0.35);
  color: #f8f9fa;
}

.auth-dialog .form-control:focus {
  background-color: rgba(9, 19, 29, 0.95);
  border-color: rgba(236, 196, 94, 0.65);
  box-shadow: 0 0 0 0.2rem rgba(236, 196, 94, 0.15);
}

.auth-dialog .form-control::placeholder {
  color: rgba(248, 249, 250, 0.55);
}

.auth-dialog .btn-warning {
  background: linear-gradient(120deg, #f3d37a, #f1c661);
  border: none;
  font-weight: 600;
  box-shadow: 0 12px 24px rgba(241, 198, 97, 0.35);
}

.auth-dialog .btn-warning:disabled {
  box-shadow: none;
  opacity: 0.65;
}

.auth-dialog .btn-link {
  color: #f1c661;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
