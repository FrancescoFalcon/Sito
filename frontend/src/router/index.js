import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PathsView from '../views/PathsView.vue'
import PathDetailView from '../views/PathDetailView.vue'
import CharactersView from '../views/CharactersView.vue'
import CommunityView from '../views/CommunityView.vue'
import { useAuth } from '../stores/auth'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/paths', name: 'paths', component: PathsView },
  { path: '/paths/:slug', name: 'path-detail', component: PathDetailView },
  { path: '/characters', name: 'characters', component: CharactersView },
  { path: '/community', name: 'community', component: CommunityView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior () {
    return { top: 0 }
  }
})

router.beforeEach(async (to) => {
  const auth = useAuth()
  if (auth.state.token && !auth.state.user) {
    try {
      await auth.ensureProfile()
    } catch (error) {
      console.warn('Failed to load profile', error)
    }
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    return { name: 'home', query: { login: 'required' } }
  }

  return true
})

export default router
